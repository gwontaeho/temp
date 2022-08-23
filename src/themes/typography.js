/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

export default function themeTypography(theme) {
	return {
		fontFamily: `'NanumSquareRound', 'Noto Sans KR', 'Roboto', sans-serif`,
		fontSize: 16,
		// 큰 제목
		h6: {
			fontWeight: 600,
			color: theme.heading,
			fontSize: '1.4rem',
		},
		// 메뉴
		h5: {
			fontSize: '1rem',
			color: theme.heading,
			fontWeight: 500,
		},
		// 섹션 내부 제목
		h4: {
			fontSize: '1.125rem',
			color: theme.heading,
			fontWeight: 500,
		},
		// 미사용
		h3: {
			fontSize: '1.2rem',
			color: theme.heading,
			fontWeight: 500,
		},
		// 페이지 제목
		h2: {
			fontSize: '1.25rem',
			color: theme.heading,
			fontWeight: 500,
			display: 'flex',
			alignItems: 'center',
			marginBottom: '0.65rem',
			'& > svg': {
				marginRight: '8px',
			},
			flexGrow: 1,
			marginTop: '0.4rem',
		},
		// 앱 제목 (임시)
		h1: {
			fontSize: '1.75rem',
			color: theme.heading,
			fontWeight: 700,
		},
		// 소제목
		subtitle1: {
			fontSize: '1rem',
			fontWeight: 500,
			color: theme.textDark,
		},
		// 소제목 하위
		subtitle2: {
			fontSize: '0.95rem',
			fontWeight: 500,
			color: theme.darkText,
		},
		caption: {
			fontSize: '0.9rem',
			fontWeight: 500,
		},
		// 안내문구
		notice: {
			fontFamily: 'NanumSquareRound',
			fontSize: '1rem',
			fontWeight: 500,
			color: theme.colors?.grey700,
		},
		body1: {
			fontFamily: 'Noto Sans KR',
			fontSize: '1rem',
			fontWeight: 400,
			lineHeight: '1.334em',
		},
		body2: {
			fontFamily: 'Noto Sans KR',
			letterSpacing: '0em',
			fontWeight: 400,
			lineHeight: '1.5em',
			color: theme.darkTextPrimary,
		},
		button: {
			textTransform: 'capitalize',
		},
		customInput: {
			marginTop: 1,
			// marginBottom: 1,
			'& > label': {
				top: 23,
				left: 0,
				color: theme.grey500,
				'&[data-shrink="false"]': {
					top: 5,
				},
			},
			'& > div > input': {
				padding: '30.5px 14px 11.5px !important',
			},
			'& legend': {
				display: 'none',
			},
			'& fieldset': {
				top: 0,
			},
		},
		customTextField: {
			marginTop: 1,
			marginBottom: 1,
			'& > .MuiInput-root': {
				padding: '0.4rem',
			},
			'& .MuiInputAdornment-root': {
				padding: '0 0.4rem',
			},
			'& > .MuiInputLabel-shrink': {
				display: 'none',
			},
		},
		mainContent: {
			backgroundColor: theme.page,
			width: '100%',
			minHeight: 'calc(100vh - 88px)',
			flexGrow: 1,
			padding: '20px 30px',
			marginTop: '70px',
			marginRight: '20px',
			borderRadius: `32px`,
		},
		menuCaption: {
			fontSize: '0.95rem',
			fontWeight: 600,
			color: theme.heading,
			padding: '6px',
			textTransform: 'capitalize',
			marginTop: '14px',
			marginBottom: '-4px',
		},
		subMenuCaption: {
			fontSize: '0.9rem',
			fontWeight: 500,
			color: theme.darkTextSecondary,
			textTransform: 'capitalize',
		},
		commonAvatar: {
			cursor: 'pointer',
			borderRadius: '8px',
		},
		smallAvatar: {
			width: '20px',
			height: '20px',
			fontSize: '1.2rem',
		},
		mediumAvatar: {
			width: '30px',
			height: '30px',
			fontSize: '2rem',
		},
		largeAvatar: {
			width: '52px',
			height: '52px',
			fontSize: '2.6rem',
		},
	};
}
