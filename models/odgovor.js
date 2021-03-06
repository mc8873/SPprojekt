"use strict";

module.exports = function(sequalize, DataTypes) {

var Odgovor = sequalize.define('odgovor', {
	vsebina: DataTypes.TEXT,
	vseckov: DataTypes.INTEGER
}, {
	freezeTableName: true,
	classMethods: {
		associate: function(models) {
			Odgovor.belongsTo(models.vprasanje);
			Odgovor.belongsTo(models.uporabnik);
		}
	}
});

return Odgovor;
};