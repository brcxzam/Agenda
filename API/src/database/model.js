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

class Academic_data extends Model {}
Academic_data.init(
	{
		user: {
			type: INTEGER,
			primaryKey: true,
			references: {
				model: User,
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
		partials: {
			type: INTEGER.UNSIGNED,
			allowNull: false,
			defaultValue: 4,
		},
		maximum: {
			type: INTEGER.UNSIGNED,
			allowNull: false,
			defaultValue: 100,
		},
		aproving: {
			type: INTEGER.UNSIGNED,
			allowNull: false,
			defaultValue: 70,
		},
		final_score: {
			type: DOUBLE.UNSIGNED,
		},
	},
	{
		modelName: 'Academic_data',
		timestamps: false,
		sequelize,
	}
)

class Percentage extends Model {}
Percentage.init(
	{
		partial: {
			type: INTEGER.UNSIGNED,
			allowNull: false,
		},
		percent: {
			type: INTEGER.UNSIGNED,
			allowNull: false,
		},
		academic: {
			type: INTEGER,
			allowNull: false,
			references: {
				model: Academic_data,
				key: 'user',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
	},
	{
		modelName: 'Percentage',
		timestamps: false,
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

class Partial extends Model {}
Partial.init(
	{
		obtained: {
			type: DOUBLE.UNSIGNED,
		},
		percent: {
			type: INTEGER,
			allowNull: false,
			references: {
				model: Percentage,
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
		subject: {
			type: INTEGER,
			allowNull: false,
			references: {
				model: Subject,
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
	},
	{
		modelName: 'Partial',
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

export { User, Academic_data, Percentage, Partial, Subject, Event, sequelize }
