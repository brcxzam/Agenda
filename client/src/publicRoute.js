import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			localStorage.getItem('authToken') ? (
				<Redirect
					to={{
						pathname: '/app',
						state: { from: props.location },
					}}
				/>
			) : (
				<Component {...props} />
			)
		}
	/>
)
