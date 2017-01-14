"use strict";

module.exports = function(sequalize, DataTypes) {

var Komentar = sequalize.define('komentar', {
	vsebina: DataTypes.TEXT,
	vseckov: DataTypes.INTEGER
}, {
	freezeTableName: true
});

return Komentar;
};