import {useState, useRef, useEffect} from 'react'
import Button from "@/shared/ui/button/Button";
import Select from "@/shared/ui/select/Select";
import ReactQRCode from 'react-qr-code';
import { Input, InputRef } from 'antd';
import Loader from '@/shared/ui/loader';
import { IResListAddresses, IResTokenNetwork, apiTokenNetworks } from '@/shared/api';

interface CryptoTopUpParams {
    currency: string,
    listAddresses: IResListAddresses[],
}

const CryptoTopUp = ({currency, listAddresses}: CryptoTopUpParams) => {
    const [networksList, setNetworksList] = useState<IResTokenNetwork[]>([]);
    const [activeNetwork, setActiveNetwork] = useState<Number>(null);
    const inputRef = useRef<InputRef>(null);
    
    const getNetworks = async () => {
        const result = await apiTokenNetworks(currency);
        const {data} = result;

        setNetworksList(data);
        setActiveNetwork(data[0]?.id);
    }

    useEffect(() => {
        setNetworksList([]);
        setActiveNetwork(null);
        getNetworks();
    }, [currency]);

    // TODO: Переделать, неэффективный код
    const walletAddress = listAddresses.find(address =>
        address.network.includes(networksList.find(network =>
            network.id === activeNetwork)?.type_network_name))?.address;

    return (
        <div className="flex flex-col items-center mt-2">
            <div className="w-full">
                Select network

                <Select
                    disabled={!networksList.length}
                    className="w-full mt-2"
                    value={activeNetwork}
                    onSelect={setActiveNetwork}
                    options={networksList.map(network => {
                        return {label: network.name, value: network.id};
                    })}
                />
            </div>

            {!networksList.length && (
                <Loader/>
            )}

            {!walletAddress && (
                <div className="row mt-8 px-4 w-full">
                    <Button tabIndex={0} htmlType="submit" className="w-full disabled:opacity-5 !text-white">
                        Generate address
                    </Button>
                </div>
            )}
            
            {walletAddress && (
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
                                    className='opacity-50 mx-2 hover:cursor-pointer hover:opacity-100'
                                    src={`/img/icon/Copy.svg`}
                                    alt='copy'
                                    onClick={() => {
                                        inputRef.current.focus({
                                            cursor: 'all',
                                        });

                                        navigator.clipboard.writeText(walletAddress)
                                    }}
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
