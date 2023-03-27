import Button from "@/shared/ui/button/Button";
import { Input } from "antd";

const {TextArea} = Input;

interface TopUpParams {
    currency: string
}

const Transfer = ({currency}: TopUpParams) => {
    return (
        <div className="h-full flex flex-col items-center">
            <div className='flex flex-col gap-4 text-gray-400 w-full text-left'>
                <div className='flex flex-col gap-2'>
                    From
                    <Input
                        suffix={
                            <img
                                className='mx-2 h-[30px]'
                                src={`/img/tokens/${currency.toLowerCase().capitalize()}Icon.svg`}
                                alt='currency'
                            />
                        }
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    I will give
                    <Input
                        inputMode='decimal'
                        suffix={
                            <div className='mx-1 text-gray-400 text-base align-middle'>
                                {currency}
                            </div>
                        }
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    Description (optional)
                    <TextArea rows={2}/>
                </div>
                <div className='flex flex-col gap-2'>
                    To
                    <Input/>
                </div>
                <Button className='mt-5 mb-2 w-[75%] self-center'>
                    Withdraw
                </Button>
                <div className='text-center'>
                    Commission is <b>{'AMOUNT CURRENCY'}</b> per transaction
                </div>
            </div>
        </div>
    );
};

export default Transfer;
