(() => {

  'use strict';

  let YYYYMMDD = dateFns.format(new Date(), 'YYYYMMDD'); // 日付のグローバル変数

  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {
    event.record.重複禁止項目_文字列.disabled = true;
    return event;
  });

  kintone.events.on([
    'app.record.create.change.日付',
    'app.record.edit.change.日付',
    'app.record.create.change.サイボウズ製品',
    'app.record.edit.change.サイボウズ製品',
    'app.record.create.change.管理番号',
    'app.record.edit.change.管理番号'
  ], (event) => {

    YYYYMMDD = dateFns.format(event.record.日付.value, 'YYYYMMDD');
    const product = event.record.サイボウズ製品.value;
    const number = event.record.管理番号.value; 

    switch (product) {
      case 'kintone':
        event.record.重複禁止項目_文字列.value = `${YYYYMMDD}-KN-${number}`;
        break;
      case 'Garoon':
        event.record.重複禁止項目_文字列.value = `${YYYYMMDD}-GR-${number}`;
        break;
      case 'サイボウズ Office':
        event.record.重複禁止項目_文字列.value = `${YYYYMMDD}-OF-${number}`;
        break;
      case 'Mailwise':
        event.record.重複禁止項目_文字列.value = `${YYYYMMDD}-MW-${number}`;
        break;
    }

    return event;

  });

})();