import {FC} from 'react'
import s from './styles.module.scss'
import { IconApp } from '@/shared/ui/icons/icon-app'

interface ExchangeHeaderProps {}

export const ExchangeHeader:FC<ExchangeHeaderProps> = () => {
    return (
        <div className={s.exchangeHeader}>
            <IconApp code='t68' color="#285E69" size={42} />
        </div>
    )
}