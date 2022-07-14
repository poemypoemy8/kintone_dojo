(() => {

  'use strict';

  let YYYYMMDD = dateFns.format(new Date(), 'YYYYMMDD'); // 日付のグローバル変数
  let product = ''; // 製品の値のグローバル変数
  let number = ''; // 管理番号のグローバル変数

  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {
    event.record.重複禁止項目.disabled = true;
    event.record.重複禁止項目.value = `${YYYYMMDD}-${product}-${number}`;
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
    product = event.record.サイボウズ製品.value;
    number = event.record.管理番号.value;

    event.record.重複禁止項目.value = `${YYYYMMDD}-${product}-${number}`;

    switch (product) {
      case 'kintone':
        product = 'KN';
        event.record.重複禁止項目.value = `${YYYYMMDD}-${product}-${number}`;
        break;
      case 'Garoon':
        product = 'GR';
        event.record.重複禁止項目.value = `${YYYYMMDD}-${product}-${number}`;
        break;
      case 'サイボウズ Office':
        product = 'OF';
        event.record.重複禁止項目.value = `${YYYYMMDD}+${product}+${number}`;
        break;
      case 'Mailwise':
        product = 'MW';
        event.record.重複禁止項目.value = `${YYYYMMDD}-${product}-${number}`;
        break;
    }

    return event;

  });

  kintone.events.on('app.record.create.show', (event) => {

    const params = {
      app: event.appId,
      fields: '重複禁止項目',
      // query: 
    }

    kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', params).then((resp) => {

      console.log(resp);

      if (resp.records[index].重複禁止項目 === event.record.重複禁止項目) {
        const confirm = window.confirm('レコードが重複しています。このまま保存しますか？')
        if (confirm) {
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