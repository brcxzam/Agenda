import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import { Button, Icon, MenuItem, Switch } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { useTheme } from '@material-ui/core/styles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import AccessAlarm from '@material-ui/icons/AccessAlarm'
import React, { useState, useEffect } from 'react'

const useStyles = makeStyles(theme => ({
	root: {
		paddingTop: 30,
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}))

const repeat = [
	{
		value: 'no_repeat',
		label: 'No repetir',
	},
	{
		value: 'daily',
		label: 'Diariamente',
	},
	{
		value: 'weekly',
		label: 'Semanalmente',
	},
	{
		value: 'monthly',
		label: 'Mensualmente',
	},
	{
		value: 'yearly',
		label: 'Anualmente',
	},
]

function Main() {
	const classes = useStyles()
	const [icons] = useState([<AccessAlarm key="0" />])
	const [subjects, setSubjects] = useState([
		{
			id: 0,
			name: 'Prueba',
			icon: 0,
			color: '#0c0',
		},
	])
	const [openSubjects, setOpenSubjects] = useState(false)
	const [openEvents, setOpenEvents] = useState(false)
	function closeSubjects() {
		setOpenSubjects(false)
	}
	function handleOpenSubjects() {
		setOpenSubjects(true)
	}
	function closeEvents() {
		setOpenEvents(false)
		setEvent({
			title: '',
			date: moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'),
			repeat: 'no_repeat',
			school: '',
			subject: '',
		})
	}
	function handleOpenEvents() {
		setOpenEvents(true)
	}
	const theme = useTheme()

	const [state, setState] = React.useState({
		checkedA: { value: true, color: '#0c0c' },
		checkedB: { value: true, color: '#0c0c' },
		checkedF: { value: true, color: '#0c0c' },
		checkedG: { value: true, color: '#0c0c' },
	})

	const handleChange = name => event => {
		let stColor = '#0c0c'
		if (event.target.checked) {
			stColor = theme.palette.primary.main
		}
		setState({
			...state,
			[name]: { value: event.target.checked, color: stColor },
		})
		setSubjects()
	}
	const [selectedDate, handleDateChange] = useState(new Date())

	const [values, setValues] = React.useState({
		repeat: 'no_repeat',
	})

	const [school, setSchool] = useState(false)

	const [API] = useState('http://localhost:3001/api')
	const [token] = useState(localStorage.getItem('authToken'))
	useEffect(() => {
		getSubjects(API, token)
	}, [API, token])

	async function getSubjects(API, token) {
		try {
			const query = JSON.stringify({
				query:
					'{ subjects { id name user schedules { id start finish day subject } } }',
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
			console.log(subjects)
		} catch (error) {
			console.error(error)
		}
	}
	/**
	 * Events
	 */

	const [cEvent, setEvent] = useState({
		title: '',
		date: '',
		repeat: 'no_repeat',
		school: '',
		subject: '',
	})

	const handleEvent = name => event => {
		if (name === 'date') {
			setEvent({
				...cEvent,
				[name]: moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'),
			})
		} else {
			setEvent({ ...cEvent, [name]: event.target.value })
		}
	}

	const handleChange1 = name => event => {
		setValues({ ...values, [name]: event.target.value })
		setEvent({ ...cEvent, [name]: event.target.value })
	}

	function handleSchool(event) {
		if (subjects.length !== 0) {
			setSchool(event.target.checked)
			setEvent({ ...cEvent, school: event.target.checked })
		}
	}

	async function createEvent() {
		let data = Object.assign({}, cEvent)
		if (!data.school) {
			delete data.school
		}
		if (!data.subject) {
			delete data.subject
		}
		try {
			const query = JSON.stringify({
				query: 'mutation($data: iEvents) { cEvent(data: $data) {id} }',
				variables: {
					data,
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
			console.log(response)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		console.log(
			moment(
				'2019-06-13T23:20:00.000Z',
				moment.HTML5_FMT.DATETIME_LOCAL_MS
			).format('YYYY-MM-DD HH:mm:ss')
		)

		console.log(cEvent)
	})

	return (
		<Container fixed className={classes.root}>
			<Grid container spacing={10}>
				<Grid item xs={6}>
					<Grid
						container
						direction="row"
						justify="space-around"
						alignItems="center">
						<Typography variant="h6" component="h3">
							Buenas Tardes
						</Typography>
						<Button onClick={handleOpenEvents}>Añadir</Button>
					</Grid>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						<Grid
							container
							direction="row"
							justify="space-around"
							alignItems="center">
							<Typography variant="h6" component="h3">
								Horario
							</Typography>
						</Grid>
					</Paper>
					<Paper className={classes.paper} style={{ marginTop: 15 }}>
						<Grid
							container
							direction="row"
							justify="space-around"
							alignItems="center">
							<Typography variant="h6" component="h3">
								Materias
							</Typography>
							<Button onClick={handleOpenSubjects}>Añadir</Button>
						</Grid>
						{subjects.map(subject => (
							<Grid
								key={subject.id}
								container
								direction="row"
								justify="center"
								alignItems="center">
								<Grid item xs={2}>
									<Icon
										fontSize="large"
										style={{ color: subject.color }}>
										{icons[subject.icon]}
									</Icon>
								</Grid>
								<Grid item xs={8}>
									<Typography
										variant="h5"
										component="h3"
										align="left">
										{subject.name}
									</Typography>
								</Grid>
								<Grid item xs={2} style={{ cursor: 'pointer' }}>
									<Typography
										variant="h6"
										component="h3"
										align="center"
										color="textSecondary"
										className={classes.time}>
										{subject.name}
									</Typography>
								</Grid>
							</Grid>
						))}
					</Paper>
				</Grid>
			</Grid>
			<Dialog
				scroll="paper"
				fullWidth
				maxWidth="xs"
				open={openSubjects}
				onClose={closeSubjects}
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">
					Crear Asignatura
				</DialogTitle>
				<FormControl component="form" fullWidth>
					<DialogContent>
						<TextField
							id="name"
							label="Nombre"
							type="text"
							name="name"
							margin="normal"
							variant="outlined"
							fullWidth
						/>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Horario
						</Typography>
						<TextField
							id="partials"
							label="Cantidad de parciales"
							type="number"
							name="partials"
							margin="normal"
							variant="outlined"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button
							type="submit"
							onClick={closeSubjects}
							color="primary">
							Aceptar
						</Button>
					</DialogActions>
				</FormControl>
			</Dialog>

			<Dialog
				scroll="paper"
				fullWidth
				maxWidth="xs"
				open={openEvents}
				onClose={closeEvents}
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Crear Evento</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						variant="outlined"
						label="Titulo"
						type="text"
						margin="normal"
						value={cEvent.title}
						onChange={handleEvent('title')}
					/>
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<DateTimePicker
							fullWidth
							inputVariant="outlined"
							label="DateTimePicker"
							margin="normal"
							format="D MMMM YYYY, hh:mm A"
							value={selectedDate}
							onChange={handleDateChange}
							onAccept={handleEvent('date')}
						/>
					</MuiPickersUtilsProvider>
					<TextField
						fullWidth
						variant="outlined"
						select
						label="Repetir"
						value={values.repeat}
						onChange={handleChange1('repeat')}
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						margin="normal">
						{repeat.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					{school && (
						<TextField
							fullWidth
							variant="outlined"
							select
							label="Asignatura"
							value={values.repeat}
							onChange={handleChange1('subject')}
							SelectProps={{
								MenuProps: {
									className: classes.menu,
								},
							}}
							margin="normal">
							{subjects.map(option => (
								<MenuItem key={option.id} value={option.id}>
									{option.name}
								</MenuItem>
							))}
						</TextField>
					)}
				</DialogContent>
				<DialogActions>
					<FormControlLabel
						control={
							<Switch checked={school} onChange={handleSchool} />
						}
						label="Escolar"
					/>
					<Button onClick={closeEvents} color="primary">
						Personalizar
					</Button>
					<Button onClick={createEvent} color="primary">
						Crear
					</Button>
				</DialogActions>
			</Dialog>
			<FormGroup row>
				<FormControlLabel
					control={
						<Checkbox
							checked={state.checkedA.value}
							onChange={handleChange('checkedA')}
							value="checkedA"
							style={{ display: 'none' }}
						/>
					}
					label={
						<Avatar
							className={classes.avatar}
							style={{ backgroundColor: state.checkedA.color }}>
							LLLL{' '}
						</Avatar>
					}
				/>
			</FormGroup>
		</Container>
	)
}

export default Main
