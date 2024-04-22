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
    <div className={s.TableItem}>
      <span className={s.TableItemTitle}>{title}</span>
      {rows.map((item, index) => {
        const { title, value } = item
        return (
          <span className={s.TableItemTextWrap} key={index} >
            <span>{title}</span>
            <span className={s.TableItemValue}>{value}</span>
          </span>

        )
      })}
      {description ? <span className={s.DescriptionText}>{description}</span> : null}
    </div>
  )
}
