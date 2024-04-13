import { Box, Typography } from '@mui/material'
import s from '../styles.module.scss'

export interface ItemProps {
  title: React.ReactNode
  description?: React.ReactNode
  rows: {
    title: React.ReactNode
    value: React.ReactNode
  }[]
}
export function Item({ title, rows, description }: ItemProps) {
  return (
    <div className={s.tableItem}>
      <span className={s.tableItemTitle}>{title}</span>
      {rows.map((item, index) => {
        const { title, value } = item
        return (
          // <Typography
          //   key={index}
          //   marginBottom="16px"
          //   display="flex"
          //   justifyContent="space-between"
          //   variant="b2"
          //   gap="16px"
          // >
            
          // </Typography>
          <span className={s.tableItemTextWrap} key={index} >
            <span>{title}</span>
            <span className={s.tableItemValue}>{value}</span>
          </span>
        )
      })}
      {description ? <Typography variant='b2' color="pale blue">{description}</Typography> : null}
    </div>
  )
}
