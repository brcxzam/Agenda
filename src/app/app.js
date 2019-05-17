import "@babel/polyfill";
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { profile_image: 'default.png' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<div className="row">
				<form className="col s12 container">
					<div className="row">
						<div className="input-field col s12">
							<div className="file-field input-field">
									<input type="file"/>
								<div className="file-path-wrapper center">
									<img width="250" src={'img/profile_images/'+this.state.profile_image}/>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6">
							<input placeholder="Placeholder" id="first_name" type="text" className="validate"/>
							<label htmlFor="first_name">First Name</label>
						</div>
						<div className="input-field col s6">
							<input id="last_name" type="text" className="validate"/>
							<label htmlFor="last_name">Last Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="email" type="email" className="validate"/>
							<label htmlFor="email">Email</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="password" type="password" className="validate"/>
							<label htmlFor="password">Password</label>
						</div>
					</div>
					<button className="btn waves-effect waves-light" type="submit" name="action">Submit
						<i className="material-icons right">send</i>
					</button>
				</form>
			</div>
		);
	}
}

render(<App />, document.getElementById('app'));
