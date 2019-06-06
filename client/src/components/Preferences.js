import MomentUtils from '@date-io/moment'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import AccessAlarm from '@material-ui/icons/AccessAlarm'
import CalendarToday from '@material-ui/icons/CalendarToday'
import School from '@material-ui/icons/School'
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import FormControl from '@material-ui/core/FormControl'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
	root: {
		paddingTop: 75,
	},
	paper: {
		padding: theme.spacing(1, 2),
		marginTop: 15,
		marginBottom: 15,
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
}))

function Preferences() {
	const classes = useStyles()
	const [API] = useState('http://localhost:3001/api')
	const [token] = useState(localStorage.getItem('authToken'))
	const [isOpenMorning, setIsOpenMorning] = useState(false)
	const [isOpenAfternoon, setIsOpenAfternoon] = useState(false)
	const [isOpenNight, setIsOpenNight] = useState(false)
	const [morning, setMorning] = useState(new Date())
	const [afternoon, setAfternoon] = useState(new Date())
	const [night, setNight] = useState(new Date())
	const [openDays, setOpenDays] = useState(false)
	const [openAcademicData, setOpenAcademicData] = useState(false)
	const [days, setDays] = useState({
		monday: true,
		tuesday: true,
		wednesday: true,
		thursday: true,
		friday: true,
		saturday: true,
		sunday: true,
	})

	useEffect(() => {
		getDays(API, token)
		getAcademicData(API, token)
		getNotifications(API, token)
	}, [API, token])

	const [open, setOpen] = React.useState(false)

	function handleClose(event, reason) {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	/**
	 * Days
	 */

	function handleClickOpenDays() {
		setOpenDays(true)
	}

	function handleCloseDays() {
		setOpenDays(false)
	}

	const handleChange = name => event => {
		setDays({ ...days, [name]: event.target.checked })
	}

	async function getDays(API, token) {
		try {
			const query = JSON.stringify({
				query:
					'{ days { monday tuesday wednesday thursday friday saturday sunday } }',
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
			const { days } = response.data
			setDays(days)
		} catch (error) {
			console.error(error)
		}
	}

	async function handleDays() {
		try {
			const query = JSON.stringify({
				query: 'mutation($data: iDays){ uDays(data: $data) }',
				variables: {
					data: days,
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
			const { uDays } = response.data
			if (uDays === 'done') {
				setOpenDays(false)
			}
		} catch (error) {
			console.error(error)
		}
	}

	/**
	 * Academic Data
	 */

	const [academicData, setAcademicData] = useState({
		maximum: 100,
		aproving: 70,
		partials: 4,
		percentages: [
			{
				partial: 1,
				percent: 20,
			},
		],
	})
	const [helperTextPartials, setHelperTextPartials] = useState({
		error: false,
		text: '',
	})
	const [helperTextPercent, setHelperTextPercent] = useState({
		error: false,
		text: '',
	})
	const [message, setMessage] = useState('')

	function handleClickOpenAcademicData() {
		setOpenAcademicData(true)
	}

	function handleCloseAcademicData() {
		// getAcademicData(API, token)
		setOpenAcademicData(false)
	}

	async function getAcademicData(API, token) {
		try {
			const query = JSON.stringify({
				query:
					'{ academicData { partials maximum aproving percentages { partial percent } } }',
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
			const { academicData } = response.data
			setAcademicData(academicData)
		} catch (error) {
			console.error(error)
		}
	}

	function handlePercentages(event) {
		let numberPartial = event.target.value
		if (numberPartial) {
			numberPartial = parseInt(numberPartial, 10)
		} else {
			numberPartial = ''
		}
		const { percentages } = academicData
		const size = percentages.length
		setAcademicData({
			partials: numberPartial,
			maximum: academicData.maximum,
			aproving: academicData.aproving,
			percentages: academicData.percentages,
		})
		if (numberPartial && numberPartial <= 6 && numberPartial > 0) {
			setHelperTextPartials({ error: false, text: '' })
			if (size > numberPartial) {
				const loops = size - numberPartial
				for (let index = 0; index < loops; index++) {
					percentages.pop()
				}
			} else if (size < numberPartial) {
				const loops = numberPartial - size
				let key = 1
				if (size !== 0) {
					key = percentages[size - 1].partial + 1
				}
				for (let index = 0; index < loops; index++) {
					percentages.push({
						partial: key++,
						percent: 20,
					})
				}
			}
		} else {
			setHelperTextPartials({
				error: true,
				text: '1 es el mínimo y 6 es el máximo de parciales',
			})
		}
	}

	function handlePercent(event) {
		const percent = academicData.percentages.slice()
		let value = event.target.value
		if (value) {
			value = parseInt(value, 10)
		} else {
			value = ''
		}
		percent[event.target.id - 1].percent = value
		setAcademicData({
			partials: academicData.partials,
			maximum: academicData.maximum,
			aproving: academicData.aproving,
			percentages: academicData.percentages,
		})
	}

	useEffect(() => {
		setHelperTextPercent({
			error: false,
			text: '',
		})
		let total = 0
		academicData.percentages.forEach(percent => {
			total += percent.percent
		})
		if (total !== 100) {
			setHelperTextPercent({
				error: true,
				text: 'La suma de porcentajes debe ser igual a 100',
			})
		}
	}, [academicData])

	async function handleSubmitAcademicData(event) {
		event.preventDefault()
		if (!helperTextPercent.error) {
			try {
				const query = JSON.stringify({
					query:
						'mutation($data: iAcademicData){ uAcademicData(data: $data) }',
					variables: {
						data: academicData,
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
				const { uAcademicData } = response.data
				if (uAcademicData === 'done') {
					setOpen(true)
					setMessage('Guardado')
				} else {
					console.log(response)
				}
			} catch (error) {
				console.error(error)
			}
		} else {
			setOpen(true)
			setMessage('Porcentajes Invalidos')
		}
	}

	/**
	 * Notifications
	 */

	async function getNotifications(API, token) {
		try {
			const query = JSON.stringify({
				query: '{ notifications { morning afternoon night } }',
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
			setMorning(
				moment(
					response.data.notifications.morning,
					moment.HTML5_FMT.TIME_SECONDS
				)
			)
			setAfternoon(
				moment(
					response.data.notifications.afternoon,
					moment.HTML5_FMT.TIME_SECONDS
				)
			)
			setNight(
				moment(
					response.data.notifications.night,
					moment.HTML5_FMT.TIME_SECONDS
				)
			)
		} catch (error) {
			console.error(error)
		}
	}

	async function setNotifications(data) {
		try {
			const query = JSON.stringify({
				query:
					'mutation($data: iNotifications){ uNotifications(data: $data) }',
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
			const { uNotifications } = response.data
			if (uNotifications !== 'done') {
				/**
				 * TODO: Mensaje de error
				 */
				console.log(response)
			}
		} catch (error) {
			console.error(error)
		}
	}

	function handleMorning() {
		const morningTime = moment(morning).format('HH:mm')
		setNotifications({ morning: morningTime })
	}

	function handleAfternoon() {
		const afternoonTime = moment(afternoon).format('HH:mm')
		setNotifications({ afternoon: afternoonTime })
	}

	function handleNight() {
		const nightTime = moment(night).format('HH:mm')
		setNotifications({ night: nightTime })
	}

	return (
		<Container maxWidth="sm" className={classes.root}>
			<Typography variant="h5" component="h3" color="secondary">
				Generales
			</Typography>
			<Paper
				className={classes.paper}
				onClick={handleClickOpenAcademicData}
				style={{ cursor: 'pointer' }}>
				<Grid container>
					<Grid item xs={2}>
						<School />
					</Grid>
					<Grid item xs={10}>
						<Typography variant="h5" component="h3" align="left">
							Datos Académicos
						</Typography>
					</Grid>
				</Grid>
			</Paper>
			<Paper
				className={classes.paper}
				onClick={handleClickOpenDays}
				style={{ cursor: 'pointer' }}>
				<Grid container>
					<Grid item xs={2}>
						<CalendarToday />
					</Grid>
					<Grid item xs={10}>
						<Typography variant="h5" component="h3" align="left">
							Días Activos
						</Typography>
					</Grid>
				</Grid>
			</Paper>
			<Typography variant="h5" component="h3" color="secondary">
				Notificaciones
			</Typography>
			<Paper className={classes.paper}>
				<Grid container>
					<Grid item xs={2}>
						<AccessAlarm />
					</Grid>
					<Grid item xs={7}>
						<Typography variant="h5" component="h3" align="left">
							Mañana
						</Typography>
					</Grid>
					<Grid
						item
						xs={3}
						onClick={() => setIsOpenMorning(true)}
						style={{ cursor: 'pointer' }}>
						<Typography
							variant="h6"
							component="h3"
							align="right"
							color="textSecondary"
							className={classes.time}>
							<Moment format="hh:mm A">{morning}</Moment>
						</Typography>
					</Grid>
				</Grid>
			</Paper>
			<Paper className={classes.paper}>
				<Grid container>
					<Grid item xs={2}>
						<AccessAlarm />
					</Grid>
					<Grid item xs={7}>
						<Typography variant="h5" component="h3" align="left">
							Tarde
						</Typography>
					</Grid>
					<Grid
						item
						xs={3}
						onClick={() => setIsOpenAfternoon(true)}
						style={{ cursor: 'pointer' }}>
						<Typography
							variant="h6"
							component="h3"
							align="right"
							color="textSecondary"
							className={classes.time}>
							<Moment format="hh:mm A">{afternoon}</Moment>
						</Typography>
					</Grid>
				</Grid>
			</Paper>
			<Paper className={classes.paper}>
				<Grid container>
					<Grid item xs={2}>
						<AccessAlarm />
					</Grid>
					<Grid item xs={7}>
						<Typography variant="h5" component="h3" align="left">
							Noche
						</Typography>
					</Grid>
					<Grid
						item
						xs={3}
						onClick={() => setIsOpenNight(true)}
						style={{ cursor: 'pointer' }}>
						<Typography
							variant="h6"
							component="h3"
							align="right"
							color="textSecondary"
							className={classes.time}>
							<Moment format="hh:mm A">{night}</Moment>
						</Typography>
					</Grid>
				</Grid>
			</Paper>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<TimePicker
					open={isOpenMorning}
					onOpen={() => setIsOpenMorning(true)}
					onClose={() => setIsOpenMorning(false)}
					value={morning}
					onChange={setMorning}
					style={{ display: 'none' }}
					onAccept={handleMorning}
				/>
				<TimePicker
					open={isOpenAfternoon}
					onOpen={() => setIsOpenAfternoon(true)}
					onClose={() => setIsOpenAfternoon(false)}
					value={afternoon}
					onChange={setAfternoon}
					style={{ display: 'none' }}
					onAccept={handleAfternoon}
				/>
				<TimePicker
					open={isOpenNight}
					onOpen={() => setIsOpenNight(true)}
					onClose={() => setIsOpenNight(false)}
					value={night}
					onChange={setNight}
					style={{ display: 'none' }}
					onAccept={handleNight}
				/>
			</MuiPickersUtilsProvider>
			{/**
			 * Dialogo de días activos
			 */}
			<Dialog
				open={openDays}
				onClose={handleCloseDays}
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Días Activos</DialogTitle>
				<DialogContent>
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									checked={days.monday}
									onChange={handleChange('monday')}
									value="monday"
								/>
							}
							label="Lunes"
						/>
						<FormControlLabel
							control={
								<Switch
									checked={days.tuesday}
									onChange={handleChange('tuesday')}
									value="tuesday"
								/>
							}
							label="Martes"
						/>
						<FormControlLabel
							control={
								<Switch
									checked={days.wednesday}
									onChange={handleChange('wednesday')}
									value="wednesday"
								/>
							}
							label="Miercoles"
						/>
						<FormControlLabel
							control={
								<Switch
									checked={days.thursday}
									onChange={handleChange('thursday')}
									value="thursday"
								/>
							}
							label="Jueves"
						/>
						<FormControlLabel
							control={
								<Switch
									checked={days.friday}
									onChange={handleChange('friday')}
									value="friday"
								/>
							}
							label="Viernes"
						/>
						<FormControlLabel
							control={
								<Switch
									checked={days.saturday}
									onChange={handleChange('saturday')}
									value="saturday"
								/>
							}
							label="Sabado"
						/>
						<FormControlLabel
							control={
								<Switch
									checked={days.sunday}
									onChange={handleChange('sunday')}
									value="sunday"
								/>
							}
							label="Domingo"
						/>
					</FormGroup>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDays} color="primary">
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
			{/**
			 * Dialogo de datos académicos
			 */}
			<Dialog
				scroll="paper"
				fullWidth
				maxWidth="xs"
				open={openAcademicData}
				onClose={handleCloseAcademicData}
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Días Activos</DialogTitle>
				<FormControl
					component="form"
					onSubmit={handleSubmitAcademicData}
					fullWidth>
					<DialogContent>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Calificaciónes
						</Typography>
						<TextField
							id="maximum"
							label="Máxima"
							type="text"
							name="maximum"
							margin="normal"
							variant="outlined"
							value={academicData.maximum}
							fullWidth
						/>
						<TextField
							id="aproving"
							label="Aprobatoria"
							type="text"
							name="aproving"
							margin="normal"
							variant="outlined"
							value={academicData.aproving}
							fullWidth
						/>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Parciales
						</Typography>
						<TextField
							id="partials"
							label="Cantidad de parciales"
							type="number"
							name="partials"
							margin="normal"
							variant="outlined"
							error={helperTextPartials.error}
							helperText={helperTextPartials.text}
							value={academicData.partials}
							onChange={handlePercentages}
							fullWidth
						/>
						{academicData.percentages.map(percentages => (
							<TextField
								key={percentages.partial}
								id={`${percentages.partial}`}
								label={`Parcial ${percentages.partial}`}
								type="number"
								error={helperTextPercent.error}
								helperText={helperTextPercent.text}
								onChange={handlePercent}
								value={percentages.percent}
								margin="normal"
								variant="outlined"
								fullWidth
							/>
						))}
					</DialogContent>
					<DialogActions>
						<Button
							type="submit"
							onClick={handleCloseAcademicData}
							color="primary">
							Aceptar
						</Button>
					</DialogActions>
				</FormControl>
			</Dialog>
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
				message={<span id="message-id">{message}</span>}
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

export default Preferences
