import academicData from './resolvers/academicData';
import colors_icons from './resolvers/colors-icons';
import days from './resolvers/days';
import events from './resolvers/events';
import login from './resolvers/login';
import notifications from './resolvers/notifications';
import partials from './resolvers/partials';
import personalizations from './resolvers/personalizations';
import subjects from './resolvers/subjects';
import users from './resolvers/users';

const root = Object.assign(login, users, notifications, days, academicData, subjects, partials, personalizations, colors_icons, events);

export default root;
