(() =>{
    'use strict';
  
    kintone.events.on('app.record.create.show',(event) =>{
      console.log(event);
  
      const params = {
        app: event.appId,
      }
      //上部をうまく書いたらgetが成功してrespが出力できるはず
      //respの中から設定して、データをならべる
      //今はレコードの情報を取得してしまっている。ではなく、フォームの内容を一覧に表示したい。
  
      kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true),'GET',params)
      .then((resp) =>{
        console.log(resp);
        //task6と同じように、respから取ってきたデータをvalueの中に設定する
        let newRow = [];
        const action5 = resp.properties.Table.fields.Action5.options;
        let result = resp['properties']['Table']['fields']['Action5']['options'].map(function(rec) {
          //①
          return {
            rec : rec
          , key : resp['properties']['Table']['fields']['Action5']['options']['index']
          };
        }).sort(function(a, b){    
          //②
          return (a.key < b.key) ? -1 : 1;  //オブジェクトの昇順ソート
        }).map(function(obj) {
          //③
          return obj.rec;
        });

        console.log(result);

        // const actionArray = Object.keys(action5);
        // console.log(actionArray); //length:6

        action5.forEach((val,index) => {
          newRow[index] = resp.properties.Table.fields.Action5[val];
          console.log(newRow[index]);
        });
        // console.log(newRow);

        // event.record.Table.value = newRow;
        

      })
      .catch((err) =>{
        // console.log(err);
      })

      return event;
    });
  

  
  })();

  // 参考URL https://keizokuma.com/js-array-object-sort/

