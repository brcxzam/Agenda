import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import configAPI from '../API'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const tutorialSteps = [
	{
		label: 'Disponible en diferentes dispositivos ',
		imgPath: `${configAPI.staticFiles}/img/sistema.png`,
		content:
			'Acceda desde su dispositivo móvil, portátil o computadora de escritorio.',
	},
	{
		label: 'Ingrese sus actividades tanto academicas como personales',
		imgPath: `${configAPI.staticFiles}/img/img5.jpg`,
		content:
			'No deje que sus tareas u actividades lo abrumen, registrelas en una aplicación fácil de usar',
	},
	{
		label: 'Registre sus materias',
		imgPath: `${configAPI.staticFiles}/img/img4.jpg`,
		content:
			'OwlTime ayuda a las personas ocupadas como usted a concentrarse en lo que es importante',
	},
	{
		label: 'Ingrese sus calificaciones',
		imgPath: `${configAPI.staticFiles}/img/img3.jpg`,
		content:
			'Nunca mas tendra que preocuparse por obtener sus calificaciones finales de cada materia, por que owlTime lo hace por usted',
	},
]

const useStyles = makeStyles(theme => ({
	mainFeaturedPost: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
		backgroundImage: `url(${configAPI.staticFiles}/img/work.jpg)`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		height: 400,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,.3)',
	},
	mainFeaturedPostContent: {
		position: 'relative',
		padding: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	},
	footer: {
		marginTop: theme.spacing(3),
		color: 'white',
		padding: theme.spacing(2, 1),
		backgroundColor: '#0f1822',
	},
	titleBar: {
		background:
			'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
			'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	icon: {
		color: 'white',
	},
	card: {
		maxWidth: 600,
		Height: 300,
	},
	bigAvatar: {
		margin: 10,
		width: 130,
		height: 130,
	},
	paper: {
		padding: theme.spacing(2, 1),
		margin: 10,
	},
}))

function SwipeableTextMobileStepper() {
	const classes = useStyles()
	return (
		<React.Fragment>
			<br />
			<main>
				<Grid item xs={12}>
					<AutoPlaySwipeableViews>
						{tutorialSteps.map((step, index) => (
							<div key={step.label}>
								<Paper
									className={classes.mainFeaturedPost}
									style={{
										backgroundImage: `url(${step.imgPath})`,
									}}>
									<div className={classes.overlay} />
									<Grid container>
										<Grid item xs={5}>
											<div
												className={
													classes.mainFeaturedPostContent
												}>
												<Typography
													variant="h3"
													color="inherit"
													gutterBottom>
													{step.label}
												</Typography>
												<Typography
													variant="h6"
													color="inherit"
													gutterBottom>
													{step.content}
												</Typography>
											</div>
										</Grid>
									</Grid>
								</Paper>
							</div>
						))}
					</AutoPlaySwipeableViews>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12} align="center">
						<Paper elevation={0} className={classes.paper}>
							<Grid item xs={12} md={12}>
								<Typography
									variant="h5"
									align="center"
									color="secondary">
									Organiza cualquier cosa en cualquier lugar y
									a cualquier hora
								</Typography>
								<br />
								<Typography align="center">
									Donde sea que esté, lleve su lista de tareas
									con usted, ya que sus tareas se sincronizan
									automáticamente en todos sus dispositivos,
									lo que le brinda el máximo control, haciendo
									que su lista de tareas esté accesible en
									todas partes.
								</Typography>
								<Grid item xs={12} md={12} align="center">
									<Avatar
										alt="Icon"
										src={`${
											configAPI.staticFiles
										}/profile_images/default.png`}
										className={classes.bigAvatar}
									/>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12} md={12} align="center">
						<Typography variant="h5" align="center" color="primary">
							¡Planificar tu dia es cuestión de segundos!
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card className={classes.card}>
							<CardMedia
								component="img"
								height="200"
								image={`${
									configAPI.staticFiles
								}/img/evento1.jpg`}
								title="Preferenciass"
							/>
							<CardContent>
								<Typography variant="h6" component="h2">
									Registre una materia
								</Typography>
								{/* <Typography
									variant="body2"
									color="textSecondary"
									component="p">
									Registre cada una de ellas, para tener una
									mayor organización y descripción de sus
									actividades.
								</Typography> */}
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card className={classes.card}>
							<CardMedia
								component="img"
								height="200"
								image={`${
									configAPI.staticFiles
								}/img/evento2.jpg`}
								title="Crear evento"
							/>
							<CardContent>
								<Typography variant="h6" component="h2">
									Cree un evento
								</Typography>
								{/* <Typography
									variant="body2"
									color="textSecondary"
									component="p">
									Agregue recordatorios unicos, diarios,
									semanalmente, mensualmente o anualmente.
								</Typography> */}
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card className={classes.card}>
							<CardMedia
								component="img"
								height="200"
								image={`${configAPI.staticFiles}/img/work.jpg`}
								title="Datos academicos"
							/>
							<CardContent>
								<Typography variant="h6" component="h2">
									Introduzca sus calificaciones
								</Typography>
								{/* <Typography
									variant="body2"
									color="textSecondary"
									component="p">
									Determina la calificacion maxima, la
									aprobatoria, asi como la cantidad de
									parciales
								</Typography> */}
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</main>

			<footer className={classes.footer}>
				<Typography variant="subtitle2" align="center">
					Proyecto Integrador
					<br /> 2019
				</Typography>
			</footer>
		</React.Fragment>
	)
}

export default SwipeableTextMobileStepper
