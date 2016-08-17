var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var app = express();

var logonUrl = '/slack/logon';
var logonUrlWithId = '/slack/logon/:id/:password';

var allUsersUrl = '/allusers';

app.use(express.static('public'));

app.get('/', function (req, res) {
  
	res.send('Hello World!');
});

app.get(logonUrl, function (req, res) {
    console.log('returning a response.....');
	res.send('["Hello World! Going to validate user."]');
});

app.get('/personal', function (req, res) {
  
	res.sendFile( __dirname + "/public/" + "personal.html" );
});

app.get(logonUrlWithId, function (req, res) {
	
	var userid = req.params.id.substr(1);
	var password = req.params.password.substr(1);
	var returnArray = [];
	var returnStatus = '';

	var x = require('./db.js');

//var conn = new sqlite3.Database('./slack.db');

	var conn = x.connection('slack.db');

	var p = x.validateUser(conn, userid, password);
	p.then(
		(val) => {
			if (val.length === 1) {
				returnStatus = 'LOGON SUCCESS';
			} else {
				returnStatus = 'LOGON FAILURE';
			}
	
			returnArray.push(returnStatus);
			res.send(returnArray);
		},
		(err) => {
			returnStatus = 'LOGIN FAILURE DUE TO EXCEPTION...';
			returnArray.push(returnStatus);
			res.send(returnArray);
		}
	);
});






/* app.get('/horse', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from the horse!');
}); */


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
