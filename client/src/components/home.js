import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React, { useState, useRef, useEffect } from 'react'
import {
	Link as RouterLink,
	Route,
	Switch as SwitchRoute,
} from 'react-router-dom'
import Account from './Account'
import Moment from 'react-moment'
import Preferences from './Preferences'
import Main from './Main'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}))

function Home({ match }) {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const anchorRef = useRef(null)
	const [token] = useState(localStorage.getItem('authToken'))
	const [API] = useState('http://localhost:3001/api')
	const [images] = useState('http://localhost:3001/profile_images/')
	const [{ firstName, profile_image }, setUser] = useState({
		firstName: '',
		profile_image: '',
	})
	const [color, setColor] = useState('')

	useEffect(() => {
		getUser(API, token, images)
		setColor(generateColor)
	}, [API, token, images])

	function handleToggle() {
		setOpen(prevOpen => !prevOpen)
	}

	function handleChangeProfileImage(profile_image) {
		setUser({ firstName, profile_image })
	}

	function handleClose(event) {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}

		setOpen(false)
	}

	function handleLogOut() {
		setOpen(false)
		localStorage.removeItem('authToken')
	}

	function generateColor() {
		return (
			'#' +
			Math.random()
				.toString(16)
				.substr(-6)
		)
	}

	async function getUser(API, token, images) {
		try {
			const query = JSON.stringify({
				query: '{ user { firstName profile_image }}',
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
			const { user } = response.data
			user.profile_image !== 'default.png'
				? (user.profile_image = images + user.profile_image)
				: (user.profile_image = '')
			setUser(user)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Container maxWidth="xl">
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="Menu"
							component={RouterLink}
							to={match.path}>
							<Avatar
								alt="Remy Sharp"
								src="http://localhost:3001/profile_images/default.png"
								className={classes.avatar}
							/>
						</IconButton>
						<Typography
							variant="h6"
							className={classes.title}
							align="center">
							<Moment local format="MMMM YYYY, D" />
						</Typography>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="Menu"
							ref={anchorRef}
							aria-owns={open ? 'menu-list-grow' : undefined}
							aria-haspopup="true"
							onClick={handleToggle}>
							<Avatar
								alt="Remy Sharp"
								src={profile_image}
								style={{ backgroundColor: color }}
								className={classes.avatar}>
								{firstName[0]}
							</Avatar>
						</IconButton>
					</Toolbar>
				</AppBar>
			</div>
			<div className={classes.root}>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					transition
					disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === 'bottom'
										? 'center top'
										: 'center bottom',
							}}>
							<Paper id="menu-list-grow">
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList>
										<MenuItem
											component={RouterLink}
											to={`${match.url}/preferences`}
											onClick={handleClose}>
											Preferencias
										</MenuItem>
										<MenuItem
											component={RouterLink}
											to={`${match.url}/account`}
											onClick={handleClose}>
											Mi Cuenta
										</MenuItem>
										<MenuItem
											component={RouterLink}
											to="/"
											onClick={handleLogOut}>
											Cerrar Sesión
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
			<SwitchRoute>
				<Route
					path={`${match.path}/account`}
					render={() => (
						<Account
							onChangeProfileImage={handleChangeProfileImage}
						/>
					)}
				/>
				<Route
					path={`${match.path}/preferences`}
					render={() => (
						<Preferences
							onChangeProfileImage={handleChangeProfileImage}
						/>
					)}
				/>
				<Route
					exact
					path={match.path}
					render={() => (
						<Main onChangeProfileImage={handleChangeProfileImage} />
					)}
				/>
			</SwitchRoute>
		</Container>
	)
}

export default Home
