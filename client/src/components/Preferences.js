import MomentUtils from '@date-io/moment'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import AccessAlarm from '@material-ui/icons/AccessAlarm'
import CalendarToday from '@material-ui/icons/CalendarToday'
import School from '@material-ui/icons/School'
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'

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

function Preferences(props) {
	const classes = useStyles()
	const [isOpen, setIsOpen] = useState(false)
	const [night, setNight] = useState(new Date())

	useEffect(() => {
		console.log(night)
	})

	return (
		<Container maxWidth="sm" className={classes.root}>
			<Typography variant="h5" component="h3" color="secondary">
				Generales
			</Typography>
			<Paper className={classes.paper}>
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
			<Paper className={classes.paper}>
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
					<Grid item xs={3}>
						<Typography
							variant="h6"
							component="h3"
							align="right"
							color="textSecondary"
							className={classes.time}>
							08:00 AM
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
					<Grid item xs={3}>
						<Typography
							variant="h6"
							component="h3"
							align="right"
							color="textSecondary"
							className={classes.time}>
							02:00 PM
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
						onClick={() => setIsOpen(true)}
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
					open={isOpen}
					onOpen={() => setIsOpen(true)}
					onClose={() => setIsOpen(false)}
					value={night}
					onChange={setNight}
					style={{ display: 'none' }}
				/>
			</MuiPickersUtilsProvider>
		</Container>
	)
}

export default Preferences
