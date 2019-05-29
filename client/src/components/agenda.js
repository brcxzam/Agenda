import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Navigation from './navigation'

const useStyles = makeStyles(theme => ({
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
		backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
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
		display: 'flex',
	},
	cardDetails: {
		flex: 1,
	},
	cardMedia: {
		width: 160,
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
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(8),
		padding: theme.spacing(6, 0),
	},
}))

export default function Blog() {
	const classes = useStyles()
	return (
		<React.Fragment>
			<Container maxWidth="lg">
				<Navigation />

				<main>
					<Grid container spacing={5} className={classes.mainGrid}>
						{/* Main content */}
						<Grid item xs={12} md={8}>
							<Typography variant="h6" gutterBottom>
								Buenas Tardes
							</Typography>
							<Divider />
						</Grid>
						{/* End main content */}
						{/* Sidebar */}
						<Grid item xs={12} md={4}>
							<Typography
								variant="h6"
								gutterBottom
								className={classes.sidebarSection}>
								Horario
							</Typography>
							<Paper
								elevation={0}
								className={classes.sidebarAboutBox}>
								<Typography>
									Etiam porta sem malesuada magna mollis
									euismod. Cras mattis consectetur purus sit
									amet fermentum. Aenean lacinia bibendum
									nulla sed consectetur.
								</Typography>
							</Paper>
							<Typography
								variant="h6"
								gutterBottom
								className={classes.sidebarSection}>
								Asignaturas
							</Typography>
							<Paper
								elevation={0}
								className={classes.sidebarAboutBox}>
								<Typography>
									Etiam porta sem malesuada magna mollis
									euismod. Cras mattis consectetur purus sit
									amet fermentum. Aenean lacinia bibendum
									nulla sed consectetur.
								</Typography>
							</Paper>
						</Grid>
						{/* End sidebar */}
					</Grid>
				</main>
			</Container>
		</React.Fragment>
	)
}
