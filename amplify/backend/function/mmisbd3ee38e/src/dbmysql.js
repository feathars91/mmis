let knex = require('knex');
let dbConfig = {
	client: 'mysql',

	connection: {
		user: 'admin',
		password: 'Abel3186',
		database: 'balls',
		host: 'database-1.cbn8d1qbifew.us-west-2.rds.amazonaws.com',
		filename: '', // Only used for SQLite
		dateStrings: true
	}
};


module.exports = knex(dbConfig);
