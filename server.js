require('dotenv').config()
var express = require('express');
var app = express();
var pug = require('pug');
var bodyParser = require('body-parser');
var Base = require('clay-base-sdk');
var moment = require('moment');

// Initilized Database
Base.init(process.env.BASE_TOKEN);

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/result', function(request, response){

  var value;

  if ( request.body.action == 'give' ){
      value = 1;
  } else {
      value = -1;
  }

  Base.entries.insert({
    date: moment().format(),
    action: request.body.action,
    amount: value
  });

  response.render('results', { title: 'Hello', message: 'you decided to ' + request.body.action + ' energy' });

});

app.get('/view', function(request, response){

  response.sendFile(__dirname + '/views/results.html');

});

app.get('*ha', function(request, response){
  response.send('Error 404');
});

var listener = app.listen(8080, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
