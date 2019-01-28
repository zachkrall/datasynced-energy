const Base = require('clay-base-sdk');

Base.init('pk_1d2af8fdb292c442d559');

var values = [];

var container = document.getElementById('results_container');

Base.entries.findAll().then(function(data){

  // If no records are found, null is returned
  if(data == null){
    return false;
  }
  else{
    // Do something with the found record

    console.log('--DATA--');
    console.log(data);
    console.log('--END DATA--');

    data.map( function(item){

      values.push(item.rowData.amount);

    });

  }

}).then(function(){

  console.log(values);

  var newvalues;

  if( values.length == 0){
    newvalues = 0;
  } else {
    newvalues = Math.ceil( values.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0) / values.length * 100 );
  }

  function add(a, b){
    return a + b;
  }

  var newnew = document.createTextNode(

    'Your energy is at ' + newvalues + '%'

  );
  container.appendChild(newnew);

});
