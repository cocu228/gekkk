import Button from '@/shared/ui/button/Button';
import {Input} from 'antd';
import {useContext} from "react";
import {CtxWalletCurrency} from "@/widgets/wallet-stage/top-up/model/context";

const {TextArea} = Input;


const CryptoWithdraw = () => {

    const currency = useContext(CtxWalletCurrency)

    return (
        <div className="flex flex-col items-center mt-2">
            <div className='flex flex-col gap-4 text-gray-400 w-full text-left'>
                <div className='flex flex-col gap-2'>
                    Address

                    <Input
                        suffix={
                            <img
                                className='mx-2 h-[30px]'
                                src={`/img/tokens/${currency.const.toLowerCase().capitalize()}Icon.svg`}
                                alt='currency'
                            />
                        }
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    Amount

                    <Input
                        inputMode='decimal'
                        suffix={
                            <div className='mx-1 text-gray-400 text-base align-middle'>
                                {currency.name}
                            </div>
                        }
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    Description (optional)

                    <TextArea rows={2}/>
                </div>

                <Button className='mt-5 mb-2 w-[75%] self-center'>
                    Withdraw
                </Button>

                <div className='text-center'>
                    Fee is <b>{'AMOUNT CURRENCY'}</b> per transaction
                </div>
            </div>
        </div>
    );
};

export default CryptoWithdraw;
