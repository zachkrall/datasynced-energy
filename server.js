var express = require('express');
var app = express();
var pug = require('pug');
var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/result', function(request, response){

  var action = request.body.action;

  response.render('results', { title: 'Hello', message: 'you decided to ' + action + ' energy' });

});

app.get('*', function(request, response){
  response.send('Error 404');
});

var listener = app.listen(8080, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
