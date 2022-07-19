(() => {
  'use strict';

  kintone.events.on('app.record.create.show', (event) => {

    const params = {
      app: event.appId,
    };

    return kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', params).then((resp) => {
      console.log(resp);
      const options = resp.properties.Table.fields.Action5.options;

      const action5 = [];
      Object.keys(options).forEach((val) => {
        action5[options[val].index] = options[val].label;
      });

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
      console.log(err);
    });

  });

})();

// 参考URL https://keizokuma.com/js-array-object-sort/
// 参考URL https://developer.cybozu.io/hc/ja/articles/360023047852