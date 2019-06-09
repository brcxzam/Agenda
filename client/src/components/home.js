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
	Redirect,
} from 'react-router-dom'
import Account from './Account'
import Moment from 'react-moment'
import Main from './Main'
import configAPI from './../API'

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
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
}))

function Home({ match }) {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const anchorRef = useRef(null)
	const [token] = useState(localStorage.getItem(configAPI.tokenItem))
	const [API] = useState(configAPI.API)
	const [images] = useState(`${configAPI.staticFiles}/profile_images/`)
	const [{ firstName, profile_image }, setUser] = useState({
		firstName: '',
		profile_image: '',
	})

	useEffect(() => {
		getUser(API, token, images)
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
		localStorage.removeItem(configAPI.tokenItem)
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
								src={`${
									configAPI.staticFiles
								}/profile_images/default.png`}
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
					exact
					path={match.path}
					render={() => (
						<Main onChangeProfileImage={handleChangeProfileImage} />
					)}
				/>
				<Route render={() => <Redirect to={match.path} />} />
			</SwitchRoute>
		</Container>
	)
}

export default Home
