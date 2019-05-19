import React, { Component } from 'react'

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			profile_image: 'default.png',
			isSaved: false,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

		window.addEventListener('beforeunload', event => {
			if (
				this.state.profile_image !== 'default.png' &&
				this.state.isSaved === false
			) {
				fetch('/api/upload/delete', {
					method: 'POST',
					body: JSON.stringify({
						deleteImage: this.state.profile_image,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}
		})
	}

	handleChange(event) {
		let formData = new FormData()
		if (
			this.state.profile_image !== 'default.png' &&
			this.state.isSaved === false
		) {
			formData.append('deleteImage', this.state.profile_image)
		}
		formData.append('profile_image', event.target.files[0])
		fetch('http://localhost:3001/api/upload', {
			method: 'POST',
			body: formData,
		})
			.then(response => response.json())
			.catch(error => console.error('Error:', error))
			.then(response =>
				this.setState({ profile_image: response.profile_image })
			)
	}

	handleSubmit(event) {
		event.preventDefault()
		const form = document.getElementById('formulario')
		const formData = new FormData(form)
		if (
			this.state.profile_image !== 'default.png' &&
			this.state.isSaved === false
		) {
			formData.append('profile_image', this.state.profile_image)
		}
		let data = Object.fromEntries(formData)
		if (!data.lastName) {
			delete data.lastName
		}
		const query = {
			query: 'mutation($data: iUsers){ cUser(data: $data) }',
			variables: {
				data,
			},
		}
		fetch('http://localhost:3001/api', {
			method: 'POST',
			body: JSON.stringify(query),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => console.log('Success:', response))
	}

	render() {
		return (
			<div className="container row">
				<form
					className="col s12 container"
					onSubmit={this.handleSubmit}
					id="formulario">
					<div className="row">
						<div className="col s4" />
						<div className="input-field col s4">
							<div className="file-field input-field imagen-input">
								<div className="">
									<input
										type="file"
										onChange={this.handleChange}
										accept="image/png, image/jpg"
									/>
									<img
										className="imagen circle"
										src={
											'http://localhost:3001/profile_images/' +
											this.state.profile_image
										}
										alt=""
									/>
								</div>
								<div className="file-path-wrapper">
									<input
										className="file-path validate"
										type="text"
									/>
								</div>
							</div>
						</div>
						<div className="col s4" />
					</div>
					<div className="row">
						<div className="input-field col s6">
							<input
								id="firstName"
								name="firstName"
								type="text"
								className="validate "
								required
							/>
							<label htmlFor="firstName">First Name</label>
						</div>
						<div className="input-field col s6">
							<input
								id="lastName"
								name="lastName"
								type="text"
								className="validate"
							/>
							<label htmlFor="lastName">Last Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								id="email"
								name="email"
								type="email"
								className="validate"
								required
							/>
							<label htmlFor="email">Email</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								id="password"
								name="password"
								type="password"
								className="validate"
								required
							/>
							<label htmlFor="password">Password</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<button
								className="btn waves-effect waves-light right"
								type="submit"
								name="action">
								Submit
								<i className="material-icons right">send</i>
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default Register
