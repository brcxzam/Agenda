import { createMuiTheme } from '@material-ui/core/styles'

// const palette = {
// 	primary: { main: '#02738C' },
// 	secondary: { main: '#04F2F2' },
// 	background: { default: '#0C0C0C', paper: '#212121' },
// 	type: 'dark',
// 	error: { main: '#04F2F2' },
// }
// const themeName = 'Paradiso My Sin Snakes'

export default createMuiTheme({
	palette: {
		common: { black: '#000', white: '#fff' },
		background: {
			paper: 'rgba(33, 33, 33, 1)',
			default: 'rgba(12, 12, 12, 1)',
		},
		primary: {
			light: 'rgba(77, 162, 188, 1)',
			main: 'rgba(2, 115, 140, 1)',
			dark: 'rgba(0, 71, 95, 1)',
			contrastText: 'rgba(242, 242, 242, 1)',
		},
		secondary: {
			light: 'rgba(111, 255, 255, 1)',
			main: 'rgba(4, 242, 242, 1)',
			dark: 'rgba(0, 191, 191, 1)',
			contrastText: 'rgba(0, 0, 0, 1)',
		},
		error: {
			light: 'rgba(107, 255, 255, 1)',
			main: 'rgba(4, 218, 242, 1)',
			dark: 'rgba(0, 168, 191, 1)',
			contrastText: 'rgba(242, 242, 242, 1)',
		},
		text: {
			primary: 'rgba(242, 242, 242, 1)',
			secondary: 'rgba(2, 115, 140, 1)',
			disabled: 'rgba(4, 242, 242, 1)',
			hint: 'rgba(0, 0, 0, 0.38)',
		},
		type: 'dark',
	},
})
