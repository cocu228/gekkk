import {useState, useRef} from 'react'
import Button from "@/shared/ui/button/Button";
import Select from "@/shared/ui/select/Select";
import ReactQRCode from 'react-qr-code';
import { Input, InputRef } from 'antd';

const CryptoTopUp = () => {
    const [activeNetwork, setActiveNetwork] = useState('Test1');
    const inputRef = useRef<InputRef>(null);
    const walletAddress = '7Basgq7cazmjDXb43jQPrS82sZFWGXiyCBm4miA5MacNdX1WB4SNpfj7mUdoKFTpVPLBF5zjFNPUgZcDRTvsqpySCHtUeeM';

    let tokenNetworks: {label: string, value: string}[] = [
        {label: 'Test1', value: 'Test1'},
        {label: 'Test2', value: 'Test2'},
        {label: 'Test3', value: 'Test3'}
    ];

    const copyAddress = () => {
        inputRef.current.focus({
            cursor: 'all',
        });

        navigator.clipboard.writeText(walletAddress)
    }

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
                                value={walletAddress}
                                viewBox={`0 0 148 148`}
                            />
                        </div>
                    </div>

                    <div className='flex grow shrink container h-full'>
                        <Input
                            ref={inputRef}
                            className='flex !border-[#d9d9d9] !shadow-none'
                            readOnly={true}
                            value={walletAddress}
                            suffix={
                                <img
                                    onClick={copyAddress}
                                    className='opacity-50 mx-2 hover:cursor-pointer hover:opacity-100'
                                    src={`/img/icon/Copy.svg`}
                                    alt='copy'
                                />
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CryptoTopUp;
