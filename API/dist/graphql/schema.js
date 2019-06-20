"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphql = require("graphql");

const schema = (0, _graphql.buildSchema)(`
	type Query {
		user: Users
		subjects: [Subjects]
		subject(id: ID): Subjects
		scores: [Scores]
		scoresSubject(id: ID): Scores
		events: [Events]
		event(id: ID): Events
	}

	type Mutation {
		login(data: iLogin): String
		cUser(data: iUsers): String
		uUser(data: iUsers): String
		dUser: String
		cSubject(data: iSubjects): Subjects
		uSubject(id: ID, data: iSubjects): String
		dSubject(id: ID): String
		uScore(id: ID, data: iScores): String
		cEvent(data: iEvents): Events
		uEvent(id: ID, data: iEvents): String
		dEvent(id: ID): String
	}

	type Users {
		id: ID
		firstName: String
		lastName: String
		email: String
		profile_image: String
	}
	type Subjects {
		id: ID
		name: String
		user: ID
		final_score: Float
	}
	type Scores {
		subject: ID
		advance1: Float
		advance2: Float
		advance3: Float
		advance4: Float
		final_score: Float
	}
	scalar DateTime
	type Events {
		id: ID
		title: String
		date: DateTime
		repeat: String
		school: String
		subject: Subjects
	}
	
	input iLogin {
		email: String!
		password: String!
	}
	input iUsers {
		firstName: String
		lastName: String
		email: String
		password: String
		profile_image: String
	}
	input iSubjects {
		name: String
	}
	input iScores {
		advance1: Float
		advance2: Float
		advance3: Float
		advance4: Float
	}
	input iEvents {
		id: ID
		title: String
		date: String
		repeat: String
		school: Boolean
		subject: ID
	}
`);
var _default = schema;
exports.default = _default;