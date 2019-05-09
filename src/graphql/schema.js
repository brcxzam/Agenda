import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query {
        user(id: ID): Users
        notifications(id: ID): Notifications
        days(id: ID): Days

        academicData(id: ID): AcademicData

        percentages(id: ID): [Percentages]
        subjects(id: ID): [Subjects]
        schedules(id: ID): [Schedules]
        partials(id: ID): [Partials]
        personalizations(id: ID): Personalizations
        colors: [Colors]
        icons: [Icons]
        events(id: ID): [Events]
    }

    type Mutation {
        cUser(data: iUsers): Users
        uUser(id: ID, data: iUsers): String
        dUser(id: ID): String
        uNotifications(id: ID, data: iNotifications): String
        uDays(id: ID, data: iDays): String
        
        cAcademicData(data: iAcademicData): AcademicData
        uAcademicData(id: ID, data: iAcademicData): String

        cSubjects(data: iSubjects): Subjects
        uSubjects(id: ID, data: iSubjects): String
        dSubjects(id: ID): String
        cSchedules(data: iSchedules): Schedules
        uSchedules(id: ID, data: iSchedules): String
        cPartials(data: iPartials): Partials
        uPartials(id: ID, data: iPartials): String
        cPersonalizations(data: iPersonalizations): Personalizations
        uPersonalizations(id: ID, data: iPersonalizations): String
        cEvents(data: iEvents): Events
        uEvents(id: ID, data: iEvents): String
        dEvents(id: ID): String
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
        monday: String
        tuesday: String
        wednesday: String
        thursday: String
        friday: String
        saturday: String
        sunday: String
    }
    type AcademicData {
        user: ID
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
        monday: String
        tuesday: String
        wednesday: String
        thursday: String
        friday: String
        saturday: String
        sunday: String
    }
    input iAcademicData {
        user: ID
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
        user: ID
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
