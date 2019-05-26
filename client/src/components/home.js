import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	button: {
		marginTop: 10,
		marginBottom: 5,
	},
	image: {
		position: 'relative',
		height: 200,
		[theme.breakpoints.down('xs')]: {
			width: '100% !important', // Overrides inline-style
			height: 100,
		},
		'&:hover, &$focusVisible': {
			zIndex: 1,
			'& $imageBackdrop': {
				opacity: 0.15,
			},
			'& $imageMarked': {
				opacity: 0,
			},
			'& $imageTitle': {
				border: '4px solid currentColor',
			},
		},
	},
	focusVisible: {},
	imageButton: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.common.white,
	},
	imageSrc: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: 'cover',
		backgroundPosition: 'center 40%',
	},
	imageBackdrop: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: theme.palette.common.black,
		opacity: 0.4,
		transition: theme.transitions.create('opacity'),
	},
	imageTitle: {
		position: 'relative',
		padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(
			1
		) + 6}px`,
	},
	imageMarked: {
		height: 3,
		width: 18,
		backgroundColor: theme.palette.common.white,
		position: 'absolute',
		bottom: -2,
		left: 'calc(50% - 9px)',
		transition: theme.transitions.create('opacity'),
	},
}))

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	)
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
}

function ButtonAppBar() {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState(0)
	const [profile_image, setProfile_image] = React.useState('default.png')
	const [save, setSave] = React.useState(false)
	React.useEffect(elimina)

	function elimina() {
		window.addEventListener('beforeunload', e => {
			e.preventDefault()
			if (profile_image !== 'default.png' && save === false) {
				fetch('http://localhost:3001/api/upload/delete', {
					method: 'POST',
					body: JSON.stringify({
						deleteImage: profile_image,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}
		})
	}

	function handleClickOpen() {
		setOpen(true)
	}

	function handleClose() {
		setOpen(false)
	}

	function handleChange(event, newValue) {
		setValue(newValue)
	}

	function handleSubmitLogin(event) {
		event.preventDefault()
		const form = document.getElementById('login')
		const formData = new FormData(form)
		const data = Object.fromEntries(formData)
		const query = {
			query: 'mutation($data: iLogin){ login(data: $data) }',
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
						console.log('correo registrado')
					} else {
						console.log(errors[0].message)
					}
				} else {
					/**
					 * TODO: aqui te debe de enviar dentro de la aplicación
					 */
					console.log(data.login)
				}
			})
	}

	function handleSubmitSignup(event) {
		event.preventDefault()
		const form = document.getElementById('signup')
		const formData = new FormData(form)
		if (profile_image !== 'default.png' && save === false) {
			formData.append('profile_image', profile_image)
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
						console.log('correo registrado')
					} else {
						console.log(errors[0].message)
					}
				} else {
					/**
					 * TODO: aqui te debe de enviar dentro de la aplicación
					 */
					setSave(true)
					console.log(data.cUser)
				}
			})
	}

	function uploadImage(event) {
		let formData = new FormData()
		if (profile_image !== 'default.png' && save === false) {
			formData.append('deleteImage', profile_image)
			console.log('looks good')
		}
		formData.append('profile_image', event.target.files[0])
		fetch('http://localhost:3001/api/upload', {
			method: 'POST',
			body: formData,
		})
			.then(response => response.json())
			.catch(error => console.error('Error:', error))
			.then(response => {
				setProfile_image(response.profile_image)
				setSave(false)
			})
	}

	const classes = useStyles()
	return (
		<div>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" className={classes.title}>
							Agenda
						</Typography>
						<Button color="inherit" onClick={handleClickOpen}>
							ACCEDER
						</Button>
					</Toolbar>
				</AppBar>
			</div>
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
					fullWidth
					maxWidth="sm">
					<DialogContent>
						<div className={classes.root}>
							<Tabs
								value={value}
								onChange={handleChange}
								centered>
								<Tab label="ACCEDER" />
								<Tab label="REGISTRARSE" />
							</Tabs>
							{value === 0 && (
								<form onSubmit={handleSubmitLogin} id="login">
									<TextField
										id="email"
										label="Correo Electrónico"
										className={classes.textField}
										type="email"
										name="email"
										autoComplete="email"
										margin="normal"
										variant="outlined"
										fullWidth
										required
									/>
									<TextField
										id="password"
										label="Contraseña"
										className={classes.textField}
										type="password"
										name="password"
										autoComplete="password"
										margin="normal"
										variant="outlined"
										fullWidth
										required
									/>
									<Grid
										container
										direction="row"
										justify="flex-end">
										<Button
											variant="contained"
											color="primary"
											type="submit"
											className={classes.button}>
											INICIAR SESIÓN
										</Button>
									</Grid>
								</form>
							)}
							{value === 1 && (
								<form onSubmit={handleSubmitSignup} id="signup">
									<Grid
										container
										direction="row"
										justify="center"
										style={{ marginTop: 20 }}>
										<input
											accept="image/*"
											className={classes.input}
											style={{ display: 'none' }}
											id="raised-button-file"
											multiple
											type="file"
											onChange={uploadImage}
										/>
										<ButtonBase
											focusRipple
											key="profile_image"
											className={classes.image}
											focusVisibleClassName={
												classes.focusVisible
											}
											style={{
												width: '50%',
											}}>
											<label htmlFor="raised-button-file">
												<span
													className={classes.imageSrc}
													style={{
														backgroundImage: `url(http://localhost:3001/profile_images/${profile_image})`,
													}}
												/>
												<span
													className={
														classes.imageBackdrop
													}
												/>
												<span
													className={
														classes.imageButton
													}>
													<Typography
														component="span"
														variant="subtitle1"
														color="inherit"
														className={
															classes.imageTitle
														}>
														{'Imagen de perfil'}
														<span
															className={
																classes.imageMarked
															}
														/>
													</Typography>
												</span>
											</label>
										</ButtonBase>
									</Grid>
									<TextField
										id="firstName"
										label="Nombre"
										className={classes.textField}
										type="text"
										name="firstName"
										autoComplete="firstName"
										margin="normal"
										variant="outlined"
										fullWidth
										required
									/>
									<TextField
										id="lastName"
										label="Apellidos"
										className={classes.textField}
										type="text"
										name="lastName"
										autoComplete="lastName"
										margin="normal"
										variant="outlined"
										fullWidth
									/>
									<TextField
										id="email"
										label="Correo Electrónico"
										className={classes.textField}
										type="email"
										name="email"
										autoComplete="email"
										margin="normal"
										variant="outlined"
										fullWidth
										required
									/>
									<TextField
										id="password"
										label="Contraseña"
										className={classes.textField}
										type="password"
										name="password"
										autoComplete="password"
										margin="normal"
										variant="outlined"
										fullWidth
										required
									/>
									<Grid
										container
										direction="row"
										justify="flex-end">
										<Button
											variant="contained"
											color="primary"
											type="submit"
											className={classes.button}>
											REGISTRARSE
										</Button>
									</Grid>
								</form>
							)}
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}

export default ButtonAppBar
