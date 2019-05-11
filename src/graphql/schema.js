import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query {
        user(id: ID): Users
        notifications(id: ID): Notifications
        days(id: ID): Days
        academicData(id: ID): AcademicData
        percentage(partial: Int, academic: ID): Percentages
        subjects(id: ID): [Subjects]
        partials(subject: ID): [Partials]
        personalization(id: ID): Personalizations
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
        monday: String
        tuesday: String
        wednesday: String
        thursday: String
        friday: String
        saturday: String
        sunday: String
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
        user: ID
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
        academic: ID
    }
    input iSubjects {
        name: String
        user: ID
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
        user: ID
        subject: ID
        setPersonalization: iPersonalizations
    }
`);

export default schema;
