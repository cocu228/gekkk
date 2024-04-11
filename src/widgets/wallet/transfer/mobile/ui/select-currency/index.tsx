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
    <>
        <ConfigProvider
            theme={{
                components: {
                Select: {
                    
                },
                },
            }}
        >    
            <div 
                className="row w-full relative cursor-pointer h-[32px] items-center overflow-hidden flex flex-row font-medium border-[1px] rounded-[5px] border-solid border-[#E0E0E0]"
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
                                        <IconCoin height={20} className='max-h-[36px]' code={currency}/>
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
                <div className='absolute right-0 h-full w-[22px] flex justify-center items-center bg-[#3A5E66]'>
                    <svg width="12" height="7" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 6.82721L14.4826 0.263604C14.8297 -0.087868 15.3925 -0.087868 15.7397 0.263604C16.0868 0.615076 16.0868 1.18492 15.7397 1.5364L8.62854 8.7364C8.28141 9.08787 7.71859 9.08787 7.37146 8.7364L0.260349 1.5364C-0.0867844 1.18492 -0.0867844 0.615076 0.260349 0.263604C0.607482 -0.087868 1.1703 -0.087868 1.51743 0.263604L8 6.82721Z" fill="#FFFFFF"/>
                    </svg>
                </div>
            </div>
        </ConfigProvider>

    </>
  )
}

export default SelectCurrency