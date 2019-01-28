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

app.use( express.static('public') );

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/submit', function(request, response){

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

  var actionPhrase;
  if ( request.body.action == 'give' ){
    actionPhrase = 'sent energy';
  } else if ( request.body.action == 'take' ){
    actionPhrase = 'reserved energy'
  } else {
    actionPhrase = 'opted out'
  }

  response.render('submit', { title: 'Hello', message: 'You have ' + actionPhrase });

});

app.get('/submit', function(request, response){

  response.redirect('/');

});

app.get('/test', function(request, response){

  response.render('submit', { title: 'Hello', message: 'You have sent energy' });

});

app.get('/view', function(request, response){

  response.sendFile(__dirname + '/views/view.html');

});

app.get('*', function(request, response){
  response.send('Error 404');
});

var listener = app.listen(8080, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
