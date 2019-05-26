import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import AppBar from '@material-ui/core/AppBar'

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: 'auto',
	},
	image: {
		width: 950,
		height: 500,
	},
	image1: {
		width: 410,
		height: 250,
	},
	image2: {
		width: 250,
		height: 250,
	},
	image3: {
		width: 800,
		height: 500,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '95%',
		maxHeight: '95%',
	},
})

function ComplexGrid(props) {
	const { classes } = props
	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Grid container spacing={2}>
							<Grid item>
								<ButtonBase className={classes.image}>
									<img
										className={classes.img}
										alt="complex"
										src="http://localhost:3001/profile_images/opc1.jpg"
									/>
								</ButtonBase>
							</Grid>
							<Grid item xs={10} sm container>
								<Grid item xs={8}>
									<Typography
										gutterBottom
										variant="headline"
										color="primary"
										align="center">
										<br />
										<br />
										<br />
										<br />
										<br />
										La disponibilidad que tu información
										necesita
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										align="center">
										Creamos un software que te ayudara a ser
										mas eficiente
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Typography
							variant="display1"
							color="primary"
							align="center">
							<br />
							UNA MEJOR MANERA DE ORGANIZAR TUS ACTIVIDADES
						</Typography>
						<Typography
							variant="h6"
							color="textSecondary"
							align="center">
							Con la agenda podras planificar <br />
							tanto tus actividades como el uso de tu tiempo
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Grid container spacing={2}>
							<Grid item>
								<ButtonBase className={classes.image3}>
									<img
										className={classes.img}
										alt="complex"
										src="http://localhost:3001/profile_images/im1.jpg"
									/>
								</ButtonBase>
							</Grid>
							<Grid item xs={10} sm container>
								<Grid item xs={8}>
									<Typography
										variant="title"
										color="primary"
										align="center">
										<br />
										<br />
										Establece tus horarios
									</Typography>
									<Typography
										variant="subtitle1"
										color="default"
										align="center">
										Podras elegir que que días quieres que
										sean habiles
									</Typography>
									<Typography
										variant="title"
										color="primary"
										align="center">
										<br />
										<br />
										Ingresa tus actividades
									</Typography>
									<Typography
										variant="subtitle1"
										color="default"
										align="center">
										Puedes ingresar actividades tanto
										escolares como personales
									</Typography>
									<Typography
										variant="title"
										color="primary"
										align="center">
										<br />
										<br />
										Registra tus calificaciones
									</Typography>
									<Typography
										variant="subtitle1"
										color="default"
										align="center">
										Lleva un control de tus calificaciones
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={5}>
					<Paper className={classes.paper}>
						<Grid container spacing={2}>
							<Grid item>
								<ButtonBase className={classes.image1}>
									<img
										className={classes.img}
										alt="complex"
										src="http://localhost:3001/profile_images/3.PNG"
									/>
								</ButtonBase>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={3}>
					<Paper className={classes.paper}>
						<Grid container spacing={2}>
							<Grid item>
								<ButtonBase className={classes.image2}>
									<img
										className={classes.img}
										alt="complex"
										src="http://localhost:3001/profile_images/2.PNG"
									/>
								</ButtonBase>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper className={classes.paper}>
						<Grid container spacing={2}>
							<Grid item>
								<ButtonBase className={classes.image1}>
									<img
										className={classes.img}
										alt="complex"
										src="http://localhost:3001/profile_images/1.PNG"
									/>
								</ButtonBase>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
			<AppBar position="static">
				<Typography
					variant="subtitle2"
					color="inherit"
					align="center"
					className={classes.grow}>
					Tecnologíco de Estudios Superiores de Chalco
					<br />
					2019
				</Typography>
			</AppBar>
		</div>
	)
}

ComplexGrid.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ComplexGrid)
