(() => {

  'use strict';

  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], (event) => {
    const value = event.record.重複禁止項目.value;
    const field =  ['重複禁止項目'];
    const id = kintone.app.getId();
    const query = (event.type === 'app.record.create.submit') ? `重複禁止項目 = "${value}"` : `重複禁止項目 = "${value}" and $id != "${id}"`;
    const params = {
      app: id,
      fields: field,
      query: query,
      totalCount : true
    };

    return kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', params)
      .then((resp) => {

        if (resp.totalCount > 0) {
          const recordConfirm = window.confirm('レコードが重複しています。このまま保存しますか？');
          if (recordConfirm) {
            window.alert('保存を実行しました');
          } else {
            window.alert('保存操作をキャンセルしました');
            return false;
          }
        }
        return event;
      }).catch((err) => {
        console.log(err);
      });
  });

})();
