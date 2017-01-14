"use strict";

module.exports = function(sequalize, DataTypes) {

var Vprasanje = sequalize.define('vprasanje', {
	vprasanje_objave: DataTypes.STRING,
	vsebina_objave: DataTypes.TEXT,
	vseckov: DataTypes.INTEGER
}, {
	freezeTableName: true,
	classMethods: {
		associate: function(models) {
			Vprasanje.hasMany(models.odgovor);
		}
	}
});

return Vprasanje;
};