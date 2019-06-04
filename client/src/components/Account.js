import green from '@material-ui/core/colors/green'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import HowToReg from '@material-ui/icons/HowToReg'
import AlternateEmail from '@material-ui/icons/AlternateEmail'

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
	const [API] = useState('http://localhost:3001/api')
	const [images] = useState('http://localhost:3001/profile_images/')
	const [{ firstName, lastName, email, profile_image }, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		profile_image: '',
	})
	const [token] = useState(localStorage.getItem('authToken'))
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
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [successUpdate, setSuccessUpdate] = useState('')
	// Hooks
	const buttonClassname = clsx({
		[classes.buttonSuccess]: success,
	})

	useEffect(() => {
		getUser(API, token, images)
	}, [API, token, images])
	// Handles
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
		setSuccess(false)
		setLoading(true)
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
						console.log(errors[0].message)
						break
				}
			} else {
				/**
				 * TODO: Mensaje de edición exitosa
				 */
				if (data.uUser === 'done')
					setSuccessUpdate('Cambios realizados')
			}
		} catch (error) {
			console.error(error)
		}
		setSuccess(true)
		setLoading(false)
	}

	function handleErrorFirstName(event) {
		setErrorFirstName({ errorFirstName: false, messageErrorFirstName: '' })
		setUser({
			firstName: event.target.value,
			lastName,
			email,
			profile_image,
		})
		setSuccess(false)
		setSuccessUpdate('')
	}

	function handleErrorLastName(event) {
		setErrorLastName({ errorLastName: false, messageErrorLastName: '' })
		setUser({
			firstName,
			lastName: event.target.value,
			email,
			profile_image,
		})
		setSuccess(false)
		setSuccessUpdate('')
	}

	function handleErrorEmail(event) {
		setErrorEmail({ errorEmail: false, messageErrorEmail: '' })
		setUser({
			firstName,
			lastName,
			email: event.target.value,
			profile_image,
		})
		setSuccess(false)
		setSuccessUpdate('')
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
		setSuccess(false)
		setLoading(true)
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
		setSuccess(true)
		setLoading(false)
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
							className={buttonClassname}
							disabled={loading}
							onClick={handleDeleteImage}>
							ELIMINAR
						</Button>
						{loading && (
							<CircularProgress
								size={24}
								className={classes.buttonProgress}
							/>
						)}
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
						<Typography
							variant="h6"
							align="center"
							color="secondary">
							{successUpdate}
						</Typography>
						<div className={classes.wrapper}>
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								className={buttonClassname}
								disabled={loading}>
								Guardar
							</Button>
							{loading && (
								<CircularProgress
									size={24}
									className={classes.buttonProgress}
								/>
							)}
						</div>
					</div>
				</Grid>
			</form>
		</Container>
	)
}

export default Account
