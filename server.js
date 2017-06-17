var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongojs = require('mongojs');

var app = express();
var PORT = process.env.PORT || 3000; 
app.set('port', process.env.PORT || 3000);

var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

io.on('connection', function(socket) {

	socket.on('message', function(msg) {

		io.emit('message', msg);

	}); 
}); 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

mongodb:
var databaseUrl = 
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

db.on('error', function (err) {
  console.log('MongoDB Error: ', err);
});

app.get('/', function(req, res){

  res.sendFile('./public/index.html');
  
}); 

app.get('/api/', function(req, res) {

	db.articles.find({}).sort({article_pub_date: -1}, function(err, docs) {

		if (err) throw err;

		console.log('getting the articles');

		res.send(docs);

	}); 

}); 

app.post('/api/', function(req, res) {

	var article = req.body;

	db.articles.insert(article, function(err, docs) {

		if (err) throw err;

		console.log('saved to db');

		res.send(docs);

	}); 

}); 

app.post('/api/delete/', function(req, res) {

	var article = req.body;

	console.log(article);

	db.articles.remove({"_id": (mongojs.ObjectId(article.article_id))}, function(err, docs) {
		
		if (err) throw err;

		console.log('article deleted');

		res.send(docs);

	}); 

}); 

http.listen(app.get('port'), function() {
	console.log('App listening on PORT: ' + PORT);
});