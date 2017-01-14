var express = require('express');
var models = require('./models');

/*
var connection = new Sequelize('postgres://postgres:cesarces@localhost:5432/radovednez');

var Uporabnik = connection.define('uporabnik', {
	uporabnikso_ime: Sequelize.STRING,
	password: Sequelize.TEXT
}, {
	freezeTableName: true
});

var Vprasanje = connection.define('vprasanje', {
	vprasanje_objave: Sequelize.STRING,
	vsebina_objave: Sequelize.TEXT,
	vseckov: Sequelize.INTEGER,
}, {
	freezeTableName: true
});

var Odgovor = connection.define('odgovor', {
	vsebina: Sequelize.TEXT,
	vseckov: Sequelize.INTEGER
}, {
	freezeTableName: true
});

var Komentar = connection.define('komentar', {
	vsebina: Sequelize.TEXT,
	vseckov: Sequelize.INTEGER
}, {
	freezeTableName: true
});

Uporabnik.hasMany(Vprasanje, { foreignKey: 'opid' });
Uporabnik.hasMany(Odgovor, { foreignKey: 'opid' });
Uporabnik.hasMany(Komentar, { foreignKey: 'opid' });
Vprasanje.hasMany(Odgovor, { foreignKey: 'vprasanjeid' });
Odgovor.hasMany(Komentar, { foreignKey: 'odgovorid' });

connection.sync({
	force: true
}).then(function () {
	Uporabnik.create({
		uporabnikso_ime: 'skankhunt42',
		password: 'hashedpass'
	});
});
*/
var path = require('path');
var app = express();
app.set('view engine', 'ejs');

models.sequelize.sync({
	force: true
})


var models = models.sequelize.models;
var Uporabnik = models.Uporabnik;
var Vprasanje = models.Vprasanje;
var Odgovor = models.Odgovor;
var Komentar = models.Komentar;


app.get('/', function (req, res) {
   res.render(__dirname + '/views/landing.ejs');
})

app.use('/',express.static(__dirname + '/')); //__dirname resolves to project folder

app.listen(3000, function(){
	console.log('Express started on port 3000 press Ctrl-c to terimnate.');
});