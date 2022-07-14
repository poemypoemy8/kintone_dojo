(() =>{
  'use strict';

  kintone.events.on('app.record.create.show', (event) => {

    const params = {
      app: event.appId,
    }

    return kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true),'GET',params).then((resp) => {
      
      const options = resp.properties.Table.fields.Action5.options;

      let sortedArray = Object.keys(options).map((key) => {
        return options[key];
      }).sort((a,b) => {
        return (a.index < b.index) ? -1 : 1
      });

      const action5 = sortedArray.map((action) => {
        return action['label'];
      })
    
      const newRow = [];
      
      action5.forEach((val, index) => {
        newRow[index] = {
          'value': {
            'Action5': {
              'type': 'DROP_DOWN',
              'value': val
            },
            '課題': {
              'type': 'MULTI_LINE_TEXT',
              'value': ''
            },
            '状況': {
              'type': 'CHECK_BOX',
              'value': ['未振り返り']
            }
          }
        };
        event.record.Table.value[index] = newRow[index];
      });        
      return event;

    }).catch((err) => {
      return event;
    })

  });
  
})();

  // 参考URL https://keizokuma.com/js-array-object-sort/
  // 参考URL https://developer.cybozu.io/hc/ja/articles/360023047852 なぜreturnがいるのかわからない…