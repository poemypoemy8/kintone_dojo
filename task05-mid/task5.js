
(() => {
    'use strict';
    axios.get('https://54o76ppvn8.execute-api.ap-northeast-1.amazonaws.com/prod/bb-dojo',{
      params: {
        id:'dojo'
      }
    })
    .then((resp) =>{
        //取得成功時
        const tableElement = document.getElementById("table");
        resp.data.forEach((value,index) => {
          const tr = document.createElement("tr");
          for(let i = 1; i<4; i++){
            let td = document.createElement("td");
            td.setAttribute("id",(index+1)+"-"+i);
            tr.appendChild(td);
          }
        tableElement.appendChild(tr);
        document.getElementById((index+1)+"-"+1).textContent=resp.data[index].day.value; 
        document.getElementById((index+1)+"-"+2).textContent=resp.data[index].category.value;
        document.getElementById((index+1)+"-"+2).style.color="#fff";
        const label = resp.data[index].label.value;
        switch(label){
          case 'product':
            document.getElementById((index+1)+"-"+2).style.backgroundColor="#87cefa";
            break;
          case 'ir':
            document.getElementById((index+1)+"-"+2).style.backgroundColor= "#ff97c2";
            break;
          case 'company':
            document.getElementById((index+1)+"-"+2).style.backgroundColor="#00fa9a";
            break;
        }
        const link = document.createElement("a");
        document.getElementById((index+1)+"-"+3).appendChild(link);
        link.setAttribute("id","link"+"-"+index);
        document.getElementById("link"+"-"+index).textContent = resp.data[index].content.value;
        document.getElementById("link"+"-"+index).href = resp.data[index].url.value;
        if(resp.data[index].target.value === "_self"){
          document.getElementById("link"+"-"+index).setAttribute("target","_self")
        }else if(resp.data[index].target.value === "_blank"){
          document.getElementById("link"+"-"+index).setAttribute("target","_blank")
        }
      });

    })
    .catch((err) =>{
        console.log('失敗');
        console.log(err);
    });
})();

//これまでのobjectの課題と同じで、繰り返し処理をしてid指定。
//getelementbyidを書けば行けそうな感じがする
//表示するニュースの件数によってデザインが変わる -> 記事の数だけhtml要素を作る必要がある？
  //apndChildとか要素をつくるやつ -> HTML要素いらない
  //forEachでdataの数だけ回して表要素つくる？
    //中で書くやつ）もしカテゴリが○○なら何色、else if カテゴリ○○なら何色、else カテゴリ○○なら何色
    //もしtargetが○○ならリンク先に遷移。リンクの末尾に targetblankもしくはそうじゃないやつを指定


// aタグでいつもは入れている。
// table要素の中にaタグをappendchildする形でつくる。
// 文字列はいつもと同じ形で取得して、リンクはhrefで作成。



//参考URL:https://cly7796.net/blog/javascript/get-json-using-axios/
//参考URL:https://teratail.com/questions/223785 （読み込み順番）
//参考URL：https://cpoint-lab.co.jp/article/202002/13871/ （表要素の作成）
