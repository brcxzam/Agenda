import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { PrivateRoute } from './privateRoute'
import Home from './components/Home'
import About from './components/About'
import Topics from './components/Topics'

function BasicExample() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/topics" component={Topics} />
				<Route component={NoMatch} />
			</Switch>
		</Router>
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

export default BasicExample
