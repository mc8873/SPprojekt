var express = require('express');
var models = require('./models');
var expressSession = require('express-session');
var date = require('datejs');
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

var thisWeek = (7).days().ago();
var thisMonth = (30).days().ago();
var week = thisWeek.toString('yyyy-MM-dd') + " 00:00:00.000 +00:00";
var month = thisMonth.toString('yyyy-MM-dd') + " 00:00:00.000 +00:00";


seqModels.sync({
	force: false
}).then(function () {
	seqModel = seqModels.models;
	uporabnik = seqModel.uporabnik;
	vprasanje = seqModel.vprasanje;
	odgovor = seqModel.odgovor;
	komentar = seqModel.komentar;
	/*
	vprasanje.bulkCreate([
	{
		vprasanje_objave: 'TestnoVprasanje17',
		vsebina_objave: 'testna vsebina',
		vseckov: 14,
		uporabnikId: 2
	},
	{
		vprasanje_objave: 'TestnoVprasanje26',
		vsebina_objave: 'testna vsebina',
		vseckov: 15,
		uporabnikId: 2
	},
	{
		vprasanje_objave: 'TestnoVprasanje35',
		vsebina_objave: 'testna vsebina',
		vseckov: 8,
		uporabnikId: 1
	}
	]);*/
});


app.set('view engine', 'ejs');


app.get('/', function(req, res) {
	
	vprasanje.findAll({limit: 10,  order: '"vseckov" DESC'}).then(function (seznamVprasanj){
		res.render('landing',{
			seznamVprasanj: seznamVprasanj
		});
	});
});

app.get('/novo', function(req, res) {
	
	vprasanje.findAll({limit: 10, order: '"createdAt" DESC'}).then(function (seznamVprasanj){
		res.render('landing',{
			seznamVprasanj: seznamVprasanj
		});
	});
});


app.get('/tedna', function(req, res) {
	
	vprasanje.findAll({limit: 10, where: { createdAt: { $gt: week } }, order: [['vseckov', 'DESC'], ['createdAt', 'DESC']]}).then(function (seznamVprasanj){
		res.render('landing',{
			seznamVprasanj: seznamVprasanj
		});
	});
});

app.get('/meseca', function(req, res) {
	
	vprasanje.findAll({limit: 10, where: { createdAt: { $gt: month } }, order: [['vseckov', 'DESC'], ['createdAt', 'DESC']]}).then(function (seznamVprasanj){
		res.render('landing',{
			seznamVprasanj: seznamVprasanj
		});
	});
});


app.param('vprId', function(req, res, next, vprId) {

  	vprasanje.findAll({where: {id: vprId}}).then( function(vprasanjeInstanca) {
    if (vprasanjeInstanca == null) {
    	console.log('shit');
    } else {
    	//console.log(vprasanjeInstanca[0].dataValues);
      req.vprasanje = vprasanjeInstanca[0];
    };

    next();
  });
});


app.get('/vprasanje/:vprId', function (req, res) {
	if(req.vprasanje != null) {
		uporabnik.findAll({where: {id: req.vprasanje.dataValues.uporabnikId }}).then(function (uporabnikInstanca) {
				odgovor.findAll({where: {vprasanjeId: req.vprasanje.dataValues.id}}).then (function (seznamOdgovorov){
					seznamOdgovorov.forEach(odgovor) //oshit...
				});
				//res.render('vprasanjeView', {
		    	//mainVprasanje: req.vprasanje,
		    	//uporabnikOP: uporabnikInstanca[0].dataValues.uporabnikso_ime
		    });
		});
	}
});

app.use('/',express.static(__dirname + '/')); //__dirname resolves to project folder

app.listen(3000, function(){
	console.log('Express started on port 3000 press Ctrl-c to terimnate.');
});