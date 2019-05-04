import { Setting } from '../../database/model';

export default {
    settings: async ({ id }) => {
        const settings = await Setting.findByPk(id);
        return settings;
    }
}