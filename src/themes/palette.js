/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
	return {
		mode: theme?.customization?.navType,
		common: {
			black: theme.colors?.darkPaper,
		},
		primary: {
			light: theme.colors?.primaryLight,
			main: theme.colors?.primaryMain,
			dark: theme.colors?.primaryDark,
			100: theme.colors?.primary100,
			200: theme.colors?.primary200,
			300: theme.colors?.primary300,
			400: theme.colors?.primary400,
			800: theme.colors?.primary800,
		},
		secondary: {
			light: theme.colors?.secondaryLight,
			main: theme.colors?.secondaryMain,
			dark: theme.colors?.secondaryDark,
			200: theme.colors?.secondary200,
			800: theme.colors?.secondary800,
		},
		error: {
			light: theme.colors?.errorLight,
			main: theme.colors?.errorMain,
			dark: theme.colors?.errorDark,
			100: theme.colors?.error100,
		},
		orange: {
			light: theme.colors?.orangeLight,
			main: theme.colors?.orangeMain,
			dark: theme.colors?.orangeDark,
		},
		warning: {
			light: theme.colors?.warningLight,
			main: theme.colors?.warningMain,
			dark: theme.colors?.warningDark,
		},
		success: {
			light: theme.colors?.successLight,
			200: theme.colors?.success200,
			main: theme.colors?.successMain,
			dark: theme.colors?.successDark,
		},
		grey: {
			50: theme.colors?.grey50,
			100: theme.colors?.grey100,
			500: theme.colors?.grey500,
			600: theme.colors?.grey600,
			700: theme.colors?.grey700,
			800: theme.colors?.grey800,
			900: theme.colors?.grey900,
		},
		dark: {
			light: theme.colors?.darkTextPrimary,
			main: theme.colors?.darkLevel1,
			dark: theme.colors?.darkLevel2,
			800: theme.colors?.darkBackground,
			900: theme.colors?.darkPaper,
		},
		text: {
			primary: theme.darkTextPrimary,
			secondary: theme.darkTextSecondary,
			dark: theme.textDark,
			hint: theme.colors?.grey700,
		},
		background: {
			paper: theme.paper,
			page: theme.page,
			default: theme.backgroundDefault,
			line: theme.colors?.line,
		},
		chart: {
			main1: theme.colors?.chartMain1,
			main2: theme.colors?.chartMain2,
			main3: theme.colors?.chartMain3,
			main4: theme.colors?.chartMain4,
			light1: theme.colors?.chartLight1,
			light2: theme.colors?.chartLight2,
			light3: theme.colors?.chartLight3,
			light4: theme.colors?.chartLight4,
		},
	};
}
