import Loader from "@/shared/ui/loader";
import styles from './styles.module.scss';
import {Select} from '@/shared/ui/Select';
import {useTranslation} from 'react-i18next';
import {Modal} from "@/shared/ui/modal/Modal";
import Button from '@/shared/ui/button/Button';
import {apiPersonalize} from "@/shared/(orval)api";
import {CtxRootData} from "@/processes/RootContext";
import {useContext, useEffect, useState} from 'react';
import {useOrderCardContext} from '../../../model/context';
import {getAddressPartOrEmpty} from "@/widgets/cards-menu/model/helpers";
import {deliveryCountriesList} from "@/shared/config/delivery-coutries-list";
import {apiDeliveryOptions, IDeliveryOption} from "@/shared/api/bank/get-delivery-options";

export function OrderConfirmation() {
    const {t} = useTranslation();
    const {account} = useContext(CtxRootData);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deliveryOption, setDeliveryOption] = useState<IDeliveryOption>(null);
    const {
        state,
        setStep,
        setState
    } = useOrderCardContext();
    
    useEffect(() => {
        (async () => {
            const {data} = await apiDeliveryOptions();
            
            setDeliveryOption(data.find(o => o.countryCode === state.countryCode))
        })();
    }, []);
    
    return !deliveryOption ? <Loader className={'relative mt-20'}/> : <>
        <div className={styles.InfoList}>
            <div className={styles.Row}>
                <span className={styles.RowTitle}>{t("account_owner")}</span>
                <span className={styles.RowValue}>{account.name}</span>
            </div>

            <div className={styles.Row}>
                <span className={styles.RowTitle}>{t("account_number")}</span>
                <span className={styles.RowValue}>{account.number}</span>
            </div>
            <div className={styles.Row}>
                <span className={styles.RowTitle}>{t("card_design")}</span>
                <span className={styles.RowValue}>Standard</span>
            </div>
            <div className={styles.Row}>
                <span className={styles.RowTitle}>{t("cardholder").toLowerCase().capitalize()}</span>
                <span className={styles.RowValue}>{state.cardholderName}</span>
            </div>
            {!state.recipientName ? null : (
            <div className={styles.Row}>
                <span className={styles.RowTitle}>{t("recipient")}</span>
                <span className={styles.RowValue}>{state.recipientName}</span>
            </div>
            )}

            <div className={styles.Row}>
                <span className={styles.RowTitle}>{t("delivery_address")}</span>
                <span className={styles.RowValue}>
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

            <div className={styles.Row}>
                <span className={styles.RowTitle}>{t("delivery_type")}</span>
                <div className='w-[200px]'>
                    <Select
                        mobile={true}
                        placeholder='Select type...'
                        value={state.isExpressDelivery ? 'Express (26 €)' : 'Standart (0 €)'}
                        options={[{
                            label: 'Standard (0 €)',
                            value: 'standard',
                        }, {
                            label: `Express (${deliveryOption.cost} €)`,
                            value: 'express',
                        }]}
                        onChange={(e: 'Express (26 €)' | 'standard') => {
                            console.log('TYYYPE', e)
                            setState({
                                ...state,
                                isExpressDelivery: e === 'Express (26 €)'
                            })
                        }} 
                    />
                </div>
            </div>
        </div>

        <div className={styles.confFeesList}>
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle} style={{fontWeight: '500'}} >{t("card_issuance")}</span>
                <span className={styles.confRowItemSubtitle}>€ 10</span>
            </div>
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle} style={{fontWeight: '500'}} >{t("card_delivery")}</span>
                <span className={styles.confRowItemSubtitle}>€ {state.isExpressDelivery ? deliveryOption.cost : 0}</span>
            </div>
            <div className={styles.confRowItem}>
                <span className={styles.confRowItemTitle}>{t("total_fees")}</span>
                <span className={styles.confRowItemTitle}>€ {10 + (state.isExpressDelivery ? deliveryOption.cost : 0)}</span>
            </div>
        </div>
        
        <div className={`${styles.issueRowItem} ${styles.issueRowItemBorder}`}>
            <span className={styles.confRowItemTitle}>{t("expected_delivery_time")}</span>
            <span className={styles.confRowItemTitle}>{state.isExpressDelivery ? deliveryOption.deliveryDays : 10} days</span>
        </div>

        <div className={'h-[55px] flex flex-row w-full justify-center gap-2 pt-3'}>
            <Button
                className="w-full"
                text={t("order_card")}
                onClick={() => {
                    setIsOpen(true);
                }}
            />
            <Button
                skeleton
                className="w-full"
                text={t("back")}
                onClick={() => {
                    setStep('DeliveryInfo');
                }}
            />
        </div>

        <Modal
            isModalOpen={isOpen}
            closable={false}
            title={t("enter_your_online_bank_password_to_confirm_new_card_order")}
            onCancel={() => {
                setIsOpen(false)
            }}
        >
            <div className='flex gap-[25px] pt-[43px]'>
                <Button onClick={() => {
                    setIsOpen(false);
                    // Order virtual card
                    apiPersonalize({
                        isExpressDelivery: state.isExpressDelivery,
                        deliveryAddress: {
                            city: state.city,
                            countryCode: state.countryCode,
                            postalCode: state.postalCode,
                            street: state.street,
                            streetNumber: state.houseNumber,
                            apartmentNumber: state.apartmentNumber,
                            recipientName: state.recipientName
                        }
                    }, {cardId: state.card.cardId});
                    
                    // Order plastic card
                    // apiBankCards({
                    //     type: mainCard !== null ? "ADDITIONAL" : "MAIN",
                    //     accountId: account.account_id,
                    //     cardHolderName: state.card.cardholder,
                    //     cardHolderPhoneNumber: state.linkedPhone,
                    //     format: state.card.isVirtual ? Format.VIRTUAL : Format.PLASCTIC,
                    //    
                    //     ...(state.card.type === "PLASTIC" ? {
                    //         isExpressDelivery: state.isExpressDelivery,
                    //         deliveryAddress: {
                    //             city: state.city,
                    //             street: state.street,
                    //             postalCode: state.postalCode,
                    //             countryCode: state.countryCode,
                    //             streetNumber: state.houseNumber,
                    //             recipientName: state.recipientName,
                    //             apartmentNumber: state.apartmentNumber
                    //         }
                    //     } : {})
                    // });
                    
                    setStep('SuccessCardOrder');
                }}>{t("proceed")}</Button>
                <Button skeleton color='gray' onClick={() => {
                    setIsOpen(false);
                }}>{t("cancel")}</Button>
            </div>
        </Modal>
    </>
}