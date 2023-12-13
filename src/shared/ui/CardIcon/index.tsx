import { Typography } from '@mui/material'

import LogoIcon from '@/assets/logo-icon.svg?react'

import { useStyles } from './styles'
import { maskCreditCard } from './utils'

interface CardIconPropsType {
  active?: boolean
  cardNumber: string
}

export const CardIcon = ({ active = false, cardNumber }: CardIconPropsType) => {
  const { classes } = useStyles(active)
  return (
    <div className={classes.root}>
      <LogoIcon className={classes.icon} />
      <Typography
        variant="b2 - bold"
        lineHeight="unset"
        alignSelf="flex-end"
        className={classes.cardNumber}
      >
        {maskCreditCard(cardNumber)}
      </Typography>
    </div>
  )
}
