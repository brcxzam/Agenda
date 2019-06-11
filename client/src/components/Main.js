import DayjsUtils from '@date-io/dayjs'
import { Icon } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fab from '@material-ui/core/Fab'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Add from '@material-ui/icons/Add'
import Alarma from '@material-ui/icons/Alarm'
import Mark from '@material-ui/icons/BookmarkBorder'
import Clear from '@material-ui/icons/Clear'
import CloseIcon from '@material-ui/icons/Close'
import School from '@material-ui/icons/School'
import Today from '@material-ui/icons/Today'
import Score from '@material-ui/icons/Book'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
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
		getEvents(API, token)
	}, [API, token])
	const [open, setOpen] = React.useState({
		subject: false,
		snackbar: false,
		partials: false,
		event: false,
		snackbarEvent: false,
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
				text: 'Nombre inválido',
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
		setOpen({ ...open, snackbar: false, snackbarEvent: false })
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
				getEvents(API, token)
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
				getEvents(API, token)
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
			try {
				const found = scores.find(function(element) {
					return element.subject === subjects[values.index].id
				})
				if (found) {
					if (values.advance === 'advance1' && !values.update) {
						setValues({ ...values, score: found.advance1 })
					} else if (
						values.advance === 'advance2' &&
						!values.update
					) {
						setValues({ ...values, score: found.advance2 })
					} else if (
						values.advance === 'advance3' &&
						!values.update
					) {
						setValues({ ...values, score: found.advance3 })
					} else if (
						values.advance === 'advance4' &&
						!values.update
					) {
						setValues({ ...values, score: found.advance4 })
					}
				}
			} catch {}
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
	 * TODO: Hacer UD
	 */
	const [events, setEvents] = useState([])
	const [actionEvent, setActionEvent] = useState({
		action: 'create',
		title: 'Nuevo evento',
		id: 0,
	})
	const [selectedDate, handleDateChange] = useState()
	const [event, setEvent] = useState({
		title: '',
		date: '',
		school: false,
		subject: 0,
	})
	const [errorTitle, setErrorTitle] = useState({
		error: false,
		text: '',
	})
	const [errorDate, setErrorDate] = useState({
		error: false,
		text: '',
	})
	const [errorSubjectE, setErrorSubjectE] = useState({
		error: false,
		text: '',
	})
	useEffect(() => {
		setEvent({
			...event,
			date: dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss'),
		})
	}, [selectedDate, event])
	useEffect(() => {
		setErrorTitle({
			error: false,
			text: '',
		})
		if (!event.title) {
			setErrorTitle({
				error: true,
				text: 'Título inválido',
			})
		}
	}, [event.title])
	useEffect(() => {
		setErrorDate({
			error: false,
			text: '',
		})
		if (!selectedDate) {
			setErrorDate({
				error: true,
				text: 'Fecha y Hora inválidas',
			})
		}
	}, [selectedDate])
	useEffect(() => {
		setErrorSubjectE({
			error: false,
			text: '',
		})
		if (event.school && event.subject === 0) {
			setErrorSubjectE({
				error: true,
				text: 'Selecciona la asignatura',
			})
		}
	}, [event.school, event.subject])
	async function getEvents(API, token) {
		try {
			const query = JSON.stringify({
				query:
					'{ events{ id title date repeat school subject{id name} } }',
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
			const { events } = response.data
			setEvents(events)
		} catch (error) {
			console.error(error)
		}
	}
	function handleCloseEvent() {
		setOpen({ ...open, event: false })
	}
	function handleActionEvent() {
		if (
			actionEvent.action === 'create' &&
			!errorTitle.error &&
			!errorDate.error &&
			!errorSubjectE.error
		) {
			createEvent()
		} else if (
			actionEvent.action === 'update' &&
			!errorTitle.error &&
			!errorDate.error &&
			!errorSubjectE.error
		) {
			updateEvent()
		}
	}
	async function createEvent() {
		try {
			const eventD = Object.assign({}, event)
			if (!eventD.school) {
				delete eventD.school
				delete eventD.subject
			} else {
				eventD.school = 'true'
			}
			const query = JSON.stringify({
				query: 'mutation($data: iEvents){ cEvent(data: $data){ id } }',
				variables: {
					data: eventD,
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
			const { cEvent } = response.data
			if (cEvent) {
				getEvents(API, token)
				setOpen({ ...open, event: false })
			}
		} catch (error) {
			console.error(error)
		}
	}
	/**
	 * TODO: Update Event
	 */
	async function updateEvent() {
		try {
			const eventD = Object.assign({}, event)
			if (!eventD.school) {
				eventD.school = null
				eventD.subject = null
			} else {
				eventD.school = 'true'
			}
			const query = JSON.stringify({
				query:
					'mutation($id: ID, $data: iEvents){ uEvent(id: $id, data: $data) }',
				variables: {
					id: actionEvent.id,
					data: eventD,
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
			const { uEvent } = response.data
			if (uEvent === 'done') {
				getEvents(API, token)
				setOpen({ ...open, event: false })
			}
		} catch (error) {
			console.error(error)
		}
	}
	function handleCreateEvent() {
		setActionEvent({
			action: 'create',
			title: 'Nuevo Evento',
			id: 0,
		})
		setOpen({ ...open, event: true })
	}
	function handleUpdateEvent(index) {
		setActionEvent({
			action: 'update',
			title: 'Editar Evento',
			id: events[index].id,
		})
		const school = events[index].school === 'true'
		console.log(events[index].date)
		console.log(
			dayjs(events[index].date).format('dddd, MMMM D, YYYY h:mm A')
		)

		let subject = 0
		if (events[index].subject) {
			subject = events[index].subject.id
		}
		setEvent({
			title: events[index].title,
			date: '',
			school,
			subject,
		})
		handleDateChange(dayjs(events[index].date))
		setOpen({ ...open, event: true })
	}
	const handleChangeEvent = name => e => {
		if (name === 'school') {
			if (e.target.checked) {
				setEvent({ ...event, [name]: e.target.checked })
			} else {
				setEvent({ ...event, [name]: e.target.checked, subject: 0 })
			}
		} else {
			setEvent({ ...event, [name]: e.target.value })
		}
	}
	function handleDeleteEvent(index) {
		setActionEvent({
			action: 'delete',
			title: events[index].title,
			id: events[index].id,
		})
		setOpen({ ...open, snackbarEvent: true })
	}
	async function deleteEvent() {
		try {
			const query = JSON.stringify({
				query: 'mutation($id: ID){ dEvent(id: $id) }',
				variables: {
					id: actionEvent.id,
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
			const { dEvent } = response.data
			if (dEvent === 'done') {
				getEvents(API, token)
				setOpen({ ...open, snackbarEvent: false })
			} else {
				console.error(response)
			}
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<MuiPickersUtilsProvider utils={DayjsUtils}>
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
									onClick={handleCreateEvent}
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
										<Grid item xs={12}>
											<Typography
												variant="subtitle2"
												align="center">
												{dayjs(event.date).format(
													'dddd, MMMM D, YYYY h:mm A'
												)}
											</Typography>
										</Grid>
										<Grid
											item
											xs={2}
											style={{ textAlign: 'center' }}>
											<Icon
												fontSize="inherit"
												color="secondary">
												<Today />
											</Icon>
										</Grid>
										<Grid
											onClick={() => {
												handleUpdateEvent(index)
											}}
											item
											xs={6}
											className={classes.fakeButton}>
											<Typography
												variant="subtitle1"
												align="left">
												{event.title}
											</Typography>
										</Grid>
										<Grid item xs={2}>
											{event.subject && (
												<Typography
													variant="subtitle1"
													align="center"
													color="primary">
													{event.subject.name}
												</Typography>
											)}
										</Grid>
										<Grid
											onClick={() => {
												handleDeleteEvent(index)
											}}
											item
											xs={2}
											className={classes.fakeButton}
											style={{ textAlign: 'center' }}>
											<Icon
												fontSize="inherit"
												color="error">
												<Clear />
											</Icon>
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
								<Typography variant="h6">
									Asignaturas
								</Typography>
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
											<Icon
												fontSize="inherit"
												color="error">
												<Clear />
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
					<DialogTitle id="cuSubject">
						{actionSubject.title}
					</DialogTitle>
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
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<School />
									</InputAdornment>
								),
							}}
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
								<MenuItem
									key={option.value}
									value={option.value}>
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
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Score />
									</InputAdornment>
								),
							}}
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
					<DialogTitle id="cuSubject">
						{actionEvent.title}
					</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="title"
							label="Título"
							type="text"
							variant="outlined"
							fullWidth
							value={event.title}
							onChange={handleChangeEvent('title')}
							error={errorTitle.error}
							helperText={errorTitle.text}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Mark />
									</InputAdornment>
								),
							}}
						/>
						<DateTimePicker
							value={selectedDate}
							onChange={handleDateChange}
							format="dddd, MMMM D, YYYY h:mm A"
							inputVariant="outlined"
							margin="dense"
							label="Fecha y Hora"
							fullWidth
							disablePast
							error={errorDate.error}
							helperText={errorDate.text}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Alarma />
									</InputAdornment>
								),
							}}
						/>
						{event.school && (
							<TextField
								fullWidth
								id="outlined-select-currency"
								select
								label="Asignatura"
								className={classes.textField}
								value={event.subject}
								onChange={handleChangeEvent('subject')}
								SelectProps={{
									MenuProps: {
										className: classes.menu,
									},
								}}
								helperText={errorSubjectE.text}
								error={errorSubjectE.error}
								margin="normal"
								variant="outlined">
								{subjects.map(option => (
									<MenuItem key={option.id} value={option.id}>
										{option.name}
									</MenuItem>
								))}
							</TextField>
						)}
					</DialogContent>
					<DialogActions>
						{subjects.length > 0 && (
							<FormControlLabel
								control={
									<Switch
										checked={event.school}
										onChange={handleChangeEvent('school')}
										value="school"
									/>
								}
								label="Evento escolar"
							/>
						)}
						<Button onClick={handleCloseEvent} color="primary">
							Cancel
						</Button>
						<Button onClick={handleActionEvent} color="primary">
							Aceptar
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={open.snackbarEvent}
				autoHideDuration={6000}
				onClose={handleClose}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={
					<span id="message-id">
						¿Eliminar Evento? {actionEvent.title}
					</span>
				}
				action={[
					<Button
						key="accept"
						color="secondary"
						size="small"
						onClick={deleteEvent}>
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
		</MuiPickersUtilsProvider>
	)
}

export default Main
