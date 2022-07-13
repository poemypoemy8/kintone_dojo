(() =>{
  'use strict';

  kintone.events.on('app.record.create.show', (event) => {
    console.log(event);

    const params = {
      app: event.appId,
    }
    //上部をうまく書いたらgetが成功してrespが出力できるはず
    //respの中から設定して、データをならべる
    //今はレコードの情報を取得してしまっている。ではなく、フォームの内容を一覧に表示したい。

    kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true),'GET',params)
    .then((resp) => {
      // console.log(resp);
      //task6と同じように、respから取ってきたデータをvalueの中に設定する
      // const action5 = resp.properties.Table.fields.Action5.options;
      // let result = resp['properties']['Table']['fields']['Action5']['options'].map(function(rec) {
      //   return {
      //     rec : rec
      //   , key : resp['properties']['Table']['fields']['Action5']['options']['index']
      //   };
      // }).sort(function(a, b){    
      //   return (a.key < b.key) ? -1 : 1;  //オブジェクトの昇順ソート
      // }).map(function(obj) {
      //   return obj.rec;
      // });

      // console.log(result);

      const action5 = Object.keys(resp.properties.Table.fields.Action5.options);
      console.log(action5); // debug
      const newRow = [];

      action5.forEach((val, index) => {
        newRow[index] = {
          'value': {
            'Action5': {
              'type': 'DROP_DOWN',
              'value': action5[index],
            },
            '課題': {
              'type': 'MULTI_LINE_TEXT',
              'value': '',
            },
            '状況': {
              'type': 'CHECK_BOX',
              'value': ['未振り返り']
            }
          }
        };
        event.record.Table.value[index] = newRow[index];
        return newRow;
      });        

    })
    .catch((err) => {
      console.log('取得失敗');
    })

    return event;

  });
  
})();

  // 参考URL https://keizokuma.com/js-array-object-sort/

