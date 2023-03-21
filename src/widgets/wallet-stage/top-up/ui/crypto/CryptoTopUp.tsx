import {useState} from 'react'
import Button from "@/shared/ui/button/Button";
import Select from "@/shared/ui/select/Select";
import ReactQRCode from 'react-qr-code';
import { Input } from 'antd';

const CryptoTopUp = () => {
    const [activeNetwork, setActiveNetwork] = useState('Test1');

    let tokenNetworks: {label: string, value: string}[] = [
        {label: 'Test1', value: 'Test1'},
        {label: 'Test2', value: 'Test2'},
        {label: 'Test3', value: 'Test3'}
    ];

    return (
        <div className="flex flex-col items-center mt-2">
            <div className="w-full">
                Select network

                <Select
                    className="w-full mt-2"
                    options={tokenNetworks}
                    onSelect={setActiveNetwork}
                    value={activeNetwork}
                    defaultValue={tokenNetworks[0].value}
                />
            </div>

            {activeNetwork === 'Test1' && (
                <div className="row mt-8 px-4 w-full">
                    <Button tabIndex={0} htmlType="submit" className="w-full disabled:opacity-5 !text-white">
                        Generate address
                    </Button>
                </div>
            )}
            
            {activeNetwork === 'Test2' && (
                <div className='flex flex-col items-center'>
                    <div className="text-2xl text-gray-dark font-bold my-4 text-center">
                        Send a transaction to this ADDRESS_TYPE address
                    </div>
                
                    <div className="w-[max-content] mb-8 border-1 border-blue border-solid p-4 rounded-md">
                        <div style={{height: "auto", margin: "0 auto", maxWidth: 148, width: "100%"}}>
                            <ReactQRCode
                                size={148}
                                style={{height: "auto", maxWidth: "100%", width: "100%"}}
                                value={'hash'}
                                viewBox={`0 0 148 148`}
                            />
                        </div>
                    </div>

                    <Input
                        className='h-[20px]'
                        readOnly={true}
                        value={'WALLET_ADDRESS'}
                    />
                </div>
            )}
        </div>
    );
};

export default CryptoTopUp;
