import React, { Component } from 'react'
import '../css/login.css'

class Login extends Component {
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
			<div className="wrapper fadeInDown">
				<div id="formContent">
					{/* <!-- Tabs Titles --> */}
					<h2 className="active"> Sign In </h2>
					<h2 className="inactive underlineHover">Sign Up </h2>

					{/* <!-- Icon --> */}
					<div className="fadeIn first">
						<img
							src="http://localhost:3001/profile_images/default.png"
							id="icon"
							alt="User Icon"
						/>
					</div>

					{/* <!-- Login Form --> */}
					<form>
						<input
							type="text"
							id="login"
							className="fadeIn second"
							name="login"
							placeholder="login"
						/>
						<input
							type="text"
							id="password"
							className="fadeIn third"
							name="login"
							placeholder="password"
						/>
						<input
							type="submit"
							className="fadeIn fourth"
							value="Log In"
						/>
					</form>

					{/* <!-- Remind Passowrd --> */}
					<div id="formFooter">
						<a className="underlineHover" href="/">
							Forgot Password?
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Login
