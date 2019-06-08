import { Model, STRING, INTEGER, DOUBLE, DATE, BOOLEAN, TIME } from 'sequelize'
import sequelize from './connection'

class User extends Model {}
User.init(
	{
		firstName: {
			type: STRING,
			allowNull: false,
			validate: {
				is: ['^[a-zñáéíóúü ]+$', 'i'],
				notEmpty: true,
			},
		},
		lastName: {
			type: STRING,
			validate: {
				is: ['^[a-zñáéíóúü ]+$', 'i'],
				notEmpty: true,
			},
		},
		email: {
			type: STRING,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: STRING,
			allowNull: false,
		},
		profile_image: {
			type: STRING,
			defaultValue: 'default.png',
			validate: {
				is: ['^[^/+:+*+"+<+>+|]+$'],
			},
		},
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['email'],
			},
		],
		modelName: 'User',
		sequelize,
	}
)

class Subject extends Model {}
Subject.init(
	{
		name: {
			type: STRING,
			allowNull: false,
			validate: {
				is: ['^[^/+:+*+"+<+>+|]+$'],
			},
		},
		user: {
			type: INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
	},
	{
		modelName: 'Subject',
		timestamps: false,
		sequelize,
	}
)

class Score extends Model {}
Score.init(
	{
		subject: {
			type: INTEGER,
			primaryKey: true,
			references: {
				model: Subject,
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
		advance1: {
			type: DOUBLE,
		},
		advance2: {
			type: DOUBLE,
		},
		advance3: {
			type: DOUBLE,
		},
		advance4: {
			type: DOUBLE,
		},
		final_score: {
			type: DOUBLE,
		},
	},
	{
		modelName: 'Score',
		timestamps: false,
		sequelize,
	}
)

class Event extends Model {}
Event.init(
	{
		title: {
			type: STRING,
			allowNull: false,
			validate: {
				is: ['^[^/+:+*+"+<+>+|]+$'],
			},
		},
		date: {
			type: DATE,
			allowNull: false,
		},
		repeat: {
			type: STRING,
			defaultValue: 'No repetir',
		},
		school: {
			type: BOOLEAN,
			defaultValue: false,
		},
		user: {
			type: INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
		subject: {
			type: INTEGER,
			references: {
				model: Subject,
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
	},
	{
		modelName: 'Event',
		timestamps: false,
		sequelize,
	}
)

export { User, Subject, Score, Event, sequelize }
