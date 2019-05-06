import academicData from './resolvers/academicData';
import colors_icons from './resolvers/colors-icons';
import days from './resolvers/days';
import events from './resolvers/events';
import notifications from './resolvers/notifications';
import partials from './resolvers/partials';
import percentages from './resolvers/percentages';
import personalizations from './resolvers/personalizations';
import schedules from './resolvers/schedules';
import settings from './resolvers/settings';
import subjects from './resolvers/subjects';
import users from './resolvers/users';

const root = Object.assign(users, settings, notifications, days, academicData, percentages, subjects, schedules, partials, personalizations, colors_icons, events);

export default root;
