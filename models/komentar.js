var Komentar = connection.define('komentar', {
	vsebina: Sequelize.TEXT,
	vseckov: Sequelize.INTEGER
}, {
	freezeTableName: true
});