import { CtxCurrencies, ICtxCurrency } from '@/processes/CurrenciesContext';
import { IconCoin } from '@/shared/ui/icons/icon-coin';
import { ConfigProvider, Select } from 'antd'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'

interface IProps {
    setCurr: Dispatch<SetStateAction<string>>,
    currency: string
}

function SelectCurrency({currency, setCurr}: IProps) {
    const [open, setOpen] = useState<boolean>(false)
    const {currencies} = useContext(CtxCurrencies);
    const currenciesList = [...currencies].map(el => {
        return {
            value:el[0],
            label:<div className='grid h-full grid-cols-[repeat(3,1fr)] grid-rows-[1fr] gap-x-2.5 gap-y-0 items-center self-center'>
                <IconCoin height={20} className='max-h-[36px]' code={el[0]}/>
                {/* <span>{el[0]}</span> */}
                {currencies.get(el[0]).name}
            </div> 
        }
    })
    
    

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
            <div className="row w-full font-medium">
                <Select 
                    className='w-full'
                    open={open}
                    onDropdownVisibleChange={(visible) => setOpen(visible)}
                    dropdownStyle={{backgroundColor:"transparent", boxShadow:"none"}}
                    dropdownRender={(menu)=>{
                        return(
                            <div 
                                className='h-[380px] overflow-auto'
                            >
                                    {currenciesList.map((el)=>{
                                        return(
                                            <div style={{backgroundColor:`${(currency === el.value)?"#7B797C":"white"}`}} onClick={()=>{setCurr(el.value);setOpen(false)}}className={`grid grid-cols-[repeat(3,1fr)] grid-rows-[1fr] gap-x-2.5 gap-y-0 mb-[5px] items-center justify-center gap-[5px] rounded-md h-[30px] bg-opacity-1 border-[1px] border-solid border-[#E0E0E0]`}>
                                                <IconCoin height={20} className='max-h-[36px] justify-self-center' code={el.value}/>
                                                <span className='justify-self-start text-[12px]'>{el.value}</span>
                                                <span className='justify-self-start text-[10px]'>{currencies.get(el.value).name}</span>
                                            </div>
                                        )
                                    })}
                            </div>
                        )
                    }}
                    placeholder={
                        currency?
                            <div className='grid grid-cols-[repeat(2,1fr)] grid-rows-[1fr] gap-x-2.5 gap-y-0'>
                                <IconCoin height={20} className='max-h-[36px]' code={currency}/>
                                {currencies.get(currency).name}
                            </div>
                        :"Choose currency"
                    }
                    value={currency}
                    onSelect={(e)=>{
                        setCurr(e)
                    }}
                    options={currenciesList}
                />
            </div>
        </ConfigProvider>

    </>
  )
}

export default SelectCurrency