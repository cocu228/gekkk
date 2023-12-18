import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<boolean | undefined>({
  name: 'currencyImage',
})(({ palette }, active) => ({
  currencyImage: {
    display: 'flex',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    background: palette[active ? 'brand gradient' : 'light grey'],
  },
}))
