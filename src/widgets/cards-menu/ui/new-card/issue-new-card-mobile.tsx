import { useNewCardContext } from './newCardContext';
import { useTranslation } from 'react-i18next';
import SearchSelect from "@/shared/ui/search-select/SearchSelect";
import {Switch} from "antd";
import { MobileInput } from '@/shared/ui/mobile-input/mobile-input';
import styles from '../style.module.scss';
import Button from '@/shared/ui/button/Button';

export function IssueNewCardMobile() {
    const {t} = useTranslation();
    const {
        state,
        close,
        setStep,
        setState,
        switchResidenceAddress
    } = useNewCardContext();
    
    return <div>
        <div className='flex flex-col items-center justify-center w-full py-5'>
            <span className={`flex typography-b1 ${styles.selectDesign} pb-4`}>Select card design: </span>
            <div className={`${styles.BankCard} `}>
                    <img
                        src='/img/payment-card/payment-card-background2.jpg'
                        className='rounded-[10px]'
                    />
                </div>
        </div>
        <div className={styles.newCardMobileBlock}>
            <div className={styles.issueRowItem}>
                <span className={styles.mobRowItemTitle}>{t('card_type')}:</span>
                <div className={styles.newCardSearchBlock}>
                    <SearchSelect className="w-full mt-2 max-h-[50px]"
                            isMobile
                            placeholder='Select type...'
                            value={t(state.cardType.toLowerCase())}
                            options={[{
                                label: 'Virtual',
                                value: 'virtual',
                            }, {
                                label: 'Plastic',
                                value: 'plastic',
                            }]}
                            onSelect={(e) => setState({
	                            ...state,
	                            cardType: e.toUpperCase()
                            })}
                    />
                </div>
            </div>

            <div className='flex flex-row  justify-between items-center h-[40px]'>
                <span className={styles.mobRowItemTitle}>{`Cardholed name:`}</span>
                <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("cardholder name")} 
                    onChange={({target}) => setState({
                        ...state,
                        cardholderName: target.value
                    })}
                    value={state.cardholderName}
                />
            </div>

            <div className={styles.mobRowItem}>
                <span className={styles.mobRowItemTitle}>{`${t("linked_phone_number")}:`}</span>
                <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={"enter phone number"} 
                    onChange={({target}) => setState({
                        ...state,
                        linkedPhone: target.value
                    })}
                    value={state.linkedPhone}
                />
            </div>
            
            {state.cardType !== 'PLASTIC' ? null : (
            <div className='gap-[8px] flex flex-col'>
                <div className={styles.mobRowItem} style={{height: '50px'}} >
                    <div className={styles.mobIssueTitleGroup}>
                    <span className={styles.mobDeliveryTitle}>{t('delivery_address')}</span>
                    <span className={styles.mobDeliverySubtitle}>{t('same_as_the_residence_address')}</span>
                    </div>
                    <Switch
                    checked={state.isResidenceAddress}
                    onChange={switchResidenceAddress}
                    />
                </div>

                <div className={styles.mobRowItem}>
                    <span className={styles.mobRowItemTitle}>{t('city')}:</span>
                    <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("enter_city_name")} 
                        onChange={({target}) => setState({
                            ...state,
                            city: target.value
                        })}
                        value={state.city}
                    />
                </div>

                <div className={styles.mobRowItem}>
                    <span className={styles.mobRowItemTitle}>{t('post_code')}:</span>
                    <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("enter_post_code")} 
                        onChange={({target}) => setState({
                            ...state,
                            postalCode: target.value
                        })}
                        value={state.postalCode}
                    />
                </div>

                <div className={styles.mobRowItem}>
                    <span className={styles.mobRowItemTitle}>{t('street')}:</span>
                    <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("enter_street_name")} 
                        onChange={({target}) => setState({
                            ...state,
                            street: target.value
                        })}
                        value={state.street}
                    />
                </div>

                <div className={styles.mobRowItem}>
                    <span className={styles.mobRowItemTitle}>{t('house')}:</span>
                    <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("enter_house_number")} 
                        onChange={({target}) => setState({
                            ...state,
                            houseNumber: target.value
                        })}
                        value={state.houseNumber}
                    />
                </div>
                <div className={styles.mobRowItem}>
                    <span className={styles.mobRowItemTitle}>{t('flat')}:</span>
                    <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("enter_flat_number")} 
                        onChange={({target}) => setState({
                            ...state,
                            apartmentNumber: target.value
                        })}
                        value={state.apartmentNumber}
                    />
                </div>

                <div className={styles.mobRowItem}>
                    <span className={styles.mobRowItemTitle}>{t('recipient')}:</span>
                    <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("enter_recipient_name")} 
                        onChange={({target}) => setState({
                            ...state,
                            recipientName: target.value
                        })}
                        value={state.recipientName}
                    />
                </div>
            </div>)}
            <div className='h-[55px] flex flex-row w-full justify-center gap-2 pt-3'>
                <Button 
                    color='green'
                    onClick={() => {
                        setStep('ConfirmationNewCard');
                    }}
                >
                    {t("proceed")}   
                </Button>
                <Button skeleton color='gray' onClick={close}>
                    {t("back")}   
                </Button>
            </div>
        </div>
    </div>
}
