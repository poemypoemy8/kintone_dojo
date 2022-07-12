( () =>{

    'use strict';

    const today = new Date();
    const year = today.getFullYear(); //2022
    let month = today.getMonth() + 1; //7
    let date = today.getDate();
    month = ('0' +month).slice(-2);
    date = ('0' + date).slice(-2);
    const YYYYMMDD = year + month + date;
    let product =''; //製品の値のグローバル変数
    let number = ''; //管理番号のグローバル変数

    kintone.events.on(['app.record.create.show','app.record.edit.show'],(event) => {
      console.log(event);
      event.record.重複禁止項目_文字列.disabled = true;
      event.record.重複禁止項目_文字列.value = `${YYYYMMDD}-${product}-${number}`;
      return event;
    });

    kintone.events.on(['app.record.create.change.サイボウズ製品','app.record.edit.change.サイボウズ製品'],(event) =>{
      product = event.record.サイボウズ製品.value;

      switch (product){
        case 'kintone':
          product = 'KN';
          event.record.重複禁止項目_文字列.value = `${YYYYMMDD}-${product}-${number}`;
          break;
        case 'Garoon':
          product = 'GR';
          event.record.重複禁止項目_文字列.value = `${YYYYMMDD}-${product}-${number}`;
          break;
        case 'サイボウズ Office':
          product = 'OF';
          event.record.重複禁止項目_文字列.value = `${YYYYMMDD}+${product}+${number}`;
          break;
        case 'Mailwise':
          product = 'MW';
          event.record.重複禁止項目_文字列.value = `${YYYYMMDD}-${product}-${number}`;
          break;
      }

      return event;

    });

    kintone.events.on(['app.record.create.change.管理番号','app.record.edit.change.管理番号'],(event)=>{
      number = event.record.管理番号.value;
      event.record.重複禁止項目_文字列.value = `${YYYYMMDD}-${product}-${number}`;
      return event;
    });

})();