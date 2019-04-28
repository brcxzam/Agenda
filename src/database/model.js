const {
    Model,
    STRING,
    INTEGER,
    FLOAT,
    DOUBLE,
    DECIMAL,
    DATEONLY,
    BOOLEAN,
    DATE
} = require("sequelize");
const sequelize = require("./connection");

class User extends Model { }//<---
User.init(
    {
        firstName: {
            type: STRING,
            allowNull: false
        },
        lastName: {
            type: STRING
        },
        email: {
            type: STRING
        },
        password: {
            type: STRING
        },
        profile_image: {
            type: STRING
        }
    },
    {
        sequelize,
        modelName: 'User'
    }
);

class Notification extends Model { }//<---
Notification.init(
    {
        morning: {
            type: DATE
        },
        afternoon: {
            type: DATE
        },
        night: {
            type: DATE
        }
    },
    {
        sequelize,
        modelName: 'Notification'
    }
);


class Setting extends Model { }
Setting.init(
    {
        days: {
            type: STRING
        },
        notification: {
            type: INTEGER,

            references: {
                model: Notification,
                key: 'id'
            }

        },
        user: {
            type: INTEGER,

            references: {
                model: User,
                key: 'id'
            }

        }
    },  
    {
        sequelize,
        modelName: 'Setting'
    }
);


class Academic_data extends Model { }//<---
Academic_data.init(
    {
        maximun: {
            type: INTEGER
        },
        aproving: {
            type: INTEGER
        },
        final_score: {
            type: DOUBLE
        }
    },
    {
        sequelize,
        modelName: 'Academic_data'
    }
);

class Partial extends Model { }
Partial.init(
    {
        number: {
            type: INTEGER
        },
        percent: {
            type: INTEGER
        },
        obtained: {
            type: DOUBLE
        },
        academic: {
            type: INTEGER,

            references: {
                model: Academic_data,
                key: 'id'
            }

        }
    },
    {
        sequelize,
        modelName: 'Partial'
    }
);

class Color extends Model { }//<---
Color.init(
    {
        color: {
            type: STRING
        }
    },
    {
        sequelize,
        modelName: 'Color'
    }
);

class Icon extends Model { }//<---
Icon.init(
    {
        icon: {
            type: STRING
        }
    },
    {
        sequelize,
        modelName: 'Icon'
    }
);

class Personalization extends Model { }//<---
Personalization.init(
    {
        icon: {
            type: INTEGER,

            references: {
                model: Icon,
                key: 'id'
            }

        }, 
        color: {
            type: INTEGER,

            references: {
                model: Color,
                key: 'id'
            }

        }
    },
    {
        sequelize,
        modelName: 'Personalization'
    }
);

class Subject extends Model { }
Subject.init(
    {
        name: {
            type: STRING
        },
        personalization: {
            type: INTEGER,

            references: {
                model: Personalization,
                key: 'id'
            }

        }
    },
    {
        sequelize,
        modelName: 'Subject'
    }
);


class Schedule extends Model { }
Schedule.init(
    {
        start: {
            type: DATE
        },
        finish: {
            type: DATE
        },
        day: {
            type: STRING
        },
        subject: {
            type: INTEGER,

            references: {
                model: Subject,
                key: 'id'
            }

        }
    },
    {
        sequelize,
        modelName: 'Schedule'
    }
);

class Event extends Model { }
Event.init(
    {
        title: {
            type: STRING
        },
        date: {
            type: DATEONLY
        },
        time: {
            type: DATE
        },
        repeat: {
            type: STRING
        },
        priority: {
            type: STRING
        },
        school: {
            type: BOOLEAN
        },
        user: {
            type: INTEGER,

            references: {
                model: User,
                key: 'id'
            }

        },
        personalization: {
            type: INTEGER,

            references: {
                model: Personalization,
                key: 'id'
            }

        },
        subject: {
            type: INTEGER,

            references: {
                model: Subject,
                key: 'id'
            }

        }
    },
    {
        sequelize,
        modelName: 'Event'
    }
);

class Partial_subject extends Model { }
Partial_subject.init(
    {
        partial: {
            type: INTEGER,

            references: {
                model: Partial,
                key: 'id'
            }

        }, 
        subject: {
            type: INTEGER,

            references: {
                model: Subject,
                key: 'id'
            }

        }
    },
    {
        sequelize,
        modelName: 'Partial_subject'
    }
);



module.exports = { Notification, Setting, User , Academic_data, Partial, Color, Icon, Personalization, Subject, Schedule, Event, Partial_subject , sequelize};