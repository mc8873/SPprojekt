'use strict';
var path = require('path');
var express = require('express');
var Sequelize = require('sequelize');
var fs = require('fs');

var sequelize = new Sequelize('postgres://postgres:cesarces@localhost:5432/radovednez');

var db = {};
fs
.readdirSync(__dirname)
.filter(function(file){
	return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach(function(file) {
	var model = sequelize.import(path.join(__dirname, file));
	db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;