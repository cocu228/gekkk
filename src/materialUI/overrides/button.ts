import { Components, Theme } from '@mui/material'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'account-button': true
    'quick-action-button': true
    'text-button': true
    'select-button': true
    'second_value-button': true
    'pick button': true
    'button-selector': true
  }
}

export function buttonOverrides({
  palette,
  typography,
  customShadows,
}: Theme): Components<Omit<Theme, 'components'>> {
  return {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          boxSizing: 'border-box',
          boxShadow: customShadows['dark-inner-glow'],
          padding: '9px 24px',
        },
      },

      variants: [
        {
          props: { variant: 'account-button' },
          style: {
            'background': palette.green,
            'color': palette.white,
            'outline': `2px solid transparent`,
            'outlineOffset': '-2px',
            ...typography['ui-button-badge'],

            '&:active:hover': {
              color: palette.green,
              background: palette['light green'],
              outlineColor: palette.green,
            },
            '&:hover': {
              background: palette['brand gradient'],
            },
            '&:disabled': {
              color: palette['dark grey'],
              background: palette['pale grey'],
            },
          },
        },

        {
          props: { variant: 'quick-action-button' },
          style: {
            'background': palette['pale green'],
            'color': palette.white,
            'outline': `2px solid transparent`,
            'outlineOffset': '-2px',
            'padding': '6px 24px',

            ...typography['button-badge'],

            '&:active:hover': {
              color: palette.green,
              background: palette['light green'],
              outlineColor: palette.green,
            },
            '&:hover': {
              background: palette['brand gradient'],
            },
            '&:disabled': {
              color: palette['mid grey'],
              background: palette['pale grey'],
            },
          },
        },

        {
          props: { variant: 'text-button' },
          style: {
            'background': 'transparent',
            'border': 'none',
            'padding': '0 6px',
            'boxShadow': 'none',
            'margin': 0,
            'color': palette['pale blue'],
            'backgroundClip': 'text',
            'WebkitBackgroundClip': 'text',

            ...typography['button-badge'],

            '&:hover': {
              fontWeight: 700 
            },
          },
        },
        {
          props: { variant: 'second_value-button' },
          style: {
            'background': palette['light green'],
            'color': palette['green numbers'],
            'outline': `2px solid ${palette.green}`,
            'outlineOffset': `-2px`,
            ...typography['button-badge'],

            '&:hover': {
              color: palette['dark blue'],
              background: palette['brand gradient'],
              outline: `2px solid transparent`,
            },

            '&:disabled': {
              outlineColor: `transparent`,
              color: palette['mid grey'],
              background: palette['pale grey'],
            },
          },
        },
        {
          props: { variant: 'pick button' },
          style: {
            'padding': '3px 12px 3px 12px',
            'borderRadius': '10px',
            'background': palette['light blue'],
            ...typography.b1,

            '&:hover': {},

            '&:disabled': {},
          },
        },
        {
          props: { variant: 'button-selector' },
          style: {
            'padding': '6px 12px',
            'borderRadius': '8px',
            'outline': `2px solid ${palette.green}`,
            'outlineOffset': '-2px',
            'display': 'flex',
            'gap': '12px',
            'color': palette['pale blue'],
            'background': palette['light green'],
            ...typography['button-badge'],

            '&:hover': {
              outline: 'none',
              background: palette['brand gradient'],
              color: palette.white,
            },

            '&:disabled': {},
          },
        },
      ],
    },
  }
}
