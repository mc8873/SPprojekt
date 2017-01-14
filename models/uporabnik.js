"use strict";
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequalize, DataTypes) {

var Uporabnik = sequalize.define('uporabnik', {
	uporabnikso_ime: DataTypes.STRING,
	password: DataTypes.CHAR
}, {
	hooks: {
		afterValidate: function(uporabnik) {
			uporabnik.password = bcrypt.hashSync(uporabnik.password);
		}
	},
	freezeTableName: true
});

return Uporabnik;
};