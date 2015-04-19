var express = require('express');
var app = express();

app.set('port',(process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');

app.get('/', function(req, res){
  res.render('index');
});

app.listen(app.get('port'), function(){
  console.log("app running at localhost:" + app.get('port'));
});
