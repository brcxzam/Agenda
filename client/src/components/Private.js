import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class extends Component {
	constructor(props) {
		super(props)
		this.state = { status: 'Public False', redirect: false }

		this.token = this.token.bind(this)
	}
	token() {
		localStorage.removeItem('authToken')
		this.setState({ status: 'Public True', redirect: true })
	}
	render() {
		return (
			<div>
				{this.state.redirect === true && <Redirect to="/" />}
				<h1>private</h1>
				<button onClick={this.token}>remove token</button>
			</div>
		)
	}
}
