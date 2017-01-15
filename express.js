var express = require('express');
var models = require('./models');
//var session = require('express-session');
var session = require('client-sessions');
//var passport = require('passport');
//var localStrategy = require('passport-loccal');
var bodyParser = require('body-parser');
var date = require('datejs');
var $= require('jquery');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var app = express();


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

app.use(session({
  cookieName: 'session',
  secret: 'verysecuresession',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

seqModels.sync({
	force: false
}).then(function () {
	seqModel = seqModels.models;
	uporabnik = seqModel.uporabnik;
	vprasanje = seqModel.vprasanje;
	odgovor = seqModel.odgovor;
	komentar = seqModel.komentar;
	/*
	komentar.create({
	vsebina: 'testna vsebina komentarja',
	vseckov: 6,
	odgovorId: 2,
	uporabnikId: 8
});*/
/*
komentar.bulkCreate([
	{
		vsebina: 'testna vsebina komentarja',
		vseckov: 9,
		odgovorId: 3,
		uporabnikId: 1
	},
	{
		vsebina: 'testna vsebina drugega komentarja',
		vseckov: 8,
		odgovorId: 3,
		uporabnikId: 1
	},
	{
		vsebina: 'testna vsebina tretjega komentarja',
		vseckov: 11,
		odgovorId: 3,
		uporabnikId: 1
	}
	]);
*/
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
	var upporabnik_username = null; 
	if (req.session && req.session.user) {
		upporabnik_username = req.session.user;
	}
	vprasanje.findAll({limit: 10,  order: '"vseckov" DESC'}).then(function (seznamVprasanj){
		res.render('landing',{
			seznamVprasanj: seznamVprasanj,
			username: upporabnik_username
		});
	});
});

app.get('/novo', function(req, res) {
	var upporabnik_username = null; 
	if (req.session && req.session.user) {
		upporabnik_username = req.session.user;
	}
	vprasanje.findAll({limit: 10, order: '"createdAt" DESC'}).then(function (seznamVprasanj){
		res.render('landing',{
			seznamVprasanj: seznamVprasanj,
			username: upporabnik_username
		});
	});
});


app.get('/tedna', function(req, res) {
	var upporabnik_username = null; 
	if (req.session && req.session.user) {
		upporabnik_username = req.session.user;
	}
	vprasanje.findAll({limit: 10, where: { createdAt: { $gt: week } }, order: [['vseckov', 'DESC'], ['createdAt', 'DESC']]}).then(function (seznamVprasanj){
		res.render('landing',{
			seznamVprasanj: seznamVprasanj,
			username: upporabnik_username
		});
	});
});

app.get('/meseca', function(req, res) {
	var upporabnik_username = null; 
	if (req.session && req.session.user) {
		upporabnik_username = req.session.user;
	}
	vprasanje.findAll({limit: 10, where: { createdAt: { $gt: month } }, order: [['vseckov', 'DESC'], ['createdAt', 'DESC']]}).then(function (seznamVprasanj){
		res.render('landing',{
			seznamVprasanj: seznamVprasanj,
			username: upporabnik_username
		});
	});
});


app.post('/registration', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	//preveri ce username ze obstaja
	uporabnik.findOne({uporabnikso_ime: req.body.uporabnisko}).then(function (uporabnik) {
	 		if(uporabnik.dataValues == null){
	 			res.redirect('registration');
	 		}
	 		else {
	 			//dodamo uporabnika v pb
	 			seqModels.sync({
					force: false
				}).then(function () {
					seqModel = seqModels.models;
					uporabnik = seqModel.uporabnik;
					vprasanje = seqModel.vprasanje;
					odgovor = seqModel.odgovor;
					komentar = seqModel.komentar;

					uporabnik.create({
						uporabnikso_ime: req.body.uporabnisko,
						password: req.body.geslo
					});
				});
				res.redirect('/');
	 		}
	 	});
});

app.post('/login', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	//preverimo ce je uporabnik v pb
		 console.log(req.body.uporabnisko);
	 	uporabnik.findAll({where: {uporabnikso_ime: req.body.uporabnisko}}).then(function (uporabnik) {
	 		console.log(req.body.geslo);
	 		console.log(uporabnik[0].dataValues.password);
	 		if(bcrypt.compareSync(req.body.geslo, uporabnik[0].dataValues.password)){
	 			req.session.user = req.body.uporabnisko;
	 			res.redirect('/');
	 		}
	 		else {
	 			res.redirect('login');
	 		}
	 	});
});

app.post('/objavi_vprasanje', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	var upporabnik_username = null; 
	if (req.session && req.session.user) {
		upporabnik_username = req.session.user;
	}
	if(upporabnik_username == null) {
				seqModels.sync({
					force: false
				}).then(function () {
					seqModel = seqModels.models;
					uporabnik = seqModel.uporabnik;
					vprasanje = seqModel.vprasanje;
					odgovor = seqModel.odgovor;
					komentar = seqModel.komentar;

					vprasanje.create({
						vprasanje_objave: req.body.vprasanje,
						vsebina_objave: req.body.opis,
						vseckov: 0
					});
				});
				res.redirect('/');
	}
	else {
		uporabnik.findAll({where: {uporabnikso_ime: req.session.user}}).then(function (uporabnikSeznam) {
	 		
	 		seqModels.sync({
					force: false
				}).then(function () {
					seqModel = seqModels.models;
					uporabnik = seqModel.uporabnik;
					vprasanje = seqModel.vprasanje;
					odgovor = seqModel.odgovor;
					komentar = seqModel.komentar;

					vprasanje.create({
						vprasanje_objave: req.body.vprasanje,
						vsebina_objave: req.body.opis,
						vseckov: 0,
						uporabnikId: uporabnikSeznam[0].dataValues.id
					});
				});
				res.redirect('/');
	 	});
	}
});

