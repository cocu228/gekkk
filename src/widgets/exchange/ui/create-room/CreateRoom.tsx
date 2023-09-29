import Loader from '@/shared/ui/loader';
import {apiCreateRoom} from '@/shared/api';
import {useContext, useState} from 'react';
import Input from '@/shared/ui/input/Input';
import Button from '@/shared/ui/button/Button';
import {CtxExchangeData} from '../../model/context';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import {CurrencyFlags} from '@/shared/config/mask-currency-flags';
import ModalInfoText from '@/shared/ui/modal/modal-info-text/ModalInfoText';
import TokenSelect from '@/shared/ui/search-select/token-select/TokenSelect';

function CreateRoom() {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        to,
        from,
        onRoomCreation,
        onToCurrencyChange,
        onFromCurrencyChange
    } = useContext(CtxExchangeData);

    return <>
        <div className={loading ? '!collapse' : ''}>
            <ModalInfoText>
                A private room allows you to exchange assets only
                with those members whom you invite through a special
                link. Trades in the private room will not be shared.
            </ModalInfoText>

            <div className="mt-4">
                <label className="inline-flex mb-1 text-sm font-medium" htmlFor="sell-token">From</label>
                <TokenSelect
                    id="sell-token"
                    value={from.currency}
                    onSelect={onFromCurrencyChange}
                    disabledCurrencies={[to.currency]}
                    placeholder="Select the token"
                    allowedFlags={[
                        CurrencyFlags.ExchangeAvailable
                    ]}
                />
            </div>

            <div className="mt-2">
                <label className="inline-flex mb-1 text-sm font-medium" htmlFor="get-token">To</label>
                <TokenSelect
                    id="get-token"
                    value={to.currency}
                    onSelect={onToCurrencyChange}
                    disabledCurrencies={[from.currency]}
                    placeholder="Select the token"
                    allowedFlags={[
                        CurrencyFlags.ExchangeAvailable
                    ]}
                />
            </div>

            <div className="mt-7">
                <Checkbox className='hover:cursor-pointer'>
                    <span className="hover:cursor-pointer text-sm">Only I can specify the sale price</span>
                </Checkbox>
            </div>

            <div className="mt-6">
                <label className="inline-flex mb-1 text-sm font-medium" htmlFor="">Purchase limit for one user</label>
                <Input placeholder="If it is empty, then the limit is not set"/>
            </div>

            <div className="mt-12 sm:mt-11">
                <Button
                    disabled={!(from.currency && to.currency)}
                    size="xl"
                    className="w-full"
                    onClick={() => {
                        setLoading(true);

                        apiCreateRoom({
                            currency1: from.currency,
                            currency2: to.currency,
                            flags: 0,
                            to_balance_limit: 0
                        }).then(response => {
                            onRoomCreation(response.data.result);
                        }).finally(() => {
                            setLoading(false);
                        });
                    }}
                >
                    Open private exchange room
                </Button>
            </div>
        </div>
        
        {loading && <Loader/>}
    </>;
}

export default CreateRoom;
