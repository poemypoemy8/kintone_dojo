(() => {

  'use strict';

  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], (event) => {
    console.log(event);
    const value = event.record.重複禁止項目.value;
    // const field = (event.type === 'app.record.create.submit') ? ['重複禁止項目'] : ['重複禁止項目', '$id'];
    // console.log($id);
    const query = (event.type === 'app.record.create.submit') ? `重複禁止項目 = "${value}"` : (`重複禁止項目 = "${value}"`);
//id のやつは含まない形にしたい
    const params = {
      app: kintone.app.getId(),
      fields: ['重複禁止項目'], 
      query: query, // 文字列
    };


    return kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', params)
      .then((resp) => {
        console.log(resp); // debug

        if (resp.records.length > 0) {
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

// queryを絞り込みたい条件 重複しているレコードだけを持ってくる？