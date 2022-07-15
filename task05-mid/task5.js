(() => {
  'use strict';
  axios.get('https://54o76ppvn8.execute-api.ap-northeast-1.amazonaws.com/prod/bb-dojo', {
    params: {
      id: 'dojo'
    }
  })
    .then((resp) => {
      // 取得成功時
      console.log(resp); //debug

      const tableElement = document.getElementById('table');
      resp.data.forEach((value, index) => {
        const tr = document.createElement('tr');
        for (let i = 1; i < 4; i++) {
          const td = document.createElement('td');
          td.setAttribute('id', (index) + '-' + i);
          tr.appendChild(td);
        }
        tableElement.appendChild(tr);
        document.getElementById((index) + '-' + 1).textContent = resp.data[index].day.value;
        document.getElementById((index) + '-' + 2).textContent = resp.data[index].category.value;
        document.getElementById((index) + '-' + 2).style.color = '#fff';
        
        const label = resp.data[index].label.value;
        switch (label) {
          case 'product':
            document.getElementById((index) + '-' + 2).style.backgroundColor = '#87cefa';
            break;
          case 'ir':
            document.getElementById((index) + '-' + 2).style.backgroundColor = '#ff97c2';
            break;
          case 'company':
            document.getElementById((index) + '-' + 2).style.backgroundColor = '#00fa9a';
            break;
        }
        const link = document.createElement('a');
        document.getElementById((index) + '-' + 3).appendChild(link);
        link.setAttribute('id', 'link' + '-' + index);
        document.getElementById('link' + '-' + index).textContent = resp.data[index].content.value;
        document.getElementById('link' + '-' + index).href = resp.data[index].url.value;
        if (resp.data[index].target.value === '_self') {
          document.getElementById('link' + '-' + index).setAttribute('target', '_self');
        } else if (resp.data[index].target.value === '_blank') {
          document.getElementById('link' + '-' + index).setAttribute('target', '_blank');
        }
      });

    })
    .catch((err) => {
      // 取得失敗時 今回はskip
      console.log(err);
    });
})();

// 参考URL:https://cly7796.net/blog/javascript/get-json-using-axios/
// 参考URL:https://teratail.com/questions/223785 （読み込み順番）
// 参考URL：https://cpoint-lab.co.jp/article/202002/13871/ （表要素の作成）