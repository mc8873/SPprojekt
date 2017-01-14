"use strict";

module.exports = function(sequalize, DataTypes) {

var Komentar = sequalize.define('komentar', {
	vsebina: DataTypes.TEXT,
	vseckov: DataTypes.INTEGER
}, {
	freezeTableName: true,
	classMethods: {
		associate: function(models) {
			Komentar.belongsTo(models.odgovor);
			Komentar.belongsTo(models.uporabnik);
		}
	}
});

return Komentar;
};