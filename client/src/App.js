import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import './sass/materialize.scss'
import Home from './components/home'
import Register from './components/register'
import Login from './components/login'

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
