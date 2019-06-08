import { Icon } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Add from '@material-ui/icons/Add'
import DeleteForever from '@material-ui/icons/DeleteForever'
import React, { useEffect, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles(theme => ({
	root: {
		paddingTop: 30,
	},
	paper: {
		padding: theme.spacing(2, 1),
		margin: 10,
	},
	fakeButton: {
		cursor: 'pointer',
	},
	close: {
		padding: theme.spacing(0.5),
	},
}))

/**
 * TODO: Modificar el arreglo para calificaciónes por parcial
 */

const currencies = [
	{
		value: 'USD',
		label: '$',
	},
	{
		value: 'EUR',
		label: '€',
	},
	{
		value: 'BTC',
		label: '฿',
	},
	{
		value: 'JPY',
		label: '¥',
	},
]

function Main() {
	const classes = useStyles()
	const [API] = useState('http://localhost:3001/api')
	const [token] = useState(localStorage.getItem('authToken'))
	useEffect(() => {
		// getSubjects(API, token)
		console.log(token)
	}, [API, token])
	const [open, setOpen] = React.useState({
		subject: false,
		snackbar: false,
		partials: false,
	})
	/**
	 * Subjects
	 */
	const [subjects, setSubjects] = useState([])
	const [nameSubject, setNameSubject] = useState('')
	const [errorSubject, setErrorSubject] = useState({
		error: false,
		text: '',
	})
	const [actionSubject, setActionSubject] = useState({
		action: 'create',
		title: 'Nueva asignatura',
		id: 0,
	})
	useEffect(() => {
		if (nameSubject) {
			setErrorSubject({
				error: false,
				text: '',
			})
		} else {
			setErrorSubject({
				error: true,
				text: 'Nombre invalido',
			})
		}
	}, [nameSubject])
	async function getSubjects(API, token) {
		try {
			const query = JSON.stringify({
				query: '{ subjects { id name score } }',
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
			const { subjects } = response.data
			setSubjects(subjects)
		} catch (error) {
			console.error(error)
		}
	}
	function handleCreateSubject() {
		setActionSubject({
			action: 'create',
			title: 'Nueva asignatura',
			id: 0,
		})
		setOpen({ ...open, subject: true, snackbar: false })
	}
	function handleUpdateSubject(index) {
		setActionSubject({
			action: 'update',
			title: 'Modificar asignatura',
			id: subjects[index].id,
		})
		setNameSubject(subjects[index].name)
		setOpen({ ...open, subject: true, snackbar: false })
	}
	function handleDeleteSubject(index) {
		setActionSubject({
			action: 'delete',
			title: subjects[index].name,
			id: subjects[index].id,
		})
		setOpen({ ...open, snackbar: true })
	}
	function handleCloseSubject() {
		setOpen({ ...open, subject: false })
	}
	function handleNameSubject(event) {
		setNameSubject(event.target.value)
	}
	function handleClose(event, reason) {
		if (reason === 'clickaway') {
			return
		}

		setOpen({ ...open, snackbar: false })
	}
	async function deleteSubject() {
		try {
			const query = JSON.stringify({
				query: 'mutation($id: ID){ dSubject(id: $id) }',
				variables: {
					id: actionSubject.id,
				},
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
			const { dSubject } = response.data
			if (dSubject === 'Done') {
				getSubjects(API, token)
				setOpen({ ...open, snackbar: false })
			} else {
				console.log(response)
			}
		} catch (error) {
			console.error(error)
		}
	}
	async function createSubject() {
		try {
			const query = JSON.stringify({
				query:
					'mutation($data: iSubjects) { cSubject(data: $data) {id name score} }',
				variables: {
					data: {
						name: nameSubject,
					},
				},
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
			const { cSubject } = response.data
			subjects.push(cSubject)
			setOpen({ ...open, subject: false })
		} catch (error) {
			console.error(error)
		}
	}
	async function updateSubject() {
		try {
			const query = JSON.stringify({
				query:
					'mutation($id: ID, $data: iSubjects) { uSubject(id: $id, data: $data) }',
				variables: {
					data: {
						name: nameSubject,
					},
					id: actionSubject.id,
				},
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
			const { uSubject } = response.data
			if (uSubject === 'Done') {
				getSubjects(API, token)
				setOpen({ ...open, subject: false })
			} else {
				console.log(response)
			}
		} catch (error) {
			console.error(error)
		}
	}
	function handleActionSubject() {
		if (actionSubject.action === 'create' && !errorSubject.error) {
			createSubject()
		} else if (actionSubject.action === 'update' && !errorSubject.error) {
			updateSubject()
		}
	}
	function handleClosePartials() {
		setOpen({ ...open, partials: false })
	}
	function handleOpenPartials() {
		setOpen({ ...open, partials: true })
	}
	/**
	 * TODO: Calificaciones por parcial
	 */
	const [values, setValues] = React.useState({
		name: 'Cat in the Hat',
		age: '',
		multiline: 'Controlled',
		currency: 'EUR',
	})

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value })
	}
	return (
		<Container fixed className={classes.root}>
			<Grid container spacing={10}>
				<Grid item xs={6}>
					<Paper elevation={10} className={classes.paper}>
						<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="center">
							<Typography variant="h6">Asignaturas</Typography>
							<Fab
								onClick={handleCreateSubject}
								size="small"
								color="secondary"
								aria-label="Add">
								<Add />
							</Fab>
						</Grid>
					</Paper>
					{subjects.length ? (
						subjects.map((subject, index) => (
							<Paper
								key={subject.id}
								className={classes.paper}
								square>
								<Grid container alignItems="center">
									<Grid
										onClick={() => {
											handleDeleteSubject(index)
										}}
										item
										xs={2}
										className={classes.fakeButton}
										style={{ textAlign: 'center' }}>
										<Icon fontSize="inherit" color="error">
											<DeleteForever />
										</Icon>
									</Grid>
									<Grid
										onClick={() => {
											handleUpdateSubject(index)
										}}
										item
										xs={8}
										className={classes.fakeButton}>
										<Typography
											variant="subtitle1"
											align="left">
											{subject.name}
										</Typography>
									</Grid>
									<Grid
										onClick={handleOpenPartials}
										item
										xs={2}
										className={classes.fakeButton}>
										<Typography
											variant="subtitle2"
											align="center"
											color="textSecondary">
											{subject.score}
										</Typography>
									</Grid>
								</Grid>
							</Paper>
						))
					) : (
						<Paper className={classes.paper} square>
							<Typography
								variant="subtitle1"
								align="center"
								color="textSecondary">
								Aún no has registrado asignaturas
							</Typography>
						</Paper>
					)}
				</Grid>
			</Grid>
			<Dialog
				open={open.subject}
				onClose={handleCloseSubject}
				aria-labelledby="cuSubject">
				<DialogTitle id="cuSubject">{actionSubject.title}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Nombre"
						type="text"
						variant="outlined"
						fullWidth
						value={nameSubject}
						onChange={handleNameSubject}
						error={errorSubject.error}
						helperText={errorSubject.text}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseSubject} color="primary">
						Cancel
					</Button>
					<Button onClick={handleActionSubject} color="primary">
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={open.snackbar}
				autoHideDuration={6000}
				onClose={handleClose}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={
					<span id="message-id">
						¿Eliminar Asignatura? {actionSubject.title}
					</span>
				}
				action={[
					<Button
						key="accept"
						color="secondary"
						size="small"
						onClick={deleteSubject}>
						Eliminar
					</Button>,
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
			<Dialog
				open={open.partials}
				onClose={handleClosePartials}
				aria-labelledby="cuSubject">
				<DialogTitle id="cuSubject">
					Calificaciónes por parcial
				</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						id="outlined-select-currency"
						select
						label="Select"
						className={classes.textField}
						value={values.currency}
						onChange={handleChange('currency')}
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="Please select your currency"
						margin="normal"
						variant="outlined">
						{currencies.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						margin="dense"
						id="obtained"
						label="Calificación"
						type="text"
						variant="outlined"
						fullWidth
						value={nameSubject}
						onChange={handleNameSubject}
						error={errorSubject.error}
						helperText={errorSubject.text}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClosePartials} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClosePartials} color="primary">
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}

export default Main
