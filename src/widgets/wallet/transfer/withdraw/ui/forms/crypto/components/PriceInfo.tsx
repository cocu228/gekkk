import {FC} from 'react'
import styles from '../../styles.module.scss'
import { useTranslation } from 'react-i18next'
import { ICtxCurrency } from '@/processes/CurrenciesContext'
import { useBreakpoints } from '@/app/providers/BreakpointsProvider'

interface PriceInfoProps {
    amount: number,
    withdraw_fee: number,
    currencyTitle: string,
}

const titles = [
    'you_will_pay',
    'you_will_get',
    'fee'
]

const values = [
    'inpFee',
    'inp',
    'fee'
]

export const PriceInfo:FC<PriceInfoProps> = ({amount, withdraw_fee, currencyTitle}) => {
    const {md} = useBreakpoints()
    const {t} = useTranslation()

    return (
        <div className={`${styles.PayInfo} ${md && styles.PayInfoMobile}`}>
          <div className={styles.PayInfoCol}>
            {
                titles.map((item, ind) => (
                    <div key={ind} className="row">
                        <span style={{color: item === 'fee' && '#9D9D9D'}} className={styles.PayInfoText}>{t(item)}:</span>
                    </div>
                ))
            }
          </div>
          <div className={styles.PayInfoColValue}>
            <div className={styles.PayInfoCol}>
              {
                values.map((item, ind) => {
                    return (
                        <div key={ind} className={styles.PayInfoValueFlex}>
                            <span
                                className={styles.PayInfoValueFlexText} style={{color: item === 'fee' && '#9D9D9D', fontWeight: item === 'fee' && '500'}} >
                                {
                                    item === 'inpFee' ? amount + withdraw_fee : 
                                    item === 'inp' ? amount : withdraw_fee
                                }
                            </span>
                        </div>
                    )
                })
              }  
            </div>
            <div className={styles.PayInfoCol}>
                {
                    values.map((item, ind) => (
                        <span key={ind} style={{color: item === 'fee' && '#9D9D9D', fontWeight: item === 'fee' && '500'}} 
                            className={styles.PayInfoValueFlexTextCurrency}>
                            {currencyTitle}
                        </span>
                    ))
                }
            </div>
          </div>
        </div>
    )
}