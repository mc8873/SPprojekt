var express = require('express');
var Sequelize = require('sequelize');


var connection = new Sequelize('postgres://postgres:cesarces@localhost:5432/radovednez');

var Uporabnik = connection.define('uporabnik', {
	uporabnikso_ime: Sequelize.STRING,
	password: Sequelize.TEXT
}, {
	freezeTableName: true
});

connection.sync({
	force: true
}).then(function () {
	Uporabnik.create({
		uporabnikso_ime: 'skankhunt42',
		password: 'hashedpass'
	});
});

/*var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public'))); //__dirname resolves to project folder

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/public/landing.html');
})

app.listen(3000, function(){
	console.log('Express started press Ctrl-c to terimnate.');
});*/