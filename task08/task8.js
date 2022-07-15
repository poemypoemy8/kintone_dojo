(() => {
  'use strict';

  kintone.events.on('app.record.create.show', (event) => {

    const params = {
      app: event.appId,
    };

    return kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', params).then((resp) => {
      console.log(resp);
      const options = resp.properties.Table.fields.Action5.options;
      // options を index順に並べて、配列action5に変換したい
      // options の要素を index順に並べて、配列action5 に順番に入れたい

      const action5 = []; 
      Object.keys(options).forEach((val) => {
        for (let i = 0; i < Object.keys(options).length; i++) {
          if(options[val].index[i]){
            return action5 = options[val].label;
            console.log(action5);
          } // options[val].index[i] のときのoption[label]をaction5に入れたい -> 順番通り並ぶ？
        }
        return action5;
      })

      // const sortedArray = Object.keys(options).map((key) => {
      //   return options[key];
      // }).sort((a, b) => {
      //   return (a.index < b.index) ? -1 : 1;
      // });

      // const action5 = sortedArray.map((action) => {
      //   return action['label'];
      // });

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
    });

  });

})();

// 参考URL https://keizokuma.com/js-array-object-sort/
// 参考URL https://developer.cybozu.io/hc/ja/articles/360023047852