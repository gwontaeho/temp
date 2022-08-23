import {
	CheckboxIcon,
	DateIcon,
	PageFisrtIcon,
	PageLastIcon,
	PageNextIcon,
	PagePreviousIcon,
	RadioIcon,
} from '../ui-component/icons/icons';
import fontLoading from './fonts';

export default function componentStyleOverrides(theme) {
	const bgColor = '#FFF';
	return {
		MuiCssBaseline: {
			styleOverrides: fontLoading,
		},
		MuiButton: {
			defaultProps: {
				color: 'inherit',
				variant: 'contained',
				disableElevation: true,
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					borderRadius: '10px',
					minWidth: '3.5rem',
					fontSize: '0.9rem',
					fontWeight: 400,
					padding: '0 0.6rem',
					lineHeight: '1rem',
				},
				sizeSmall: {
					height: '1.6rem',
				},
				sizeMedium: {
					height: '2.2rem',
				},
				sizeLarge: {
					fontSize: '1.125rem',
					height: '3.2rem',
					minWidth: '4rem',
					padding: '0 0.8rem',
					borderRadius: '1rem',
				},
				textSizeLarge: {
					fontSize: '1.05rem',
					fontWeight: 500,
				},
				contained: {
					backgroundColor: theme.colors?.grey700,
					color: '#FFF',
					'&:hover': {
						backgroundColor: theme.colors?.grey700,
					},
				},
				containedPrimary: {
					backgroundColor: theme.colors?.primaryMain,
					'&:hover': {
						backgroundColor: theme.colors?.primaryMain,
					},
				},
			},
		},
		MuiPaper: {
			defaultProps: {
				elevation: 0,
			},
			styleOverrides: {
				root: {
					backgroundImage: 'none',
				},
				rounded: {
					borderRadius: `${theme?.customization?.borderRadius}px`,
				},
			},
		},
		MuiCardHeader: {
			styleOverrides: {
				root: {
					color: theme.colors?.textDark,
					padding: '24px',
				},
				title: {
					fontSize: '1.125rem',
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: '24px',
				},
			},
		},
		MuiCardActions: {
			styleOverrides: {
				root: {
					padding: '24px',
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					color: theme.darkTextPrimary,
					padding: '1rem 0 1rem 1.2rem',
					borderRadius: '20px',
					marginBottom: '0.2rem',
					alignItems: 'flex-start',
					'&.Mui-selected': {
						color: theme.menuSelected,
						backgroundColor: 'unset',
						'&:hover': {
							backgroundColor: 'unset',
						},
						'& .MuiListItemIcon-root': {
							color: theme.menuSelected,
						},
					},
					'&:hover': {
						backgroundColor: 'unset',
						// color: theme.menuSelected,
						// '& .MuiListItemIcon-root': {
						// 	color: theme.menuSelected,
						// },
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: theme.darkTextPrimary,
					minWidth: '36px',
					margin: 'auto 0.8rem auto 0',
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				primary: {
					color: theme.textDark,
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					fontSize: '1.1rem',
					'&::before': {
						borderBottomWidth: '2px !important',
					},
				},
				input: {
					color: theme.textDark,
					'&::placeholder': {
						fontWeight: 500,
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					background: bgColor,
					borderRadius: `${theme?.customization?.borderRadius}px`,
					'& .MuiOutlinedInput-notchedOutline': {
						border: `2px solid ${theme.colors?.line}`,
						borderRadius: '10px',
					},
					'&:hover $notchedOutline': {
						borderColor: theme.colors?.primaryLight,
					},
					'&.MuiInputBase-multiline': {
						padding: 1,
					},
				},
				input: {
					fontWeight: 400,
					background: bgColor,
					padding: '8px 16px',
					borderRadius: `${theme?.customization?.borderRadius}px`,
					'&.MuiInputBase-inputSizeSmall': {
						padding: '7px 0px',
						'&.MuiInputBase-inputAdornedStart': {
							paddingLeft: 0,
						},
					},
					'&::placeholder': {
						textOverflow: 'ellipsis !important',
						color: '#000',
						fontWeight: 500,
					},
				},
				inputAdornedStart: {
					paddingLeft: 4,
				},
				notchedOutline: {
					borderRadius: `${theme?.customization?.borderRadius}px`,
				},
			},
		},
		MuiRadio: {
			defaultProps: {
				icon: RadioIcon({ checked: false }),
				checkedIcon: RadioIcon({ checked: true }),
			},
			styleOverrides: {
				root: {
					padding: '0 6px 0 8px',
					marginRight: '6px',
				},
			},
		},
		MuiCheckbox: {
			defaultProps: {
				// icon: CheckboxIcon({ checked: false }),
				// checkedIcon: CheckboxIcon({ checked: true }),
			},
		},
		MuiDatePicker: {
			defaultProps: {
				components: {
					OpenPickerIcon: DateIcon,
				},
			},
		},
		MuiSlider: {
			styleOverrides: {
				root: {
					'&.Mui-disabled': {
						color: theme.colors?.grey300,
					},
				},
				mark: {
					backgroundColor: theme.paper,
					width: '4px',
				},
				valueLabel: {
					color: theme?.colors?.primaryLight,
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: theme.divider,
					opacity: 1,
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					color: theme.colors?.primaryDark,
					background: theme.colors?.primary200,
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					'&.MuiChip-deletable .MuiChip-deleteIcon': {
						color: 'inherit',
					},
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					padding: '8px 8px 8px 14px',
					background: '#FFF',
					color: theme.textDark,
					fontFamily: 'Noto Sans KR',
					fontSize: '1rem',
					fontWeight: 400,
					border: `1px solid ${theme.colors?.grey600}`,
					borderRadius: '8px',
					whiteSpace: 'pre-line',
					wordBreak: 'keep-all',
					maxWidth: 370,
				},
				arrow: {
					color: '#FFF',
					'&:before': {
						border: `1px solid ${theme.colors?.grey600}`,
					},
				},
			},
		},
		MuiDialog: {
			defaultProps: {
				fullWidth: true,
				maxWidth: 'xl',
				transitionDuration: 0,
			},
			styleOverrides: {
				paper: {
					background: '#FFF',
				},
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					fontSize: '1.25rem',
					fontWeight: 600,
					padding: '1.5rem 1.6rem',
				},
			},
		},
		MuiDialogContent: {
			styleOverrides: {
				root: {
					padding: '0 1.6rem',
				},
			},
		},
		MuiDialogActions: {
			styleOverrides: {
				root: {
					justifyContent: 'center',
					padding: '1.6rem 0',
					'& > button.MuiButton-sizeMedium ': {
						fontSize: '0.95rem',
						minWidth: '6rem',
						height: '2.8rem',
						margin: '0 1rem',
					},
					'& > button.MuiButton-sizeSmall ': {
						fontSize: '0.95rem',
						minWidth: '5.2rem',
						height: '2.2rem',
					},
				},
			},
		},
		MuiDataGrid: {
			defaultProps: {
				density: 'compact',
				editMode: 'row',
				headerHeight: 88,
				rowHeight: 88,
			},
			styleOverrides: {
				root: {
					border: 'none',
					borderRadius: '0',
				},
				cell: {
					justifyContent: 'center',
					'&:focus': {
						outline: 'none',
					},
				},
				columnHeaders: {
					backgroundColor: theme.colors?.page,
					borderColor: theme.colors?.page,
					'& .MuiDataGrid-columnSeparator': {
						visibility: 'hidden',
					},
				},
				columnHeader: {
					'&:focus': {
						outline: 'none',
					},
				},
				columnHeaderTitleContainer: {
					justifyContent: 'center',
				},
				row: {
					'&:focus-within': {
						backgroundColor: `${theme.colors?.primary100}`,
					},
					'&:hover': {
						backgroundColor: 'unset',
					},
					'&.Mui-selected': {
						backgroundColor: theme.colors?.primary200,
					},
					[`&.Custom-MuiDataGrid-Row--error`]: {
						backgroundColor: theme.colors?.error100,
					},
				},
				[`row--editing`]: {
					width: 'calc(100% - 1px)',
					minHeight: 'inherit',
					maxHeight: 'inherit',
					backgroundColor: '#FFF !important',
					outline: `2px solid ${theme.colors?.primaryMain}`,
					outlineOffset: '-2px',
					boxShadow: 'none',
					'& > .MuiDataGrid-cell': {
						backgroundColor: 'transparent',
					},
				},
				[`cell--editing`]: {
					outline: 'none !important',
					padding: '2px 10px !important',
					'& > .MuiInputBase-root': {
						border: `1px solid ${theme.colors?.line}`,
						borderRadius: '8px',
						'& > input': {
							textAlign: 'center',
						},
					},
				},
				footerContainer: {
					border: 'none',
				},
			},
		},
		MuiPagination: {
			defaultProps: {
				color: 'primary',
			},
		},
		MuiPaginationItem: {
			defaultProps: {
				components: {
					first: PageFisrtIcon,
					last: PageLastIcon,
					next: PageNextIcon,
					previous: PagePreviousIcon,
				},
			},
			styleOverrides: {
				root: {
					color: theme.colors?.grey500,
					fontSize: '1.1rem',
					fontWeight: 500,
					borderRadius: '3px',
				},
				previousNext: {
					padding: 0,
					'&:hover': {
						backgroundColor: theme.colors?.page,
					},
				},
				firstLast: {
					padding: 0,
					'&:hover': {
						backgroundColor: theme.colors?.page,
					},
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					fontFamily: 'NanumSquareRound',
					fontSize: '0.95rem',
					fontWeight: 500,
					color: theme.colors?.primaryMain,
				},
			},
		},
		MuiTableCell: {
			defaultProps: {
				align: 'center',
			},
			styleOverrides: {
				root: {
					padding: '14px 6px',
					borderBottom: '2px solid #e9eaee',
				},
				head: {
					padding: '14px 6px',
					backgroundColor: theme.colors?.page,
				},
				sizeSmall: {
					fontSize: '0.9rem',
					lineHeight: '1.3rem',
					padding: '4px 16px',
					height: '2.4rem',
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					minWidth: '5.6rem',
					fontSize: '1.1rem',
					padding: '7px 12px',
				},
			},
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					border: 'none',
					padding: '1px',
					backgroundColor: 'transparent !important',
				},
			},
		},
		MuiFormControlLabel: {
			styleOverrides: {
				label: {
					fontSize: '1.05rem',
				},
			},
		},
		MuiAlert: {
			defaultProps: {
				variant: 'filled',
			},
			styleOverrides: {
				root: {
					borderRadius: 0,
					justifyContent: 'center',
					fontFamily: 'NanumSquareRound',
					fontSize: '0.96rem',
				},
			},
		},
	};
}
