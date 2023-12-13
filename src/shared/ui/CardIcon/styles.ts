import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<boolean, 'icon' | 'cardNumber'>({
  name: 'CardIcon',
})((theme, active, classes) => ({
  root: {
    'display': 'inline-flex',
    'padding': 6,
    'borderRadius': 8,
    'flexDirection': 'column',
    'alignItems': 'flex-start',
    'background': active ? theme.palette['light green'] : theme.palette.strokes,
    'gap': 6,
    'minWidth': 77,
    'maxHeight': 48,

    '&:hover': {
      background: theme.palette['brand gradient'],

      [`.${classes.icon}, .${classes.cardNumber}`]: {
        color: theme.palette.white,
      },
    },
  },

  icon: {
    color: active ? theme.palette['dark blue'] : theme.palette['mid grey'],
  },

  cardNumber: {
    color: active ? theme.palette['dark blue'] : theme.palette['mid grey'],
  },
}))
