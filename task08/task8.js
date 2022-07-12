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
  
      })
      .catch((err) =>{
        // console.log(err);
      })
      return event;
    });
  

  
  })();