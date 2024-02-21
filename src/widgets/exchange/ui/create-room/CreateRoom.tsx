import {t} from 'i18next';
import Loader from '@/shared/ui/loader';
import {useContext, useState} from 'react';
import Input from '@/shared/ui/input/Input';
import Button from '@/shared/ui/button/Button';
import {CtxExchangeData} from '../../model/context';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import UseError from "@/shared/model/hooks/useError";
import {apiCreateRoom} from '@/shared/(orval)api/gek';
import {RoomFlags} from "@/shared/(orval)api/gek/model";
import {CurrencyFlags} from '@/shared/config/mask-currency-flags';
import ModalInfoText from '@/shared/ui/modal/modal-info-text/ModalInfoText';
import TokenSelect from '@/shared/ui/search-select/token-select/TokenSelect';

interface IState {
    isIco: boolean;
    purchaseLimit: number;
}

function CreateRoom() {
    const [loading, setLoading] = useState<boolean>(false);
    const [localErrorHunter, , localErrorInfoBox] = UseError();
    const [state, setState] = useState<IState>({
        isIco: false,
        purchaseLimit: 0
    });
    
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
                {t("exchange.private_room_allows")}
            </ModalInfoText>
            
            <div className="mt-4">
                <label className="inline-flex mb-1 text-sm font-medium" htmlFor="sell-token">{t("exchange.from")}</label>
                <TokenSelect
                    id="sell-token"
                    value={from.currency}
                    onSelect={onFromCurrencyChange}
                    disabledCurrencies={[to.currency]}
                    placeholder={t("exchange.select_token")}
                    allowedFlags={[
                        CurrencyFlags.ExchangeAvailable
                    ]}
                />
            </div>
            
            <div className="mt-2">
                <label className="inline-flex mb-1 text-sm font-medium" htmlFor="get-token">{t("exchange.to")}</label>
                <TokenSelect
                    id="get-token"
                    value={to.currency}
                    onSelect={onToCurrencyChange}
                    disabledCurrencies={[from.currency]}
                    placeholder={t("exchange.select_token")}
                    allowedFlags={[
                        CurrencyFlags.ExchangeAvailable
                    ]}
                />
            </div>
            
            <div className="mt-7">
                <Checkbox
                    defaultChecked={state.isIco}
                    className='hover:cursor-pointer'
                    onChange={(val) => setState({
                        ...state,
                        isIco: val
                    })}
                >
                    <span className="hover:cursor-pointer text-sm">{t("exchange.only_i_can")}</span>
                </Checkbox>
            </div>
            
            <div className="mt-6">
                <label className="inline-flex mb-1 text-sm font-medium" htmlFor="">{t("exchange.purchase_limit")}</label>
                <Input
                    placeholder={t("exchange.it_is_empty")}
                    onChange={({target}) => setState({
                        ...state,
                        purchaseLimit: +target.value
                    })}
                />
            </div>
            
            <div className='mt-4'>{localErrorInfoBox}</div>
            
            <div className="mt-6 sm:mt-11">
                <Button
                    disabled={!(from.currency && to.currency)}
                    size="xl"
                    className="w-full"
                    onClick={() => {
                        setLoading(true);
                        
                        apiCreateRoom({
                            currency1: from.currency,
                            currency2: to.currency,
                            flags: state.isIco ? 1 : 0,
                            to_balance_limit: state.purchaseLimit
                        }).then(({data}) => {
                            if (data.error) {
                                localErrorHunter({code: 0, message: data.error.message});
                                return;
                            }
                            
                            onRoomCreation(data.result);
                        }).catch((e) => {
                            localErrorHunter(e);
                        }).finally(() => {
                            setLoading(false);
                        });
                    }}
                >
                {t("exchange.open_private_exchange_room")}
                </Button>
            </div>
        </div>
        
        {loading && <Loader/>}
    </>;
}

export default CreateRoom;