app.post('/odgovori', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	var upporabnik_username = null; 
	if (req.session && req.session.user) {
		upporabnik_username = req.session.user;
	}
	if(upporabnik_username == null) {
				seqModels.sync({
					force: false
				}).then(function () {
					seqModel = seqModels.models;
					uporabnik = seqModel.uporabnik;
					vprasanje = seqModel.vprasanje;
					odgovor = seqModel.odgovor;
					komentar = seqModel.komentar;

					odgovor.create({
						vsebina: req.body.odgovor,
						vseckov: 0,
						vprasanjeId: req.body.vprasanje
					});
				});
				res.redirect('/vprasanje/' + req.body.vprasanje);
	}
	else {
		uporabnik.findAll({where: {uporabnikso_ime: req.session.user}}).then(function (uporabnikSeznam) {
	 		
	 		seqModels.sync({
					force: false
				}).then(function () {
					seqModel = seqModels.models;
					uporabnik = seqModel.uporabnik;
					vprasanje = seqModel.vprasanje;
					odgovor = seqModel.odgovor;
					komentar = seqModel.komentar;

					odgovor.create({
						vsebina: req.body.odgovor,
						vseckov: 0,
						vprasanjeId: req.body.vprasanje,
						uporabnikId: uporabnikSeznam[0].dataValues.id
					});
				});
				res.redirect('/vprasanje/' + req.body.vprasanje);
	 	});
	}
});

app.post('/komentiraj', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	var upporabnik_username = null; 
	if (req.session && req.session.user) {
		upporabnik_username = req.session.user;
	}
	if(upporabnik_username == null) {
				seqModels.sync({
					force: false
				}).then(function () {
					seqModel = seqModels.models;
					uporabnik = seqModel.uporabnik;
					vprasanje = seqModel.vprasanje;
					odgovor = seqModel.odgovor;
					komentar = seqModel.komentar;

					komentar.create({
						vsebina: req.body.komentar,
						vseckov: 0,
						odgovorId: req.body.odgovor
					});
				});
				res.redirect('/vprasanje/' + req.body.vprasanje);
	}
	else {
		uporabnik.findAll({where: {uporabnikso_ime: req.session.user}}).then(function (uporabnikSeznam) {
	 		
	 		seqModels.sync({
					force: false
				}).then(function () {
					seqModel = seqModels.models;
					uporabnik = seqModel.uporabnik;
					vprasanje = seqModel.vprasanje;
					odgovor = seqModel.odgovor;
					komentar = seqModel.komentar;

					komentar.create({
						vsebina: req.body.komentar,
						vseckov: 0,
						odgovorId: req.body.odgovor,
						uporabnikId: uporabnikSeznam[0].dataValues.id
					});
				});
				res.redirect('/vprasanje/' + req.body.vprasanje);
	 	});
	}
});

app.get('/registration', function(req,res) {
	res.render('registration');
});

app.get('/login', function(req,res) {
	req.session.reset();
	res.render('login');
});


app.get('/vprasaj', function(req,res) {
	var upporabnik_username = null; 
	if (req.session && req.session.user) {
		upporabnik_username = req.session.user;
	}
	res.render('vprasaj', {
		username: upporabnik_username
	});
});


app.get('/logout', function(req,res) {
	req.session.reset();
	res.redirect('/');
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
	var upporabnik_username = null; 
	if (req.session && req.session.user) {
		upporabnik_username = req.session.user;
	}
	if(req.vprasanje != null) {
		uporabnik.findAll({where: {id: req.vprasanje.dataValues.uporabnikId }}).then(function (uporabnikInstanca) {
			//poiscemo vse odgovore na vprasanje
				odgovor.findAll({where: {vprasanjeId: req.vprasanje.dataValues.id}, order: '"vseckov" DESC'}).then (function (seznamOdgovorov){
					//dobimo seznam vseh odgovorov v trenutnem threadu
					var idOdgovorov = [];
					var idUporabnikov = [];
					for (var i=0; i<seznamOdgovorov.length; i++) {
						idOdgovorov.push(seznamOdgovorov[i].dataValues.id);
						idUporabnikov.push(seznamOdgovorov[i].dataValues.uporabnikId);
					}

					//najdemo vse komentarje ki se nanasajo na objavo
					komentar.findAll({where: {odgovorId: {$in: idOdgovorov}}, order: '"vseckov" DESC'}).then(function(seznamKomentarjev){
						//dodamo se uporabnike ki so v komentrajih
						for (var i=0; i<seznamKomentarjev.length; i++) {
							idUporabnikov.push(seznamKomentarjev[i].dataValues.uporabnikId);
						}
						//poiscemo vse uporabnike
						uporabnik.findAll({where: {id: {$in: idUporabnikov}}}).then(function(seznamUporabnikov) {
							res.render('vprasanjeView', {
					    	mainVprasanje: req.vprasanje,
					    	uporabnikOP: uporabnikInstanca[0].dataValues.uporabnikso_ime,
					    	seznamOdg: seznamOdgovorov,
					    	seznamKom: seznamKomentarjev,
					    	seznamUpor: seznamUporabnikov,
							username: upporabnik_username
							});

						});
					});
					
				});
		    });
	}
});

app.use('/',express.static(__dirname + '/')); //__dirname resolves to project folder

app.listen(3000, function(){
	console.log('Express started on port 3000 press Ctrl-c to terimnate.');
});