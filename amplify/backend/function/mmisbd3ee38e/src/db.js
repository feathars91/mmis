let knex = require('knex');
let dbConfig = {
	client: 'postgres',

	connection: {
		user: 'postgres',
		password: 'Abel3186',
		database: 'mmis',
		host: 'database-1.c3rofun2mdg3.us-east-1.rds.amazonaws.com',
		filename: '', // Only used for SQLite
		dateStrings: true
	}
};


module.exports = knex(dbConfig);

