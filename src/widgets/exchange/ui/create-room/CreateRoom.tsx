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
import { t } from 'i18next';

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
                <Checkbox className='hover:cursor-pointer'>
                    <span className="hover:cursor-pointer text-sm">{t("exchange.only_i_can")}</span>
                </Checkbox>
            </div>

            <div className="mt-6">
                <label className="inline-flex mb-1 text-sm font-medium" htmlFor="">{t("exchange.purchase_limit")}</label>
                <Input placeholder={t("exchange.it_is_empty")}/>
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
                {t("exchange.open_private_exchange_room")}
                </Button>
            </div>
        </div>
        
        {loading && <Loader/>}
    </>;
}

export default CreateRoom;
