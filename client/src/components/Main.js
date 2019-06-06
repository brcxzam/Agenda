import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import TranslateRounded from '@material-ui/icons/TranslateRounded'
import AccessAlarm from '@material-ui/icons/AccessAlarm'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(1, 2),
		marginTop: 15,
		marginBottom: 15,
	},
	elemnt: {
		backgroundColor: theme.palette.secondary.light,
	},
}))

function Main() {
	const classes = useStyles()
	const [icons] = useState([
		<TranslateRounded key="0" />,
		<AccessAlarm key="1" />,
	])
	const [lol] = useState(0)
	return (
		<Container maxWidth="lg">
			<Grid container spacing={10}>
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Calificaciónes
						</Typography>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Calificaciónes
						</Typography>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Calificaciónes
						</Typography>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Calificaciónes
						</Typography>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Calificaciónes
						</Typography>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Calificaciónes
						</Typography>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Calificaciónes
						</Typography>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Calificaciónes
						</Typography>
						<Typography
							variant="subtitle1"
							component="h3"
							color="secondary">
							Calificaciónes
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						<Typography
							variant="h6"
							component="h3"
							color="secondary"
							className={classes.prueba}
							align="center">
							Horario
						</Typography>
						<Paper>
							<Grid container className={classes.elemnt}>
								<Grid item xs={2}>
									{icons[lol]}
								</Grid>
								<Grid item xs={8}>
									<Typography
										variant="h6"
										component="h3"
										color="secondary">
										Materia
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography
										variant="subtitle1"
										component="h3"
										color="secondary">
										78/100
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Main
