import { Typography } from '@mui/material'

import { useStyles } from './styles'

interface currencyImagePropsType {
  currency: string
  active?: boolean
}

export const CurrencyImage = ({ currency, active }: currencyImagePropsType) => {
  const { classes } = useStyles(active)
  return (
    <Typography variant="h3" color="#FFFFFF" className={classes.currencyImage}>
      {currency}
    </Typography>
  )
}
