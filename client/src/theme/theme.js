import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
	palette: {
		common: { black: 'rgba(0, 0, 0, 1)', white: 'rgba(255, 255, 255, 1)' },
		background: {
			paper: 'rgba(95, 104, 118, 1)',
			default: 'rgba(53, 62, 74, 1)',
		},
		primary: {
			light: 'rgba(103, 255, 255, 1)',
			main: 'rgba(4, 208, 217, 1)',
			dark: 'rgba(0, 158, 168, 1)',
			contrastText: 'rgba(248, 248, 239, 1)',
		},
		secondary: {
			light: 'rgba(206, 254, 104, 1)',
			main: 'rgba(154, 203, 52, 1)',
			dark: 'rgba(103, 154, 0, 1)',
			contrastText: 'rgba(248, 248, 239, 1)',
		},
		error: {
			light: 'rgba(255, 122, 122, 1)',
			main: 'rgba(247, 68, 78, 1)',
			dark: 'rgba(189, 0, 38, 1)',
			contrastText: '#fff',
		},
		text: {
			primary: 'rgba(251, 248, 239, 1)',
			secondary: 'rgba(251, 248, 239, 1)',
			disabled: 'rgba(251, 248, 239, 1)',
			hint: 'rgba(251, 248, 239, 1)',
		},
		type: 'dark',
	},
})
