import s from './styles.module.scss'


interface currencyImagePropsType {
  currency: string
  active?: boolean
}

export const CurrencyImage = ({ currency, active }: currencyImagePropsType) => {

  return (
    <>
      <h3 className={`${s.currencyImage} ${active && s.currencyImageActive}`}>
        {currency}
      </h3>
    </>
  )
}
