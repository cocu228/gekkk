import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<boolean, 'plus'>({ name: 'AddButton' })(
  (theme, isSmall, classes) => ({
    root: {
      'display': 'flex',
      'padding': isSmall ? '3px 9px' : '5px 12px',
      'justifyContent': 'center',
      'alignItems': 'center',
      'flexShrink': 0,
      'maxWidth': isSmall ? 26 : 30,
      'maxHeight': isSmall ? 26 : 30,
      'borderRadius': 6,
      'background': theme.palette['pale grey'],
      'boxShadow': theme.customShadows['dark-inner-glow'],

      '&:hover': {
        border: `2px solid ${theme.palette.green}`,
        background: theme.palette['light green'],

        [`.${classes.plus}`]: {
          color: theme.palette.green,
        },
      },
    },

    plus: {},
  }),
)
