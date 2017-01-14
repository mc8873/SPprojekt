var express = require('express');
var models = require('./models');
var expressSession = require('express-session');
var $= require('jquery');
var path = require('path');
var app = express();

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



var seqModels = models.sequelize;
var seqModel;
var uporabnik;
var vprasanje;
var odgovor;
var komentar;

seqModels.sync({
	force: true
}).then(function () {
	seqModel = seqModels.models;
	uporabnik = seqModel.uporabnik;
	vprasanje = seqModel.vprasanje;
	odgovor = seqModel.odgovor;
	komentar = seqModel.komentar;

	uporabnik.create({
		uporabnikso_ime: 'skankhunt42',
		password: 'hashedpass'
	});
	vprasanje.create({
		vprasanje_objave: 'Kako ugasniti racunalnik?',
		vsebina_objave: 'Zelo me zanima kako ugasniti racunalnik, to sem si vedno zelel znati.',
		vseckov: 12,
		uporabnikId: 2
	});
});


app.set('view engine', 'ejs');


app.get('/', function (req, res) {
   res.render(__dirname + '/views/landing.ejs');
})

app.use('/',express.static(__dirname + '/')); //__dirname resolves to project folder

app.listen(3000, function(){
	console.log('Express started on port 3000 press Ctrl-c to terimnate.');
});