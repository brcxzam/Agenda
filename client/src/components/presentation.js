import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const tutorialSteps = [
	{
		label: 'Disponible en diferentes dispositivos ',
		imgPath: 'http://localhost:3001/img/sistema.png',
		content:
			'Acceda desde su dispositivo móvil, portátil o computadora de escritorio.',
	},
	{
		label: 'Establezca su horario',
		imgPath: 'http://localhost:3001/img/img2.jpg',
		content:
			'OwlTime ayuda a las personas ocupadas como usted a concentrarse en lo que es importante',
	},
	{
		label: 'Ingrese sus actividades tanto academicas como personales',
		imgPath: 'http://localhost:3001/img/img5.jpg',
		content:
			'No deje que sus tareas u actividades lo abrumen, registrelas en una aplicación fácil de usar',
	},
	{
		label: 'Registre sus materias',
		imgPath: 'http://localhost:3001/img/img4.jpg',
		content:
			'Tenga un mayor control de sus actividades escolares, ademas puedes personalizar cada una.',
	},
	{
		label: 'Ingrese sus calificaciones',
		imgPath: 'http://localhost:3001/img/img3.jpg',
		content:
			'Nunca mas tendra que preocuparse por obtener sus calificaciones finales por que owlTime lo hace por usted',
	},
]

const tileData = [
	{
		img: 'http://localhost:3001/img/principal.png',
		title: 'Pagina Principal',
		featured: true,
	},
	{
		img: 'http://localhost:3001/img/Asignaturas2.png',
		title: 'Mostrar asignaturas',
		featured: false,
	},
	{
		img: 'http://localhost:3001/img/calificacion.png',
		title: 'Ingresar calificaciones',
		featured: false,
	},
	{
		img: 'http://localhost:3001/img/horario2.png',
		title: 'Establecer su horario',
		featured: true,
	},
	{
		img: 'http://localhost:3001/img/Mesa de trabajo – 1.png',
		title: 'Asignar un icono',
		featured: false,
	},
	{
		img: 'http://localhost:3001/img/Mesa de trabajo – 3.png',
		title: 'Establecer un color',
		featured: false,
	},
]

const useStyles = makeStyles(theme => ({
	mainFeaturedPost: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
		backgroundImage: 'url(http://localhost:3001/img/work.jpg)',
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
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(3),
		// color: 'white',
		padding: '0 50px',

		// background: 'linear-gradient(45deg, #3D45BA 30%, #2196F3 90%)',
		// border: 0,
		// borderRadius: 3,
		// boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	},
	gridList: {
		maxHeight: 430,
		maxWidth: 650,
		transform: 'translateZ(0)',
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
		maxWidth: 380,
		Height: 300,
	},
	bigAvatar: {
		margin: 10,
		width: 130,
		height: 130,
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

				<Grid item xs={12} md={12} align="center">
					<Typography variant="h5" align="center" color="primary">
						¡Planificar tu dia es cuestión de segundos!
					</Typography>
				</Grid>
				<br />
				<Grid container spacing={2}>
					<Grid item xs={12} sm={7}>
						<GridList className={classes.gridList}>
							{tileData.map(tile => (
								<GridListTile
									key={tile.img}
									cols={tile.featured ? 2 : 1}
									rows={tile.featured ? 2 : 1}>
									<img src={tile.img} alt={tile.title} />
									<GridListTileBar
										title={tile.title}
										titlePosition="top"
										actionIcon={
											<IconButton
												aria-label={`star ${
													tile.title
												}`}
												className={classes.icon}>
												<StarBorderIcon />
											</IconButton>
										}
										actionPosition="left"
										className={classes.titleBar}
									/>
								</GridListTile>
							))}
						</GridList>
					</Grid>
					<Grid item xs={12} sm={1} />
					<Grid item xs={12} sm={4}>
						<Grid item xs={12} md={10} align="center">
							<Typography
								variant="h5"
								align="center"
								color="secondary">
								Organiza cualquier cosa en cualquier lugar y a
								cualquier hora
							</Typography>
							<br />
							<Typography align="center">
								Donde sea que esté, lleve su lista de tareas con
								usted, ya que sus tareas se sincronizan
								automáticamente en todos sus dispositivos, lo
								que le brinda el máximo control, haciendo que su
								lista de tareas esté accesible en todas partes.
							</Typography>
							<Avatar
								alt="Icon"
								src="http://localhost:3001/profile_images/default.png"
								className={classes.bigAvatar}
							/>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card className={classes.card}>
							<CardMedia
								component="img"
								height="200"
								image="http://localhost:3001/img/evento2.jpg"
								title="Crear evento"
							/>
							<CardContent>
								<Typography variant="h6" component="h2">
									Crear un evento
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p">
									Agregue recordatorios unicos, diarios,
									semanalmente, mensualmente o anualmente.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card className={classes.card}>
							<CardMedia
								component="img"
								height="200"
								image="http://localhost:3001/img/work.jpg"
								title="Datos academicos"
							/>
							<CardContent>
								<Typography variant="h6" component="h2">
									Ingresar datos academicos
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p">
									Determina la calificacion maxima, la
									aprobatoria, asi como la cantidad de
									parciales
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Card className={classes.card}>
							<CardMedia
								component="img"
								height="200"
								image="http://localhost:3001/img/evento1.jpg"
								title="Preferenciass"
							/>
							<CardContent>
								<Typography variant="h6" component="h2">
									Modificar preferencias
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p">
									Configura cada una de las preferencias a tu
									manera, personalizando cada una de ellas.
								</Typography>
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
