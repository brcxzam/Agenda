import { ThemeProvider } from '@material-ui/styles'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import { PrivateRoute } from './privateRoute'
import { PublicRoute } from './publicRoute'
import theme from './theme/theme'

dayjs.locale('es')

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<PublicRoute exact path="/" component={About} />
					<PrivateRoute path="/app" component={Home} />
					<PublicRoute component={NoMatch} />
				</Switch>
			</Router>
		</ThemeProvider>
	)
}

function NoMatch({ location }) {
	return (
		<div>
			<h3>
				No match for <code>{location.pathname}</code>
			</h3>
		</div>
	)
}

export default App
