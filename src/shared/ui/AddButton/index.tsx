import { ButtonBase, ButtonProps, Typography } from '@mui/material'

import { useStyles } from './styles'

interface AddButtonPropsType extends ButtonProps {
  small?: boolean
}

export const AddButton = ({
  small = false,
  ...buttonProps
}: AddButtonPropsType) => {
  const { classes } = useStyles(small)
  return (
    <ButtonBase className={classes.root} {...buttonProps}>
      <Typography
        variant="button-badge"
        className={classes.plus}
        color="dark grey"
      >
        +
      </Typography>
    </ButtonBase>
  )
}
