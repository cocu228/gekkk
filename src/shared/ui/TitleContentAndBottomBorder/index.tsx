import s from './styles.module.scss'

export type TitleContentAndBottomBorderProps = React.PropsWithChildren<{
  title: React.ReactNode
}>
export function TitleContentAndBottomBorder({
  children,
  title,
}: TitleContentAndBottomBorderProps) {
  return (
    <div className={s.box}>
      <span className={s.boxTitle}>{title}</span>
      <div className={s.childrenWrap}>
        {children}
      </div>
    </div>
  )
}
