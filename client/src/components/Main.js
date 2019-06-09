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
import configAPI from './../API'

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

const advances = [
	{
		value: 'advance1',
		label: 'Primer parcial: 20%',
	},
	{
		value: 'advance2',
		label: 'Segundo parcial: 20%',
	},
	{
		value: 'advance3',
		label: 'Tercer parcial: 20%',
	},
	{
		value: 'advance4',
		label: 'Cuarto parcial: 40%',
	},
]

function Main() {
	const classes = useStyles()
	const [API] = useState(configAPI.API)
	const [token] = useState(localStorage.getItem(configAPI.tokenItem))
	useEffect(() => {
		getSubjects(API, token)
		getScores(API, token)
	}, [API, token])
	const [open, setOpen] = React.useState({
		subject: false,
		snackbar: false,
		partials: false,
		event: false,
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
				query: '{ subjects { id name final_score } }',
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
			if (dSubject === 'done') {
				getSubjects(API, token)
				setOpen({ ...open, snackbar: false })
			} else {
				console.error(response)
			}
		} catch (error) {
			console.error(error)
		}
	}
	async function createSubject() {
		try {
			const query = JSON.stringify({
				query:
					'mutation($data: iSubjects) { cSubject(data: $data) {id name final_score} }',
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
			if (uSubject === 'done') {
				getSubjects(API, token)
				setOpen({ ...open, subject: false })
			} else {
				console.error(response)
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
	/**
	 * Scores
	 */
	const [scores, setScores] = useState([])
	const [values, setValues] = useState({
		advance: 'advance1',
		score: 0,
		index: 0,
		update: false,
		subject: 0,
	})
	const [errorScore, setErrorScore] = useState({
		error: false,
		text: '',
	})
	useEffect(() => {
		if (subjects) {
			const found = scores.find(function(element) {
				return element.subject === subjects[values.index].id
			})
			if (found) {
				if (values.advance === 'advance1' && !values.update) {
					setValues({ ...values, score: found.advance1 })
				} else if (values.advance === 'advance2' && !values.update) {
					setValues({ ...values, score: found.advance2 })
				} else if (values.advance === 'advance3' && !values.update) {
					setValues({ ...values, score: found.advance3 })
				} else if (values.advance === 'advance4' && !values.update) {
					setValues({ ...values, score: found.advance4 })
				}
			}
		}
	}, [values, scores, subjects])
	useEffect(() => {
		setErrorScore({
			error: false,
			text: '',
		})
		if (values.score > 40 && values.advance === 'advance4') {
			setErrorScore({
				error: true,
				text: 'La calificación debe ser porcentual',
			})
		} else if (values.score > 20 && values.advance !== 'advance4') {
			setErrorScore({
				error: true,
				text: 'La calificación debe ser porcentual',
			})
		}
	}, [values])
	async function getScores(API, token) {
		try {
			const query = JSON.stringify({
				query:
					'{ scores { subject advance1 advance2 advance3 advance4 final_score } }',
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
			const { scores } = response.data
			setScores(scores)
		} catch (error) {
			console.error(error)
		}
	}
	function handleClosePartials() {
		setOpen({ ...open, partials: false })
	}
	function handleOpenPartials(index) {
		setValues({ ...values, index, subject: subjects[index].id })
		setOpen({ ...open, partials: true })
	}
	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value, update: false })
	}
	async function handleUpdatePartials() {
		if (!errorScore.error) {
			try {
				let data = {}
				if (values.advance === 'advance1') {
					data = { advance1: parseFloat(values.score) }
				} else if (values.advance === 'advance2') {
					data = { advance2: parseFloat(values.score) }
				} else if (values.advance === 'advance3') {
					data = { advance3: parseFloat(values.score) }
				} else if (values.advance === 'advance4') {
					data = { advance4: parseFloat(values.score) }
				}
				const query = JSON.stringify({
					query:
						'mutation($id: ID, $data: iScores){ uScore(id: $id, data: $data) }',
					variables: {
						data,
						id: values.subject,
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
				const { uScore } = response.data
				if (uScore === 'done') {
					getSubjects(API, token)
					getScores(API, token)
					setOpen({ ...open, partials: false })
				} else {
					console.error(response)
				}
			} catch (error) {
				console.error(error)
			}
		}
	}
	function handleScoreSubject(event) {
		setValues({ ...values, score: event.target.value, update: true })
	}
	/**
	 * Events
	 * TODO: Hacer todo
	 */
	const [events, setEvents] = useState([])
	const [actionEvent, setActionEvent] = useState({
		action: 'create',
		title: 'Nuevo evento',
		id: 0,
	})
	function handleCloseEvent() {
		setOpen({ ...open, event: false })
	}
	function handleActionEvent() {
		if (actionSubject.action === 'create' && !errorSubject.error) {
			createSubject()
		} else if (actionSubject.action === 'update' && !errorSubject.error) {
			updateSubject()
		}
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
							<Typography variant="h6">Eventos</Typography>
							<Fab
								onClick={handleCreateSubject}
								size="small"
								color="secondary"
								aria-label="Add">
								<Add />
							</Fab>
						</Grid>
					</Paper>
					{events.length ? (
						events.map((event, index) => (
							<Paper
								key={event.id}
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
											{event.name}
										</Typography>
									</Grid>
									<Grid
										onClick={() => {
											handleOpenPartials(index)
										}}
										item
										xs={2}
										className={classes.fakeButton}>
										<Typography
											variant="subtitle2"
											align="center"
											color="textSecondary">
											{event.final_score}/100
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
								Aún no has registrado eventos
							</Typography>
						</Paper>
					)}
				</Grid>
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
										onClick={() => {
											handleOpenPartials(index)
										}}
										item
										xs={2}
										className={classes.fakeButton}>
										<Typography
											variant="subtitle2"
											align="center"
											color="textSecondary">
											{subject.final_score}/100
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
						value={values.advance}
						onChange={handleChange('advance')}
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="Selecciona el parcial"
						margin="normal"
						variant="outlined">
						{advances.map(option => (
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
						value={values.score}
						onChange={handleScoreSubject}
						error={errorScore.error}
						helperText={errorScore.text}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClosePartials} color="primary">
						Cancel
					</Button>
					<Button onClick={handleUpdatePartials} color="primary">
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={open.event}
				onClose={handleCloseEvent}
				aria-labelledby="cuSubject">
				<DialogTitle id="cuSubject">{actionEvent.title}</DialogTitle>
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
					<Button onClick={handleCloseEvent} color="primary">
						Cancel
					</Button>
					<Button onClick={handleActionEvent} color="primary">
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}

export default Main
