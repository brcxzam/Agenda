import settings from './resolvers/settings';
import users from './resolvers/users';
import notifications from './resolvers/notifications';
import days from './resolvers/days';

const root = Object.assign(users, settings, notifications, days);

export default root;
