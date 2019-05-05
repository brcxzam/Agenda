import { Model, STRING, INTEGER, DOUBLE, DATEONLY, BOOLEAN, TIME } from "sequelize";
import sequelize from "./connection";

class User extends Model { }//<---
User.init(
    {
        firstName: {
            type: STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$", 'i'],
                notEmpty: true
            }
        },
        lastName: {
            type: STRING,
            validate: {
                is: ["^[a-z]+$", 'i'],
                notEmpty: true
            }
        },
        email: {
            type: STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: STRING,
            allowNull: false
        },
        profile_image: {
            type: STRING,
            defaultValue: "default.png",
            validate: {
                is: ["^[^\/+\:+\*+\"+\<+\>+\|]+$"]
            }
        }
    },
    {
        indexes: [
            // Create a unique index on email
            {
                unique: true,
                fields: ['email']
            },
        ],
        modelName: 'User',
        sequelize
    }
);

class Notification extends Model { }//<---
Notification.init(
    {
        morning: {
            type: TIME,
            defaultValue: "08:00:00"
        },
        afternoon: {
            type: TIME,
            defaultValue: "14:00:00"
        },
        night: {
            type: TIME,
            defaultValue: "20:00:00"
        }
    },
    {
        sequelize,
        modelName: 'Notification',
        timestamps: false
    }
);

class Day extends Model { }//<---
Day.init(
    {
        monday: {
            type: BOOLEAN,
            defaultValue: true
        },
        tuesday: {
            type: BOOLEAN,
            defaultValue: true
        },
        wednesday: {
            type: BOOLEAN,
            defaultValue: true
        },
        thursday: {
            type: BOOLEAN,
            defaultValue: true
        },
        friday: {
            type: BOOLEAN,
            defaultValue: true
        },
        saturday: {
            type: BOOLEAN,
            defaultValue: false
        },
        sunday: {
            type: BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: 'Day',
        timestamps: false
    }
);

class Setting extends Model { }
Setting.init(
    {
        user: {
            type: INTEGER,
            primaryKey: true,
            references: {
                model: User,
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        days: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: Day,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        notification: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: Notification,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

        },
    },
    {
        sequelize,
        modelName: 'Setting',
        timestamps: false
    }
);


class Academic_data extends Model { }//<---
Academic_data.init(
    {
        partials: {
            type: INTEGER,
            allowNull: false
        },
        maximun: {
            type: INTEGER,
            allowNull: false
        },
        aproving: {
            type: INTEGER,
            allowNull: false
        },
        final_score: {
            type: DOUBLE
        },
        user: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        sequelize,
        modelName: 'Academic_data',
        timestamps: false
    }
);

class Percentage extends Model { }
Percentage.init(
    {
        partial: {
            type: INTEGER,
            allowNull: false
        },
        percent: {
            type: INTEGER,
            allowNull: false
        },
        academic: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: Academic_data,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        sequelize,
        modelName: 'Percentage',
        timestamps: false
    }
);

class Color extends Model { }//<---
Color.init(
    {
        color: {
            type: STRING,
            allowNull: false
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
            type: STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Icon'
    }
);

class Subject extends Model { }
Subject.init(
    {
        name: {
            type: STRING,
            allowNull: false,
            validate: {
                is: ["^[^\/+\:+\*+\"+\<+\>+\|]+$"]
            }
        },
        user: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        sequelize,
        modelName: 'Subject',
        timestamps: false
    }
);

class Personalization extends Model { }//<---
Personalization.init(
    {
        icon: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: Icon,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        color: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: Color,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        subject: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: Subject,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

        }
    },
    {
        sequelize,
        modelName: 'Personalization',
        timestamps: false
    }
);


class Partial extends Model { }
Partial.init(
    {
        obtained: {
            type: DOUBLE
        },
        percent: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: Percentage,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        subject: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: Subject,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        sequelize,
        modelName: 'Partial',
        timestamps: false
    }
);



class Schedule extends Model { }
Schedule.init(
    {
        start: {
            type: TIME,
            allowNull: false
        },
        finish: {
            type: TIME,
            allowNull: false
        },
        day: {
            type: STRING
        },
        subject: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: Subject,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

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
            type: STRING,
            allowNull: false,
            validate: {
                is: ["^[^\/+\:+\*+\"+\<+\>+\|]+$"]
            }
        },
        date: {
            type: DATEONLY,
            allowNull: false
        },
        time: {
            type: TIME,
            allowNull: false
        },
        repeat: {
            type: STRING,
            defaultValue: "No repetir"
        },
        priority: {
            type: STRING,
            defaultValue: "Ninguna"
        },
        school: {
            type: BOOLEAN,
            defaultValue: false
        },
        user: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

        },
        personalization: {
            type: INTEGER,

            references: {
                model: Personalization,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

        },
        subject: {
            type: INTEGER,

            references: {
                model: Subject,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

        }
    },
    {
        sequelize,
        modelName: 'Event',
        timestamps: false
    }
);


export { Notification, Day, Setting, User, Academic_data, Percentage, Partial, Color, Icon, Subject, Personalization, Schedule, Event, sequelize };
