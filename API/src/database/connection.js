import Sequelize from 'sequelize';

const sequelize = new Sequelize('mysql://root:@localhost:3306/agenda', {
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	logging: false
});

async function connection() {
	try {
		await sequelize.authenticate();
		console.log('DataBase is Connected');
	} catch (error) {
		console.error(error);
	}
}

connection();

export default sequelize;
