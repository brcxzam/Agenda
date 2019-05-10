import { Subject, Schedule } from '../../database/model';

export default {
    cSubject: async ({ data }) => {
        const { schedules } = data;
        const subject = await Subject.create(data);
        subject.schedules = [];
        for await (let data of schedules) {
            data.subject = subject.id;
            const schedule = await Schedule.create(data);
            subject.schedules.push(schedule);
        }
        return subject;
    },
    subjects: async ({ id }) => {
        const subjects = await Subject.findAll({
            where: {
                user: id
            }
        });
        let cont = 0;
        for await (let subject of subjects) {
            const schedules = await Schedule.findAll({
                where: {
                    subject: subject.id
                }
            })
            subjects[cont++].schedules = schedules;
        }
        return subjects;
    },
    uSubject: async ({ id, data }) => {
        const { schedules } = data;
        const getSchedules = await Schedule.findAll({
            where: {
                subject: id
            }
        })
        for await (let data of schedules) {
            let exist = false;
            for (let schls of getSchedules) {
                if (data.id == schls.id) {
                    exist = true;
                }
            }
            if (!exist) {
                throw new Error("non-existent schedule");
            }
            await Schedule.update(data, {
                where: {
                    id: data.id,
                    subject: id
                }
            })
        }
        await Subject.update(data, {
            where: {
                id
            }
        });
        return 'Done';
    },
    dSubject: async ({ id }) => {
        await Subject.destroy({
            where: {
                id
            }
        });
        return 'Done';
    }
}