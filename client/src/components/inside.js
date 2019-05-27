import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}))

function ButtonAppBar() {
	const [redirect, setRedirect] = React.useState(false)
	const classes = useStyles()

	function exit() {
		localStorage.removeItem('authToken')
		setRedirect(true)
	}
	return (
		<div className={classes.root}>
			{redirect === true && <Redirect to="/" />}
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						News
					</Typography>
					<Button color="inherit" onClick={exit}>
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default ButtonAppBar
