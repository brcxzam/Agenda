import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	root1: {
		width: '100%',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	bigAvatar: {
		width: 160,
		height: 160,
	},
	button: {
		margin: 15,
	},
}))

function TabContainer({ children, dir }) {
	return (
		<Typography component="div" dir={dir}>
			{children}
		</Typography>
	)
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired,
}

function About() {
	const classes = useStyles()
	const theme = useTheme()
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(0)
	const [API] = React.useState('http://localhost:3001/api')
	const [{ errorLogIn, messageErrorLogIn }, setErrorLogIn] = useState({
		errorLogIn: false,
		messageErrorLogIn: '',
	})
	const [
		{ errorFirstName, messageErrorFirstName },
		setErrorFirstName,
	] = useState({
		errorFirstName: false,
		messageErrorFirstName: '',
	})
	const [
		{ errorLastName, messageErrorLastName },
		setErrorLastName,
	] = useState({
		errorLastName: false,
		messageErrorLastName: '',
	})
	const [{ errorEmail, messageErrorEmail }, setErrorEmail] = useState({
		errorEmail: false,
		messageErrorEmail: '',
	})
	const [
		{ errorPassword, messageErrorPassword },
		setErrorPassword,
	] = useState({
		errorPassword: false,
		messageErrorPassword: '',
	})

	function handleChange(event, newValue) {
		setValue(newValue)
	}

	function handleChangeIndex(index) {
		setValue(index)
	}

	function handleClickOpen() {
		setOpen(true)
	}

	function handleClose() {
		setOpen(false)
	}

	function handleErrorLogIn() {
		setErrorLogIn({ errorLogIn: false, messageErrorLogIn: '' })
	}

	function handleErrorFirstName() {
		setErrorFirstName({ errorFirstName: false, messageErrorFirstName: '' })
	}

	function handleErrorLastName() {
		setErrorLastName({ errorLastName: false, messageErrorLastName: '' })
	}

	function handleErrorEmail() {
		setErrorEmail({ errorEmail: false, messageErrorEmail: '' })
	}

	function handleErrorPassword() {
		setErrorPassword({ errorPassword: false, messageErrorPassword: '' })
	}

	async function handleLogIn(event) {
		event.preventDefault()
		const formData = new FormData(event.target)
		const data = Object.fromEntries(formData)
		const query = JSON.stringify({
			query: 'mutation($data: iLogin){ login(data: $data) }',
			variables: {
				data,
			},
		})
		try {
			const res = await fetch(API, {
				method: 'POST',
				body: query,
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const response = await res.json()
			const { data, errors } = response
			if (errors) {
				console.log(errors[0].message)
			} else {
				if (data.login !== 'false') {
					// localStorage.setItem('authToken', data.login)
					console.log(data.login)
				} else {
					setErrorLogIn({
						errorLogIn: true,
						messageErrorLogIn: 'Incorrecto',
					})
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	async function handleSignUp(event) {
		event.preventDefault()
		const formData = new FormData(event.target)
		const data = Object.fromEntries(formData)
		if (!data.lastName) {
			delete data.lastName
		}
		const query = JSON.stringify({
			query: 'mutation($data: iUsers){ cUser(data: $data) }',
			variables: {
				data,
			},
		})
		try {
			const res = await fetch(API, {
				method: 'POST',
				body: query,
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const response = await res.json()
			const { data, errors } = response
			if (errors) {
				const { message } = errors[0]
				switch (message) {
					case 'Validation error: Validation is on firstName failed':
						setErrorFirstName({
							errorFirstName: true,
							messageErrorFirstName: 'Nombre invalido',
						})
						break
					case 'Validation error: Validation is on lastName failed':
						setErrorLastName({
							errorLastName: true,
							messageErrorLastName: 'Apellidos invalidos',
						})
						break
					case 'Validation error':
						setErrorEmail({
							errorEmail: true,
							messageErrorEmail: 'Correo ya registrado',
						})
						break
					case 'invalid password size':
						setErrorPassword({
							errorPassword: true,
							messageErrorPassword:
								'La contraseña debe ser mayor a 8 caracteres',
						})
						break
					case 'Validation error: Validation isEmail on email failed':
						setErrorEmail({
							errorEmail: true,
							messageErrorEmail: 'Correo invalido',
						})
						break

					default:
						console.log(errors[0].message)
						break
				}
			} else {
				console.log(data.cUser)
				// setProfile_Image({ profile_image: 'default.png', save: true })
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Container maxWidth="xl">
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="Icon">
							<Avatar
								alt="Icon"
								src="http://localhost:3001/profile_images/default.png"
								className={classes.avatar}
							/>
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Owl TIME
						</Typography>
						<Button
							variant="outlined"
							color="inherit"
							onClick={handleClickOpen}>
							INICIAR SESIÓN
						</Button>
					</Toolbar>
				</AppBar>
			</div>
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
					maxWidth="xs"
					fullWidth>
					<div className={classes.root1}>
						<DialogTitle id="form-dialog-title">
							<Tabs
								value={value}
								onChange={handleChange}
								indicatorColor="primary"
								textColor="primary"
								variant="fullWidth">
								<Tab label="Iniciar Sesión" />
								<Tab label="Registrarse" />
							</Tabs>
						</DialogTitle>
						<DialogContent>
							<SwipeableViews
								axis={
									theme.direction === 'rtl'
										? 'x-reverse'
										: 'x'
								}
								index={value}
								onChangeIndex={handleChangeIndex}>
								<TabContainer dir={theme.direction}>
									<Grid
										container
										justify="center"
										alignItems="center">
										<Avatar
											alt="Icon"
											src="http://localhost:3001/profile_images/default.png"
											className={classes.bigAvatar}
										/>
									</Grid>
									<form
										onSubmit={handleLogIn}
										className={classes.root3}>
										<TextField
											required
											id="emailLogIn"
											label="Correo Electrónico"
											className={classes.textField}
											type="email"
											name="email"
											autoComplete="email"
											margin="normal"
											variant="outlined"
											fullWidth
											error={errorLogIn}
											onChange={handleErrorLogIn}
											helperText={messageErrorLogIn}
										/>
										<TextField
											required
											id="passwordLogIn"
											label="Contraseña"
											className={classes.textField}
											type="password"
											name="password"
											margin="normal"
											variant="outlined"
											fullWidth
											error={errorLogIn}
											onChange={handleErrorLogIn}
											helperText={messageErrorLogIn}
										/>
										<Grid
											container
											direction="row"
											justify="flex-end"
											alignItems="center">
											<Button
												type="submit"
												variant="contained"
												color="primary"
												className={classes.button}>
												INICIAR SESIÓN
											</Button>
										</Grid>
									</form>
								</TabContainer>
								<TabContainer dir={theme.direction}>
									<form onSubmit={handleSignUp}>
										<TextField
											required
											id="firstName"
											label="Nombre"
											className={classes.textField}
											type="text"
											name="firstName"
											margin="normal"
											variant="outlined"
											fullWidth
											error={errorFirstName}
											onChange={handleErrorFirstName}
											helperText={messageErrorFirstName}
										/>
										<TextField
											id="lastName"
											label="Apellidos"
											className={classes.textField}
											type="text"
											name="lastName"
											margin="normal"
											variant="outlined"
											fullWidth
											error={errorLastName}
											onChange={handleErrorLastName}
											helperText={messageErrorLastName}
										/>
										<TextField
											required
											id="email"
											label="Correo Electrónico"
											className={classes.textField}
											type="email"
											name="email"
											margin="normal"
											variant="outlined"
											fullWidth
											error={errorEmail}
											onChange={handleErrorEmail}
											helperText={messageErrorEmail}
										/>
										<TextField
											required
											id="password"
											label="Contraseña"
											className={classes.textField}
											type="password"
											name="password"
											margin="normal"
											variant="outlined"
											fullWidth
											error={errorPassword}
											onChange={handleErrorPassword}
											helperText={messageErrorPassword}
										/>
										<Grid
											container
											direction="row"
											justify="flex-end"
											alignItems="center">
											<Button
												type="submit"
												variant="contained"
												color="primary"
												className={classes.button}>
												Registrarse
											</Button>
										</Grid>
									</form>
								</TabContainer>
							</SwipeableViews>
						</DialogContent>
					</div>
				</Dialog>
			</div>
		</Container>
	)
}

export default About
