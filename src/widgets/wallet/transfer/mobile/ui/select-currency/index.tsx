import { CtxCurrencies, ICtxCurrency } from '@/processes/CurrenciesContext';
import { mockEUR } from '@/processes/PWA/mock-EUR';
import { IconCoin } from '@/shared/ui/icons/icon-coin';
import { ConfigProvider, Select } from 'antd'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface IProps {
    setCurr: Dispatch<SetStateAction<string>>,
    currency: string
}

function SelectCurrency({currency, setCurr}: IProps) {
    const {t} = useTranslation()
    const [open, setOpen] = useState<boolean>(false)
    const {currencies} = useContext(CtxCurrencies);
    const navigate = useNavigate()
    const currenciesList =currencies ? [...currencies].map(el => {
        return {
            value:el[0],
            label:<div className='grid h-full grid-cols-[repeat(3,1fr)] grid-rows-[1fr] gap-x-2.5 gap-y-0 items-center self-center'>
                <IconCoin height={20} className='max-h-[36px]' code={el[0]}/>
                {/* <span>{el[0]}</span> */}
                {currencies?.get(el[0]).name}
            </div> 
        }
    }) : []
    
    

  return (
    <div className='w-full relative h-[32px] flex flex-row'>
        <div 
            className="row w-full relative cursor-pointer border-r-[0px] items-center overflow-hidden flex flex-row font-medium border-[1px] rounded-tl-[5px] rounded-bl-[5px] border-solid border-[#DCDCD9]"
            onClick={()=>{
                setCurr(null)
                navigate("/transfers")
            }}
        >
            <Select 
                className='w-full'
                bordered={false}
                placeholder={
                    currency?
                        <div className='flex w-full h-full justify-start items-center'>
                            <div className='flex justify-start items-center w-full'>
                                <div className='min-w-[50px] flex justify-start'>
                                    <IconCoin height={20} className={`max-h-[36px]`} code={currency}/>
                                </div>
                                <span className='text-[12px] text-[#3A5E66]'>{currencies?.get(currency)?.name}</span>
                            </div>
                        </div>
                    :
                        <span className='inline-flex justify-center w-full text-[10px] text-[#B9B9B5]'>{t("choose_currency")}</span>
                }
                notFoundContent={null}
                suffixIcon={null}
            />
        </div>
        <div className={`rounded-tr-[5px] rounded-br-[5px] h-full min-w-[22px] flex justify-center items-center bg-[#3A5E66]`}>
            <svg className={`${currency && "rotate-180"}`} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6286 0.5L12 1.8125L6 7.5L0 1.8125L1.37143 0.5L6 4.875L10.6286 0.5Z" fill="white"/>
            </svg>
        </div>
    </div>
  )
}

export default SelectCurrency