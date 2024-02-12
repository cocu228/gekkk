import { CtxCurrencies } from '@/processes/CurrenciesContext';
import { Select } from 'antd'
import React, { Dispatch, SetStateAction, useContext } from 'react'

interface IProps {
    setCurr: Dispatch<SetStateAction<string>>,
    currency: string
}

function SelectCurrency({currency, setCurr}: IProps) {

    const {currencies} = useContext(CtxCurrencies);
    const currenciesList = [...currencies].map(el => {
        return {
            value:el[0],
            label:el[0]
        }
    })
    
    

  return (
    <>
        <div className="row mb-8 w-full font-medium">
            <span>Select currency</span>
            <Select
                className='w-full mt-2'
                placeholder={"Choose currency"}
                value={currency}
                onSelect={(e)=>{
                    setCurr(e)
                }}
                options={currenciesList}
            />
        </div>
    </>
  )
}

export default SelectCurrency