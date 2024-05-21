import { useNewCardContext } from './newCardContext';
import {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import {ValidateOrderCardState} from "@/widgets/cards-menu/model/helpers";
import {deliveryCountriesList} from "@/shared/config/delivery-coutries-list";
import SearchSelect from "@/shared/ui/search-select/SearchSelect";
import {Switch} from "antd";
import { MobileInput } from '@/shared/ui/mobile-input/mobile-input';
import styles from '../style.module.scss'
import Button from '@/shared/ui/button/Button';

export function IssueNewCardMobile() {
    const {t} = useTranslation();
    const [isValid, validate] = useState<boolean>(false);
    const {
        state,
        close,
        setStep,
        setState,
        switchResidenceAddress
    } = useNewCardContext();
    
    useEffect(() => {
        validate(ValidateOrderCardState(state));
    }, [state]);
    
    return <div className='w-full'>
        <div className={styles.mobIssueCardWrap}>
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
                <span className={styles.mobRowItemTitle}>{t('country')}:</span>
                <div className={styles.mobSelectWrap}>
                    <SearchSelect
                        className="w-full"
                        placeholder={t("select_country")}
                        value={state.countryCode}
                        notFoundContent={<span>{t("country_not_found")}</span>}
                        options={deliveryCountriesList.map(c => ({
                            label: c.name,
                            value: c.code
                        }))}
                        onSelect={(code) => setState({
                            ...state,
                            countryCode: code
                        })}
                    />
                </div>
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
            
            <div className={styles.mobIssueFooter}>
                <Button 
                    color="green"
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
