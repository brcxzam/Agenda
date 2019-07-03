import Sequelize from 'sequelize'

const sequelize = new Sequelize('agenda', 'root', '', {
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	logging: false,
	dialectOptions: {
		dateStrings: false,
		typeCast: true,
	},
	timezone: '-05:00',
})

async function connection() {
	try {
		await sequelize.authenticate()
		console.log('DataBase is Connected')
	} catch (error) {
		console.error(error)
	}
}

connection()

export default sequelize
