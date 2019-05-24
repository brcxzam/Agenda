import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#4da2bc',
			main: '#02738c',
			dark: '#00475f',
			contrastText: '#fff',
		},
		secondary: {
			light: '#6bffff',
			main: '#04daf2',
			dark: '#00a8bf',
			contrastText: '#000',
		},
	},
	typography: {
		useNextVariants: true,
	},
})

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	bigAvatar: {
		margin: 0,
		width: 200,
		height: 200,
	},
}

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	)
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
}

class ButtonAppBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = { open: false, value: 0, action: 'Acceder' }
	}

	handleClickOpen = () => {
		this.setState({ open: true })
	}

	handleClose = () => {
		this.setState({ open: false })
	}

	handleChange = (event, value) => {
		let action = 'Acceder'
		if (value === 1) {
			action = 'Registrarse'
		}
		this.setState({ value, action })
	}

	render() {
		const { classes } = this.props
		const { value } = this.state
		return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.root}>
					<AppBar position="static">
						<Toolbar>
							<Typography
								variant="h6"
								color="inherit"
								className={classes.grow}>
								INNOMBRABLE
							</Typography>
							<Button
								color="inherit"
								onClick={this.handleClickOpen}>
								Acceder
							</Button>
						</Toolbar>
					</AppBar>
				</div>
				<div>
					<Dialog
						open={this.state.open}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
						fullWidth
						maxWidth="sm">
						<DialogTitle id="form-dialog-title">
							<Paper className={classes.root}>
								<Tabs
									value={this.state.value}
									onChange={this.handleChange}
									indicatorColor="primary"
									textColor="primary"
									centered>
									<Tab label="Acceder" />
									<Tab label="Registrarse" />
								</Tabs>
							</Paper>
						</DialogTitle>
						<DialogContent>
							{value === 0 && (
								<TabContainer>
									<TextField
										id="outlined-email-input"
										label="Email"
										className={classes.textField}
										type="email"
										name="email"
										autoComplete="email"
										margin="normal"
										variant="outlined"
										fullWidth
									/>

									<TextField
										id="outlined-password-input"
										label="Password"
										className={classes.textField}
										type="password"
										autoComplete="current-password"
										margin="normal"
										variant="outlined"
										fullWidth
									/>
								</TabContainer>
							)}
							{value === 1 && (
								<TabContainer>
									<input
										accept="image/*"
										className={classes.input}
										style={{ display: 'none' }}
										id="raised-button-file"
										multiple
										type="file"
									/>

									<Grid
										container
										justify="center"
										alignItems="center">
										<label htmlFor="raised-button-file">
											{/* <Button raised component="span" className={classes.button}>
                      Upload
                    </Button> */}
											<Avatar
												alt="Remy Sharp"
												src="https://png.pngtree.com/svg/20170602/0db185fb9c.png"
												className={classes.bigAvatar}
											/>
										</label>
									</Grid>
									<TextField
										id="outlined-name"
										label="Nombre"
										className={classes.textField}
										margin="normal"
										variant="outlined"
										fullWidth
									/>
									<TextField
										id="outlined-lastname"
										label="Apellido/s"
										className={classes.textField}
										margin="normal"
										variant="outlined"
										fullWidth
									/>
									<TextField
										id="outlined-email-input"
										label="Email"
										className={classes.textField}
										type="email"
										name="email"
										autoComplete="email"
										margin="normal"
										variant="outlined"
										fullWidth
									/>

									<TextField
										id="outlined-password-input"
										label="Password"
										className={classes.textField}
										type="password"
										autoComplete="current-password"
										margin="normal"
										variant="outlined"
										fullWidth
									/>
								</TabContainer>
							)}
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button onClick={this.handleClose} color="primary">
								{this.state.action}
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default withStyles(styles)(ButtonAppBar)
