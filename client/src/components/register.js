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
				this.setState({
					profile_image: response.profile_image,
					isSaved: false,
				})
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
			.then(response => {
				const { data, errors } = response
				if (errors) {
					if (errors[0].message === 'Validation error') {
						window.M.toast({
							html: 'Correo ya registrado',
							classes: 'rounded',
						})
					} else {
						window.M.toast({
							html: errors[0].message,
							classes: 'rounded',
						})
					}
				} else {
					/**
					 * TODO: aqui te debe de enviar dentro de la aplicación
					 */
					this.setState({ isSaved: true })
					console.log(data.cUser)
				}
			})
	}

	render() {
		return (
			<div className="container row">
				<form
					className="col s12 container"
					onSubmit={this.handleSubmit}
					id="formulario">
					<div className="row">
						<div className="col s5" />
						<div className="input-field col s2">
							<div className="file-field input-field">
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
							<div className="center-align">
								<span>Imagen de Perfil</span>
							</div>
						</div>
						<div className="col s5" />
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
							<label htmlFor="firstName">Nombre</label>
						</div>
						<div className="input-field col s6">
							<input
								id="lastName"
								name="lastName"
								type="text"
								className="validate"
							/>
							<label htmlFor="lastName">Apellido/s</label>
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
							<label htmlFor="email">Correo Electrónico</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								id="password"
								name="password"
								type="password"
								className="validate"
								minLength="8"
								required
							/>
							<label htmlFor="password">Contraseña</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<button
								className="btn waves-effect waves-light right"
								type="submit"
								name="action">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default Register
