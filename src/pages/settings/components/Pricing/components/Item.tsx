import styles from '../styles.module.scss'

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
    <div className={styles.TableItem}>
      <span className={styles.TableItemTitle}>{title}</span>
      {rows.map((item, index) => {
        const { title, value } = item
        return (
          <span className={styles.TableItemTextWrap} key={index} >
            <span>{title}</span>
            <span className={styles.TableItemValue}>{value}</span>
          </span>

        )
      })}
      {description ? <span className={styles.DescriptionText}>{description}</span> : null}
    </div>
  )
}
