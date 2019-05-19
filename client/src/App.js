import React, { Component } from 'react'
import './App.css'
import './materialize.min.css'
import Home from './components/home'
import Register from './components/register'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
	render() {
		return (
			<Router>
				<Home />
				<Switch>
					<Route path="/registrar" exact component={Register} />
				</Switch>
			</Router>
		)
	}
}

export default App
