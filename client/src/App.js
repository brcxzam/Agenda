import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'

class App extends Component {
	render() {
		return (
			<Router>
				<Home />
				<Switch>
					<Route path="/registrar" exact component={Register} />
					<Route path="/acceder" exact component={Login} />
				</Switch>
			</Router>
		)
	}
}

export default App
