(() => {
  'use strict';
  const action5 = ['あくなき探求','不屈の心体','理想への共感','心を動かす','知識を増やす','公明正大'];
  const newRow = [];

  kintone.events.on('app.record.create.show',(event) =>{

    action5.forEach((val,index)=>{
      newRow[index] = 
      {
        'value':{
          'Action5':{
            'type':'DROP_DOWN',
            'value':action5[index],
          },
          '課題':{
            'type':'MULTI_LINE_TEXT',
            'value':'',
          },
          '状況':{
            'type':'CHECK_BOX',
            'value':['未振り返り']
          }
        }
      } 
      event.record.Table.value[index] = newRow[index];
    })

    return event;

  });
 

})();