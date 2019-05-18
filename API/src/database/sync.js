import {sequelize} from './model';

sequelize.sync({
	force: true
});
