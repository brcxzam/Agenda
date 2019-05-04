var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        hello: String
        users: [Users]
        user(id: ID): [Users]
    }

    type Mutation {
        createUser(data: iUsers!): Users
        updateUser(id: ID, data: iUsers): String
        deleteUser(id: ID): String
    }

    type Users {
        id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        profile_image: String
    }
    type Settings {
        id: ID
        days: String
        id_user: ID
        id_notification: ID
    }
    type Notifications {
        id: ID
        morning: String
        afternoon: String
        nigth: String
    }
    type Events {
        id: ID
        title: String
        date: String
        time: String
        repeat: String
        priority: String
        school: String
        id_user: ID
        id_personalization: ID
        id_subject: ID
    }
    type Personalizations {
        id: ID
        id_icon: ID
        id_color: ID
    }
    type Colors {
        id: ID
        color: String
    }
    type Icons {
        id: ID
        icon: String
    }
    type Subjects {
        id: ID
        name: String
        id_personalization: ID
    }
    type Schedules {
        id: ID
        start: String
        finish: String
        day: String
        id_subject: ID
    }
    type PartialSubject {
        id: ID
        id_partial: ID
        id_subject: ID
    }
    type Partials {
        id: ID
        number: Int
        percent: Int
        obtained: Float
        id_academic: String
    }
    type AcademicData {
        id: ID
        maximum: Int
        aproving: Int
        final_score: Float
    }
    
    input iUsers {
        firstName: String
        lastName: String
        email: String
        password: String
        profile_image: String
        id_setting: Int
    }
    input iSettings {
        days: String
        id_notification: Int
    }
    input iNotifications {
        morning: String
        afternoon: String
        nigth: String
    }
    input iEvents {
        title: String
        date: String
        time: String
        repeat: String
        priority: String
        school: String
        id_user: ID
        id_personalization: ID
        id_subject: ID
    }
    input iPersonalizations {
        id_icon: ID
        id_color: ID
    }
    input iColors {
        color: String
    }
    input iIcons {
        icon: String
    }
    input iSubjects {
        name: String
        id_personalization: ID
    }
    input iSchedules {
        start: String
        finish: String
        day: String
        id_subject: ID
    }
    input iPartialSubject {
        id_partial: ID
        id_subject: ID
    }
    input iPartials {
        number: Int
        percent: Int
        obtained: Float
        id_academic: String
    }
    input iAcademicData {
        maximum: Int
        aproving: Int
        final_score: Float
    }
`);

export default schema;
