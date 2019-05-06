import {Icon, Color} from '../../database/model';

export default {
    colors: async () => {
        const colors = await Color.findAll();
        return colors;
    },
    icons: async () => {
        const icons = await Icon.findAll();
        return icons;
    }
}