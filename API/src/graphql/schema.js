import { buildSchema } from 'graphql';

const schema = buildSchema(`
	type Query {
		user: Users
		notifications: Notifications
		days: Days
		academicData: AcademicData
		percentage(partial: Int): Percentages
		subjects: [Subjects]
		subject(id: ID): Subjects
		partials(subject: ID): [Partials]
		personalization(id: ID): Personalizations
		colors: [Colors]
		icons: [Icons]
		events: [Events]
		event(id: ID): Events
	}

	type Mutation {
		login(email: String!, password: String!): String
		cUser(data: iUsers): String
		uUser(data: iUsers): String
		dUser: String
		uNotifications(data: iNotifications): String
		uDays(data: iDays): String
		cAcademicData(data: iAcademicData): AcademicData
		uAcademicData(data: iAcademicData): String
		cSubject(data: iSubjects): Subjects
		uSubject(id: ID, data: iSubjects): String
		dSubject(id: ID): String
		cPartial(data: iPartials): Partials
		uPartial(id: ID, data: iPartials): String
		cPersonalization(data: iPersonalizations): Personalizations
		uPersonalization(id: ID, data: iPersonalizations): String
		cEvent(data: iEvents): Events
		uEvent(id: ID, data: iEvents): String
		dEvent(id: ID): String
	}

	type Users {
		id: ID
		firstName: String
		lastName: String
		email: String
		password: String
		profile_image: String
	}
	type Notifications {
		morning: String
		afternoon: String
		night: String
	}
	type Days {
		monday: Boolean
		tuesday: Boolean
		wednesday: Boolean
		thursday: Boolean
		friday: Boolean
		saturday: String
		sunday: Boolean
	}
	type AcademicData {
		partials: Int
		maximum: Int
		aproving: Int
		final_score: Float
		percentages: [Percentages]
	}
	type Percentages {
		id: ID
		partial: Int
		percent: Int
		academic: ID
	}
	type Subjects {
		id: ID
		name: String
		user: ID
		schedules: [Schedules]
	}
	type Schedules {
		id: ID
		start: String
		finish: String
		day: String
		subject: ID
	}
	type Partials {
		id: ID
		obtained: Float
		percent: ID
		subject: ID
	}
	type Personalizations {
		id: ID
		icon: ID
		color: ID
		subject: ID
	}
	type Colors {
		id: ID
		color: String
	}
	type Icons {
		id: ID
		icon: String
	}
	type Events {
		id: ID
		title: String
		date: String
		time: String
		repeat: String
		priority: String
		school: String
		subject: Subjects
		personalization: Personalizations
	}
	
	input iUsers {
		firstName: String
		lastName: String
		email: String
		password: String
		profile_image: String
	}
	input iNotifications {
		morning: String
		afternoon: String
		night: String
	}
	input iDays {
		monday: Boolean
		tuesday: Boolean
		wednesday: Boolean
		thursday: Boolean
		friday: Boolean
		saturday: Boolean
		sunday: Boolean
	}
	input iAcademicData {
		partials: Int
		maximum: Int
		aproving: Int
		final_score: Float
		percentages: [iPercentages]
	}
	input iPercentages {
		id: ID
		partial: Int
		percent: Int
		academic: ID
	}
	input iSubjects {
		name: String
		schedules: [iSchedules]
	}
	input iSchedules {
		id: ID
		start: String
		finish: String
		day: String
	}
	input iPartials {
		id: ID
		obtained: Float
		percent: ID
		subject: ID
	}
	input iPersonalizations {
		id: ID
		icon: ID
		color: ID
		subject: ID
	}
	input iEvents {
		id: ID
		title: String
		date: String
		time: String
		repeat: String
		priority: String
		school: String
		subject: ID
		setPersonalization: iPersonalizations
	}
`);

export default schema;
