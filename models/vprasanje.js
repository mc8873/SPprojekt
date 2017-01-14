"use strict";

module.exports = function(sequalize, DataTypes) {

var Vprasanje = sequalize.define('vprasanje', {
	vprasanje_objave: {
		type: DataTypes.STRING,
		allowNull: false
	},
	vsebina_objave: DataTypes.TEXT,
	vseckov: DataTypes.INTEGER
}, {
	freezeTableName: true,
	classMethods: {
		associate: function(models) {
			Vprasanje.belongsTo(models.uporabnik);
		}
	}
});

return Vprasanje;
};