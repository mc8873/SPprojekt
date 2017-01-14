"use strict";

module.exports = function(sequalize, DataTypes) {

var Uporabnik = sequalize.define('uporabnik', {
	uporabnikso_ime: DataTypes.STRING,
	password: DataTypes.TEXT
}, {
	freezeTableName: true,
	classMethods: {
		associate: function(models) {
			Uporabnik.hasMany(models.vprasanje);
			Uporabnik.hasMany(models.odgovor);
			Uporabnik.hasMany(models.komentar);
		}
	}
});

return Uporabnik;
};