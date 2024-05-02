import { CopyToClipboard } from '../CopyToClipboard'
import styles from './styles.module.scss'

export function TitleValueAndCopy({
  title,
  value,
}: {
  title: React.ReactNode
  value: string
}) {
  return (
    <div className={styles.copyWrap}>
        <span className={styles.copyTitle}>{title}</span>
        <div className={styles.tooltipBlock}>
          <span className={styles.tooltipValue}>{value}</span>
          <CopyToClipboard value={value} />
        </div>
    </div>
  )
}
