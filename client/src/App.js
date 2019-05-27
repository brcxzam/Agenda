import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'
import Home from './components/home'
import Inside from './components/inside'
import { PrivateRoute } from './components/privateRoute'
const NoMatch = () => {
	return <Redirect to="/" />
}

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact component={Home} />
					<PrivateRoute path="/lol" component={Inside} />
					<Route component={NoMatch} />
				</Switch>
			</Router>
		)
	}
}

export default App
