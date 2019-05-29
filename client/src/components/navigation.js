import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Redirect } from 'react-router-dom'

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
	const [redirect, setRedirect] = React.useState(false)
	const [{ firstName, lastName }, setUser] = React.useState({
		firstName: '',
		lastName: '',
	})
	const [token] = React.useState(localStorage.getItem('authToken'))
	const classes = useStyles()

	function exit() {
		localStorage.removeItem('authToken')
		setRedirect(true)
	}

	React.useEffect(() => {
		getUser(token)
		getEvents(token)
	}, [token])

	async function getUser(token) {
		try {
			const query = {
				query: '{ user { firstName, lastName} }',
			}
			const res = await fetch('http://localhost:3001/api', {
				method: 'POST',
				body: JSON.stringify(query),
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			})
			const response = await res.json()
			const { user } = response.data
			setUser(user)
		} catch (error) {
			console.error(error)
		}
	}

	async function getEvents(token) {
		try {
			const query = {
				query:
					'{ events{id title date time repeat priority school subject{id} personalization{id} } }',
			}
			const res = await fetch('http://localhost:3001/api', {
				method: 'POST',
				body: JSON.stringify(query),
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			})
			const response = await res.json()
			const { data } = response
			console.log(data)
		} catch (error) {
			console.error(error)
		}
	}
	const [anchorEl, setAnchorEl] = React.useState(null)
	function handleClick(event) {
		setAnchorEl(event.currentTarget)
	}

	function handleClose() {
		setAnchorEl(null)
	}

	return (
		<Toolbar className={classes.toolbar}>
			{redirect === true && <Redirect to="/" />}
			<Typography
				component="h2"
				variant="h5"
				color="inherit"
				align="center"
				noWrap>
				{firstName} {lastName && lastName}
			</Typography>
			<Typography
				component="h2"
				variant="h5"
				color="inherit"
				align="center"
				noWrap
				className={classes.toolbarTitle}>
				OwlTIME
			</Typography>
			<Button
				variant="outlined"
				size="small"
				aria-owns={anchorEl ? 'simple-menu' : undefined}
				aria-haspopup="true"
				onClick={handleClick}>
				Cuenta
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={handleClose}>Preferencias</MenuItem>
				<MenuItem onClick={handleClose}>Mi Cuenta</MenuItem>
				<MenuItem onClick={exit}>Cerrar Sesión</MenuItem>
			</Menu>
		</Toolbar>
	)
}
