(() => {
  'use strict';
  axios.get('https://54o76ppvn8.execute-api.ap-northeast-1.amazonaws.com/prod/bb-dojo', {
    params: {
      id: 'dojo'
    }
  })
    .then((resp) => {
      // 取得成功時
      const tableElement = document.getElementById('table');

      resp.data.forEach((val, index) => { // 行数をニュースの数文増やしている
        const tr = document.createElement('tr');
        tableElement.appendChild(tr);
        tr.setAttribute('id', `${index}`);

        const tableData = document.getElementById(`${index}`);

        tableData.innerHTML += `<td><p class = "day">${resp.data[index].day.value}</p></td>`;
        tableData.innerHTML += `<td  class = "category"><p>${resp.data[index].category.value}</p></td>`;
        tableData.innerHTML += `<td><a class = "content" link>${resp.data[index].content.value}</a></td>`;

        const label = resp.data[index].label.value;
        switch (label) {
          case 'product':
            document.getElementsByClassName('category')[index].classList.add('product');
            break;
          case 'ir':
            document.getElementsByClassName('category')[index].classList.add('ir');
            break;
          case 'company':
            document.getElementsByClassName('category')[index].classList.add('company');
            break;
        }

        const content = document.getElementsByClassName('content')[index];
        content.href = resp.data[index].url.value;

        if (resp.data[index].target.value === '_self') {
          content.setAttribute('target', '_self');
        } else if (resp.data[index].target.value === '_blank') {
          content.setAttribute('target', '_blank');
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
