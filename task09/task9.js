(() => {

  'use strict';

  kintone.events.on(['app.record.create.show', 'app.record.edit.show'],  (event) => {

    const params = {
      app: event.appId, //kintone.app.getId(),
      fields: '重複禁止項目',
      // query: 重複禁止項目 = 
    }

    return kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', params).then((resp) => {

      console.log(event);
      console.log(resp);

      if (resp.records[index].重複禁止項目 === event.record.重複禁止項目.value) {
        const recordConfirm = window.confirm('レコードが重複しています。このまま保存しますか？')
        if (recordConfirm) {
          window
          return event;
        } else {
          return false;
        }
      }

      return event;

    }).catch((err) => {
      return event;
    })


    return event;
  })

})();