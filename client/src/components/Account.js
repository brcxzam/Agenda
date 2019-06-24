import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import green from '@material-ui/core/colors/green'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AlternateEmail from '@material-ui/icons/AlternateEmail'
import CloseIcon from '@material-ui/icons/Close'
import HowToReg from '@material-ui/icons/HowToReg'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import configAPI from './../API'

const useStyles = makeStyles(theme => ({
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	avatar: {
		margin: 15,
		height: 250,
		width: 250,
		cursor: 'pointer',
	},
	button: {
		margin: 15,
	},
	input: {
		display: 'none',
	},
	root: {
		display: 'flex',
		alignItems: 'center',
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},
	buttonSuccess: {
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700],
		},
	},
	fabProgress: {
		color: green[500],
		position: 'absolute',
		top: -6,
		left: -6,
		zIndex: 1,
	},
	buttonProgress: {
		color: green[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}))

function Account(props) {
	// Estilos del componente
	const classes = useStyles()
	// Estados
	const [API] = useState(configAPI.API)
	const [images] = useState(`${configAPI.staticFiles}/profile_images/`)
	const [{ firstName, lastName, email, profile_image }, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		profile_image: '',
	})
	const [token] = useState(localStorage.getItem(configAPI.tokenItem))
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
	const [open, setOpen] = React.useState(false)
	// Hooks
	useEffect(() => {
		getUser(API, token, images)
	}, [API, token, images])
	// Handles
	function handleClose(event, reason) {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}
	async function getUser(API, token, images) {
		try {
			const query = JSON.stringify({
				query: '{ user { firstName, lastName, email, profile_image }}',
			})
			const res = await fetch(API, {
				method: 'POST',
				body: query,
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			})
			const response = await res.json()
			const { user } = response.data
			if (!user.lastName) {
				user.lastName = ''
			}
			user.profile_image = images + user.profile_image
			setUser(user)
		} catch (error) {
			console.error(error)
		}
	}

	async function handleUpdateUser(event) {
		event.preventDefault()
		const formData = new FormData(event.target)
		const data = Object.fromEntries(formData)
		if (!data.lastName) {
			delete data.lastName
		}
		const query = JSON.stringify({
			query: 'mutation($data: iUsers){ uUser(data: $data) }',
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
					authorization: token,
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
					case 'Validation error: Validation isEmail on email failed':
						setErrorEmail({
							errorEmail: true,
							messageErrorEmail: 'Correo invalido',
						})
						break

					default:
						console.error(errors[0].message)
						break
				}
			} else {
				/**
				 * TODO: Mensaje de edición exitosa
				 */
				if (data.uUser === 'done') {
					setOpen(true)
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	function handleErrorFirstName(event) {
		setErrorFirstName({ errorFirstName: false, messageErrorFirstName: '' })
		setUser({
			firstName: event.target.value,
			lastName,
			email,
			profile_image,
		})
	}

	function handleErrorLastName(event) {
		setErrorLastName({ errorLastName: false, messageErrorLastName: '' })
		setUser({
			firstName,
			lastName: event.target.value,
			email,
			profile_image,
		})
	}

	function handleErrorEmail(event) {
		setErrorEmail({ errorEmail: false, messageErrorEmail: '' })
		setUser({
			firstName,
			lastName,
			email: event.target.value,
			profile_image,
		})
	}

	async function handleProfileImage(event) {
		const formData = new FormData()
		const fileField = event.target
		formData.append('profile_image', fileField.files[0])
		try {
			const res = await fetch('http://localhost:3001/api/upload', {
				method: 'POST',
				body: formData,
				headers: {
					authorization: 'Bearer ' + token,
				},
			})
			const response = await res.json()
			const { profile_image } = response
			setUser({
				firstName,
				lastName,
				email,
				profile_image: images + profile_image,
			})
			props.onChangeProfileImage(images + profile_image)
		} catch (error) {
			console.error(error)
		}
	}

	async function handleDeleteImage() {
		try {
			const res = await fetch('http://localhost:3001/api/upload/delete', {
				method: 'POST',
				headers: {
					authorization: 'Bearer ' + token,
				},
			})
			const response = await res.json()
			const { message } = response
			setUser({
				firstName,
				lastName,
				email,
				profile_image: images + message,
			})
			props.onChangeProfileImage('')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Container maxWidth="sm">
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center">
				<input
					accept=".png, .jpg, .jpeg"
					className={classes.input}
					id="profile_image"
					type="file"
					onChange={handleProfileImage}
				/>
				<label htmlFor="profile_image">
					<Avatar
						alt="profile_image"
						src={profile_image}
						className={classes.avatar}
					/>
				</label>
				<div className={classes.root}>
					<div className={classes.wrapper}>
						<Button
							variant="outlined"
							color="primary"
							onClick={handleDeleteImage}>
							ELIMINAR
						</Button>
					</div>
				</div>
			</Grid>

			<form onSubmit={handleUpdateUser}>
				<TextField
					value={firstName}
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
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<AccountCircle />
							</InputAdornment>
						),
					}}
				/>
				<TextField
					value={lastName}
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
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<HowToReg />
							</InputAdornment>
						),
					}}
				/>
				<TextField
					value={email}
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
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<AlternateEmail />
							</InputAdornment>
						),
					}}
				/>
				<Grid
					container
					direction="row"
					justify="flex-end"
					alignItems="center">
					<div className={classes.root}>
						<div className={classes.wrapper}>
							<Button
								type="submit"
								color="primary"
								component={RouterLink}
								to="/app">
								Cancelar
							</Button>
							<Button
								type="submit"
								variant="contained"
								color="secondary">
								Guardar
							</Button>
						</div>
					</div>
				</Grid>
			</form>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={<span id="message-id">Cambios realizados</span>}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={handleClose}>
						<CloseIcon />
					</IconButton>,
				]}
			/>
		</Container>
	)
}

export default Account
