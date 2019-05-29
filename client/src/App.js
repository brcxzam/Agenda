import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import { PrivateRoute } from './privateRoute'
import Agenda from './components/agenda'

class App extends Component {
	NoMatch() {
		return <Redirect to="/" />
	}

	render() {
		return (
			<Router>
				<Switch>
					<PrivateRoute path="/" exact component={Agenda} />
					<Route component={this.NoMatch} />
				</Switch>
			</Router>
		)
	}
}

export default App
