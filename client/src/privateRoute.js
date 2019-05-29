import React from 'react'
import { Route } from 'react-router-dom'
import Home from './components/home'

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			localStorage.getItem('authToken') ? (
				<Component {...props} />
			) : (
				<Home />
			)
		}
	/>
)
