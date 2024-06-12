import { CtxCurrencies, ICtxCurrency } from '@/processes/CurrenciesContext';
import { Dispatch, SetStateAction, useContext } from 'react'
import { IconApp } from '@/shared/ui/icons/icon-app';
import { IconCoin } from '@/shared/ui/icons/icon-coin';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface IProps {
    setCurr: Dispatch<SetStateAction<string>>,
    currency: string,
    setNetwork: Dispatch<SetStateAction<number>>,
    setCurrency: Dispatch<SetStateAction<ICtxCurrency>>
}

function SelectCurrency({currency, setCurr, setNetwork, setCurrency}: IProps) {
    const {t} = useTranslation()
    const {currencies} = useContext(CtxCurrencies);
    const navigate = useNavigate()    

  return (
    <div className='w-full relative h-[32px] flex flex-row'>
        <div 
            className="row w-full relative cursor-pointer border-r-[0px] items-center overflow-hidden flex flex-row font-medium border-[1px] rounded-l-[8px] border-solid border-[color:var(--gek-light-grey)]"
            onClick={()=>{
                setCurr(null)
                setNetwork(null)
                setCurrency(null)
                navigate("/transfers")
            }}
        >
            {
            currency?
                <div className='flex pl-[10px] w-full h-full justify-start items-center'>
                    <div className='flex justify-start items-center w-full'>
                        <div className='min-w-[50px] flex justify-start'>
                            <IconCoin height={20} className={`max-h-[36px]`} code={currency}/>
                        </div>
                        <span className='text-[12px] text-[#3A5E66]'>{currencies?.get(currency)?.name}</span>
                    </div>
                </div>
            :
                <span className='inline-flex justify-center w-full text-[10px] text-[#B9B9B5]'>-{t("select")}-</span>
            }
        </div>
        <div className='rounded-r-[8px] h-full min-w-[22px] flex justify-center items-center bg-[#3A5E66]'>
            <IconApp code='t08' color='#fff' size={12} className={"rotate-90"} />
        </div>
    </div>
  )
}

export default SelectCurrency;
