import { CopyToClipboard } from '../CopyToClipboard'
import s from './styles.module.scss'

export function TitleValueAndCopy({
  title,
  value,
}: {
  title: React.ReactNode
  value: string
}) {
  return (
    <div className={s.copyWrap}>
        <span className={s.copyTitle}>{title}</span>
        <div className={s.tooltipBlock}>
          <span className={s.tooltipValue}>{value}</span>
          <CopyToClipboard value={value} />
        </div>
    </div>
  )
}
