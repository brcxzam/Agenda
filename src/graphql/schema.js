import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query {
        hello: String
        user(id: ID): Users
        settings(id: ID): Settings
        notifications(id: ID): Notifications
        days(id: ID): Days
        academicData(id: ID): AcademicData
    }

    type Mutation {
        cUser(data: iUsers!): Users
        uUser(id: ID, data: iUsers): String
        dUser(id: ID): String
        uNotifications(id: ID, data: iNotifications): String
        uDays(id: ID, data: iDays): String
        cAcademicData(data: iAcademicData): AcademicData
        uAcademicData(id: ID, data: iAcademicData): String
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
        user: ID
        days: ID
        notification: ID
    }
    type Notifications {
        id: ID
        morning: String
        afternoon: String
        night: String
    }
    type Days {
        id: ID
        monday: String
        tuesday: String
        wednesday: String
        thursday: String
        friday: String
        saturday: String
        sunday: String
    }
    type AcademicData {
        id: ID
        partials: Int
        maximum: Int
        aproving: Int
        final_score: Float
        id_user: ID
    }
    type Percentages {
        id: ID
        partial: Int
        percent: Int
        id_academic: ID
    }
    type Subjects {
        id: ID
        name: String
        id_user: ID
    }
    type Schedules {
        id: ID
        start: String
        finish: String
        day: String
        id_subject: ID
    }
    type Partials {
        id: ID
        obtained: Float
        id_percent: ID
        id_subject: ID
    }
    type Personalizations {
        id: ID
        id_icon: ID
        id_color: ID
        id_subject: ID
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
        id_user: ID
        id_subject: ID
        id_personalization: ID
    }
    
    input iUsers {
        id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        profile_image: String
    }
    input iSettings {
        id_user: ID
        id_days: ID
        id_notification: ID
    }
    input iNotifications {
        id: ID
        morning: String
        afternoon: String
        night: String
    }
    input iDays {
        id: ID
        monday: String
        tuesday: String
        wednesday: String
        thursday: String
        friday: String
        saturday: String
        sunday: String
    }
    input iAcademicData {
        id: ID
        partials: Int
        maximum: Int
        aproving: Int
        final_score: Float
        id_user: ID
    }
    input iPercentages {
        id: ID
        partial: Int
        percent: Int
        id_academic: ID
    }
    input iSubjects {
        id: ID
        name: String
        id_user: ID
    }
    input iSchedules {
        id: ID
        start: String
        finish: String
        day: String
        id_subject: ID
    }
    input iPartials {
        id: ID
        obtained: Float
        id_percent: ID
        id_subject: ID
    }
    input iPersonalizations {
        id: ID
        id_icon: ID
        id_color: ID
        id_subject: ID
    }
    input iColors {
        id: ID
        color: String
    }
    input iIcons {
        id: ID
        icon: String
    }
    input iEvents {
        id: ID
        title: String
        date: String
        time: String
        repeat: String
        priority: String
        school: String
        id_user: ID
        id_subject: ID
        id_personalization: ID
    }
`);

export default schema;
