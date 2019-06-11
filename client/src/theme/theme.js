import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
	primary: { main: '#02738C' },
	secondary: { main: '#04F2F2' },
	background: { default: '#0C0C0C', paper: '#212121' },
	type: 'dark',
	error: { main: '#04F2F2' },
}
const themeName = 'Paradiso My Sin Snakes'

export default createMuiTheme({ palette, themeName })
