var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public'))); //__dirname resolves to project folder

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/public/landing.html');
})

app.listen(3000, function(){
	console.log('Express started press Ctrl-c to terimnate.');
});