import {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@/shared/ui/button/Button';
import {useNewCardContext} from './newCardContext';
import {CtxRootData} from "@/processes/RootContext";
import {apiOrderNewCard} from "@/shared/api/bank/order-new-card";
import Select from "@/shared/ui/select/Select";
import {getAddressPartOrEmpty} from "@/widgets/cards-menu/model/helpers";
import {deliveryCountriesList} from "@/shared/config/delivery-coutries-list";
import {apiDeliveryOptions, IDeliveryOption} from "@/shared/api/bank/get-delivery-options";
import Loader from "@/shared/ui/loader";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";
import {CloseWindowButton} from "@/shared/ui/CloseWindowButton";
import {Format} from '@/shared/(orval)api/gek/model';
import {apiGetUas} from '@/shared/(orval)api';
import {storeAccountDetails} from '@/shared/store/account-details/accountDetails';
import {IResResult} from '@/shared/api';
import useError from '@/shared/model/hooks/useError';
import styles from './styles.module.scss'

export function ConfirmationNewCard() {
    const {t} = useTranslation();
    const {account} = useContext(CtxRootData);
    const {getAccountDetails} = storeAccountDetails();
    const [loading, setLoading] = useState<boolean>(false);
    const mainCard = storeActiveCards(state => state.mainCard);
    const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
    const [deliveryOption, setDeliveryOption] = useState<IDeliveryOption>(null);
    const {
        state,
        close,
        setStep,
        setState
    } = useNewCardContext();
    
    useEffect(() => {
        (async () => {
            if (state.cardType === 'PLASTIC') {
                const {data} = await apiDeliveryOptions();

                setDeliveryOption(data.find(o => o.countryCode === state.countryCode))
            }
        })();
    }, []);

    const onConfirm = async () => {
        setLoading(true);
        localErrorClear();

        const {data} = await apiGetUas();
        const {phone} = await getAccountDetails();

        const result = await apiOrderNewCard({
            format: state.cardType,
            type: mainCard !== null ? "ADDITIONAL" : "MAIN",
            accountId: account.account_id,
            cardHolderName: state.cardholderName,
            cardHolderPhoneNumber: state.linkedPhone,
            
            ...(state.cardType === "PLASTIC" ? {
                isExpressDelivery: state.isExpressDelivery,
                deliveryAddress: {
                    city: state.city,
                    street: state.street,
                    postalCode: state.postalCode,
                    countryCode: state.countryCode,
                    streetNumber: state.houseNumber,
                    recipientName: state.recipientName,
                    apartmentNumber: state.apartmentNumber
                }
            } : {})
        }, {
            headers: {
                Authorization: phone,
                Token: data.result.token
            }
        });

        if ((result.data as IResResult).status === 'ok') {
            setStep('CardHasBeenOrdered');
        }
        else {
            localErrorHunter({code: 0, message: "And error occured when ordering the card"});
        }

        setLoading(false);
    }
    
    return (state.cardType === 'PLASTIC' && !deliveryOption) ? <Loader className={'relative mt-10'}/> : <>
        <div className={styles.confHeader}>
            <h3 className={styles.confHeaderTitle}>{t("issue_new_card")}</h3>
            <CloseWindowButton onClick={close}/>
        </div>
        <div className={styles.confInfoList}>
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle}>{t("account_owner")}</span>
                <span className={styles.confRowItemSubtitle}>{account.name}</span>
            </div>
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle}>{t("account_number")}</span>
                <span className={styles.confRowItemSubtitle}>{account.number}</span>
            </div>
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle}>{t("card_design")}</span>
                <span className={styles.confRowItemSubtitle}>Standard</span>
            </div>
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle}>{t("card_type")}</span>
                <span className={styles.confRowItemSubtitle}>{t(state.cardType.toLowerCase()).capitalize()}</span>
            </div>
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle}>{t("cardholder").toLowerCase().capitalize()}</span>
                <span className={styles.confRowItemSubtitle}>{state.cardholderName}</span>
            </div>
            
            {!state.recipientName ? null : (
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle}>{t("recipient")}</span>
                <span className={styles.confRowItemSubtitle}>{state.recipientName}</span>
            </div>
            )}
            
            {state.cardType !== 'PLASTIC' ? null : <div>
                <div className={styles.confRowItem}>
                    <span className={styles.confRowItemTitle}>{t("delivery_address")}</span>
                    <span className={styles.confRowItemSubtitle}>
                    {`
                        ${getAddressPartOrEmpty(deliveryCountriesList.find(c => c.code === state.countryCode).name)}
                        ${getAddressPartOrEmpty(state.postalCode)}
                        ${getAddressPartOrEmpty(state.city)}
                        ${getAddressPartOrEmpty(state.street)}
                        ${getAddressPartOrEmpty(state.houseNumber)}
                        ${state.apartmentNumber ?? ''}
                    `}
                    </span>
                </div>
                <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle}>{t("delivery_type")}</span>
                    <div className='w-[200px]'>
                        <Select className="w-full mt-2"
                                placeholder='Select type...'
                                value={state.isExpressDelivery ? 'express' : 'standard'}
                                options={[{
                                    label: 'Standard (0 €)',
                                    value: 'standard',
                                }, {
                                    label: `Express (${deliveryOption.cost} €)`,
                                    value: 'express',
                                }]}
                                onSelect={(e: 'express' | 'standard') => setState({
                                    ...state,
                                    isExpressDelivery: e === 'express'
                                })}/>
                    </div>
                </div>
                <div className={`${styles.confRowItem} ${styles.confRowItemBorder}`}>
                    <span className={styles.confRowItemTitle}>{t("expected_delivery_time")}</span>
                    <span className={styles.confRowItemTitle}>{state.isExpressDelivery ? deliveryOption.deliveryDays : 10} days</span>
                </div>
            </div>}
        </div>
        <div className={styles.confFeesList}>
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle} style={{fontWeight: '500'}} >{t("card_issuance")}</span>
                <span className={styles.confRowItemSubtitle}>€ 7</span>
            </div>
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle} style={{fontWeight: '500'}} >{t("card_delivery")}</span>
                <span className={styles.confRowItemSubtitle}>€ {state.isExpressDelivery ? deliveryOption.cost : 0}</span>
            </div>
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle}>{t("total_fees")}</span>
                <span className={styles.confRowItemTitle}>€ {7 + (state.isExpressDelivery ? deliveryOption.cost : 0)}</span>
            </div>
        </div>

        <div className='mt-5'>
            {localErrorInfoBox}
        </div>

        <div className={styles.confFooterBtns}>
            <Button disabled={loading} className='w-full' onClick={onConfirm}>{t("order_card")}</Button>
            <Button skeleton color='gray' className='w-full' onClick={() => {
                setStep('IssueNewCard');
            }}>{t("back")}</Button>
        </div>
    </>
}
