var Odgovor = connection.define('odgovor', {
	vsebina: Sequelize.TEXT,
	vseckov: Sequelize.INTEGER
}, {
	freezeTableName: true
});