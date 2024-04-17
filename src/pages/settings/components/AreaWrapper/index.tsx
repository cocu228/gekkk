import { PropsWithChildren } from 'react'
import s from '../../styles.module.scss'
import { CloseWindowButton } from '@/shared/ui/CloseWindowButton'

import { useSettingsContext } from '../../settingsContext'
import { useBreakpoints } from '@/app/providers/BreakpointsProvider'

export type AreaWrapperProps = PropsWithChildren<{ title: React.ReactNode, secondary?:boolean }> 
export function AreaWrapper({ children, title, secondary }: AreaWrapperProps) {
  const { closeArea } = useSettingsContext()
  const {xxl} = useBreakpoints();

  return (
  <div
      className={s.areaWrapper}
    >
      <div className={s.areaWrapperBody} >
        <h3 
          className={`${s.areaWrapperTitle} ${xxl && s.areaWrapperTitleColor}`}
          >
          {title}
        </h3>
        {!secondary && <CloseWindowButton onClick={closeArea} />}
      </div>
      {children}
    </div>
  )
}
