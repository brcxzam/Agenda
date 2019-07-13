import events from './resolvers/events'
import login from './resolvers/login'
import subjects from './resolvers/subjects'
import users from './resolvers/users'
import scores from './resolvers/scores'
import contact from './resolvers/contact'

const root = Object.assign(login, users, subjects, events, scores, contact)

export default root
