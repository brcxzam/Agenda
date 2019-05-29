import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const tutorialSteps = [
	{
		label: 'Disponible en diferentes dispositivos ',
		imgPath: 'http://localhost:3001/img/sistema.png',
	},
	{
		label: 'Establezca su horario',
		imgPath: 'http://localhost:3001/img/img2.jpg',
	},
	{
		label: 'Ingrese sus actividades tanto academicas como personales',
		imgPath: 'http://localhost:3001/img/img5.jpg',
	},
	{
		label: 'Registre sus materias',
		imgPath: 'http://localhost:3001/img/img4.jpg',
	},
	{
		label: 'Ingrese sus calificaciones',
		imgPath: 'http://localhost:3001/img/img3.jpg',
	},
]

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 400,
		flexGrow: 1,
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	img: {
		height: 255,
		display: 'block',
		maxWidth: 400,
		overflow: 'hidden',
		width: '100%',
	},
	toolbar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbarTitle: {
		flex: 1,
	},
	toolbarSecondary: {
		justifyContent: 'space-between',
		overflowX: 'auto',
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0,
	},
	mainFeaturedPost: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
		backgroundImage: 'url(http://localhost:3001/img/work.jpg)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
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
	mainGrid: {
		marginTop: theme.spacing(3),
	},
	card: {
		//display: 200,
		maxWidth: 345,
	},
	cardDetails: {
		flex: 1,
	},
	cardMedia: {
		height: 140,
	},
	markdown: {
		...theme.typography.body2,
		padding: theme.spacing(3, 0),
	},
	sidebarAboutBox: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.grey[200],
	},
	sidebarSection: {
		marginTop: theme.spacing(3),
	},
	footer: {
		//	backgroundColor: theme.palette.background.paper,
		//marginTop: theme.spacing(8),
		//padding: theme.spacing(6, 0),

		background: 'linear-gradient(45deg, #3D45BA 30%, #2196F3 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 40,
		padding: '0 50px',
	},
	media: {
		height: 250,
	},
	fab: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	fab2: {
		margin: theme.spacing(1),
		backgroundColor: '#48C9B0',
	},
}))

function SwipeableTextMobileStepper() {
	const classes = useStyles()
	const theme = useTheme()
	const [activeStep, setActiveStep] = React.useState(0)
	const maxSteps = tutorialSteps.length

	function handleNext() {
		setActiveStep(prevActiveStep => prevActiveStep + 1)
	}

	function handleBack() {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	function handleStepChange(step) {
		setActiveStep(step)
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="lg">
				<br />
				<main>
					<Paper className={classes.mainFeaturedPost}>
						{/* Increase the priority of the hero background image */}
						{
							<img
								style={{ display: 'none' }}
								src="http://localhost:3001/img/sistema.png"
								alt="background"
							/>
						}
						<div className={classes.overlay} />
						<Grid container>
							<Grid item md={5}>
								<div
									className={classes.mainFeaturedPostContent}>
									<Typography
										variant="h3"
										color="inherit"
										gutterBottom>
										La administración que tus actividades
										necesitan
									</Typography>
									<Typography
										variant="h5"
										color="inherit"
										paragraph>
										OwlTime es una agenda escolar capaz de
										evaluar la prioridad de las actividades,
										de una manera interactiva y muy
										intuitiva con el usuario.
									</Typography>
								</div>
							</Grid>
						</Grid>
					</Paper>
					<Grid item xs={12}>
						<Paper
							elevation={0}
							className={classes.sidebarAboutBox}>
							<Typography
								variant="h6"
								align="center"
								gutterBottom>
								¡Organiza cualquier cosa en cualquier lugar y a
								cualquier hora!
							</Typography>
							<Typography align="center">
								Donde sea que esté, lleve su lista de tareas con
								usted. Acceda a OwlTime desde su dispositivo
								móvil, portátil o computadora de escritorio. Sus
								tareas se sincronizan automáticamente en todos
								sus dispositivos, lo que le brinda el máximo
								control, haciendo que su lista de tareas esté
								accesible en todas partes.
							</Typography>
						</Paper>
					</Grid>
					<Grid container spacing={5} className={classes.mainGrid}>
						{/* Main content */}
						<Grid item xs={12} md={8}>
							<Typography
								variant="h6"
								align="center"
								gutterBottom>
								Mantente organizado y facilita tu vida
							</Typography>
							<Divider />
							<Typography
								variant="body1"
								align="justify"
								gutterBottom>
								No deje que sus tareas u actividades lo abrumen,
								registrelas en una aplicación fácil de usar,
								agregando recordatorios para que nunca olvide
								nada. Agregue recordatorios unicos, diarios,
								semanalmente, mensualmente o anualmente.
							</Typography>
							<div align="center">
								<Fab
									color="primary"
									aria-label="Add"
									className={classes.fab}>
									<AddIcon />
								</Fab>
								<Fab aria-label="Edit" className={classes.fab2}>
									<Icon>edit_icon</Icon>
								</Fab>
								<Fab
									color="secondary"
									aria-label="Delete"
									className={classes.fab}>
									<DeleteIcon />
								</Fab>
							</div>
							<br />
							<Paper
								elevation={0}
								className={classes.sidebarAboutBox}>
								<Typography
									variant="h6"
									align="center"
									gutterBottom>
									Recuerda que...
								</Typography>
								<Typography
									variant="body1"
									align="justify"
									gutterBottom>
									OwlTime ayuda a las personas ocupadas como
									usted a concentrarse en lo que es
									importante, ademas de mostrarle
									recordatorios ¡puede registrar sus materias
									y llevar un control de sus calificaciones!
									Nunca mas tendra que preocuparse por obtener
									tus calificaciones finales por que owlTime
									lo hace por usted.
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4}>
							<div className={classes.root}>
								<Paper
									square
									elevation={0}
									className={classes.header}>
									<Typography>
										{tutorialSteps[activeStep].label}
									</Typography>
								</Paper>
								<AutoPlaySwipeableViews
									axis={
										theme.direction === 'rtl'
											? 'x-reverse'
											: 'x'
									}
									index={activeStep}
									onChangeIndex={handleStepChange}
									enableMouseEvents>
									{tutorialSteps.map((step, index) => (
										<div key={step.label}>
											{Math.abs(activeStep - index) <=
											2 ? (
												<img
													className={classes.img}
													src={step.imgPath}
													alt={step.label}
												/>
											) : null}
										</div>
									))}
								</AutoPlaySwipeableViews>
								<MobileStepper
									steps={maxSteps}
									position="static"
									variant="text"
									activeStep={activeStep}
									nextButton={
										<Button
											size="small"
											onClick={handleNext}
											disabled={
												activeStep === maxSteps - 1
											}>
											Next
											{theme.direction === 'rtl' ? (
												<KeyboardArrowLeft />
											) : (
												<KeyboardArrowRight />
											)}
										</Button>
									}
									backButton={
										<Button
											size="small"
											onClick={handleBack}
											disabled={activeStep === 0}>
											{theme.direction === 'rtl' ? (
												<KeyboardArrowRight />
											) : (
												<KeyboardArrowLeft />
											)}
											Back
										</Button>
									}
								/>
							</div>
						</Grid>
						{/* End sidebar */}
					</Grid>
				</main>
			</Container>
			{/* Footer */}
			<br />
			<footer className={classes.footer}>
				<Container maxWidth="xl">
					<Typography variant="subtitle2" align="center">
						Proyecto Integrador
						<br /> 2019
					</Typography>
				</Container>
			</footer>
		</React.Fragment>
	)
}

export default SwipeableTextMobileStepper
