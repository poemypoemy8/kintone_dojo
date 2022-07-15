(() => {

  'use strict';

  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], (event) => {

    const params = {
      app: kintone.app.getId(),
      fields: '重複禁止項目'
    };

    return kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', params)
      .then((resp) => {

        for (let i = 0; i < resp.records.length; i++) {
          if (resp.records[[i]].重複禁止項目.value === event.record.重複禁止項目.value) {
            const recordConfirm = window.confirm('レコードが重複しています。このまま保存しますか？');
            if (recordConfirm) {
              window.alert('保存を実行しました');
              break;
            } else {
              window.alert('保存操作をキャンセルしました');
              return false;
            }
          }
        }
        return event;
      }).catch((err) => {
        console.log(err);
      });
  });

})();