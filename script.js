// Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var winston = require('winston');
var nconf = require('nconf');


nconf.argv()
  .file({ file: 'config.json' });

if(nconf.get('setup')){
	setup();
}else if(!nconf.get('mysql')){
	winston.error('No mysql credentials found');
	winston.info('Please run node script --setup');

	process.exit();
}else{
	start();
}

function setup() {
	var install = require('./install.js')
	
	install.setup(function(credentials){

		install.mysql(credentials,function(){

			process.exit();
		})
	});
}

function start(){
	app.use(express.static('public'));
	app.use(favicon(__dirname + '/public/img/favicon.ico')); //serve favicon
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.set('view engine', 'ejs');

	//Routes:

	//index
	app.get('/', function (req, res) {
		var host = req.headers.host;

		res.render('pages/main',{chartid:null,chart:null, url:host});
	});

	//chart
	app.get('/:chartid', function (req, res) {
		var chartid = req.params.chartid;
		var host = req.headers.host;
		var database = require('./database.js');

		database.getObject(chartid, function(object,none){
			if(none){
				res.redirect('/');
			}
			res.render('pages/main',{chartid:chartid,chart:JSON.stringify(object), url:host});
		});
		
	});

	//get schedule data
	app.get('/get/:chartid', function(req, res) {
		var chartid = req.params.chartid;

		getObject(chartid,function(object){

			res.writeHead(200, {"Content-Type": "application/json"});
			res.end(JSON.stringify(output));

		});
	});

	//save schedule
	app.post('/post', function (req, res) {
		var database = require('./database.js');
		var data = JSON.parse(req.body.data);
		database.newChart(req,data, function(success,chartid){

			var chartid = 'thent';
			res.writeHead(200);
			res.end(chartid);
		});

	});

	app.post('/email-feedback-post', function (req,res){
		var text = req.body.message;
		var feedback = {
			text: text
		}

		//post to database
		connection.query('INSERT INTO feedback SET ?', feedback, function(err,res){
			if(err) throw err;

			console.log('feedback: Last insert ID:', res.insertId);
		});

		res.writeHead(200);
		res.end('success');
	});

	app.get('*', function (req, res) {
		res.redirect('/');
	});


	var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
	var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

	var server = app.listen(server_port,server_ip_address);
}