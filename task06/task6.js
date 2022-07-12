(() => {
    'use strict';
    kintone.events.on('app.record.create.show', (event) => {
    const newRow1 = createValue('あくなき探求','',['未振り返り']);
    const newRow2 = createValue('不屈の心体','',['未振り返り']);
    const newRow3 = createValue('理想への共感','',['未振り返り']);
    const newRow4 = createValue('心を動かす','',['未振り返り']);
    const newRow5 = createValue('知識を増やす','',['未振り返り']);
    const newRow6 = createValue('公明正大','',['未振り返り']);

    event.record.Table.value = [
      newRow1,
      newRow2,
      newRow3,
      newRow4,
      newRow5,
      newRow6
    ];
    return event;

	});

  const createValue = (Action,text,situation) => {
    return{
      'value' : {
          'Action5':{
            value:Action,
            type:'DROP_DOWN',
          },
          '課題':{
            value:text,
            type:'MULTI_LINE_TEXT', 
          },
          '状況':{
            value:situation,
            type:'CHECK_BOX',
          }
      }
    };
  } 
  
})();

// kintone.app.record.set({record:record});
// return event;
//テーブルにプッシュすることで、詳細画面が出たときに列が増える？
//最後にレコードセットしても結果が返ってこない
// 

//サブテーブルが5つ追加されている
//ドロップダウンの値があらかじめ決められている
//「状況」欄がはじめから未振り返りになっている
//action のプルダウンの数を配列にして
//配列の部分に行追加の設定を書けば処理が短く済みそう?
//プッシュを行う関数を5回,Action5の配列を基にforEachの中にいれて繰り返す
//Action 5は、配列のindex番号を入れてすべて配列の文字が出てくるようにする？
//'課題'フィールドは空欄にしておく
//'状況'フィールドは'未振り返り'が初めから選ばれた状態に設定

//まず関数をつくるところから

//イベント
//レコードを追加する画面を開いたときに
//表が6つになっている
//Action5+1の初期値が決め打ちで決まっている
//プッシュを行う関数を5回書くやり方と、表自体に変更を行って6つにするやり方がある？
//Action5の値が決め打ちで構わないとのことなので、表全体を書き直すスタイルで行く？

//参考：kintoneにおけるテーブル操作の基本
//https://developer.cybozu.io/hc/ja/articles/360022502911-kintone%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB%E6%93%8D%E4%BD%9C%E3%81%AE%E5%9F%BA%E6%9C%AC-%E8%A1%8C%E3%81%AE%E8%BF%BD%E5%8A%A0-%E6%9B%B4%E6%96%B0-%E5%89%8A%E9%99%A4-
//参考：レコード追加時にテーブルへ初期値を入れる
//https://developer.cybozu.io/hc/ja/articles/202796890-%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E8%BF%BD%E5%8A%A0%E6%99%82%E3%81%AB%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB%E3%81%B8%E5%88%9D%E6%9C%9F%E5%80%A4%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B-

