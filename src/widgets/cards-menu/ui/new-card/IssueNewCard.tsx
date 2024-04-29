import { useNewCardContext } from './newCardContext';
import Button from '@/shared/ui/button/Button';
import {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import {ValidateNewCardState} from "@/widgets/cards-menu/model/helpers";
import {deliveryCountriesList} from "@/shared/config/delivery-coutries-list";
import SearchSelect from "@/shared/ui/search-select/SearchSelect";
import {CloseWindowButton} from "@/shared/ui/CloseWindowButton";
import {Switch} from "antd";
import Select from '@/shared/ui/select/Select';
import styles from './styles.module.scss'

export function IssueNewCard() {
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
        validate(ValidateNewCardState(state));
    }, [state]);
    
    return <div>
        <div className={styles.issueHeader}>
            <h3 className={styles.issueTitle}>{t("issue_new_card")}</h3>
            <CloseWindowButton onClick={close}/>
        </div>
        <div className={styles.issueBody}>
            <div className={`${styles.issueRowItem} ${styles.issueRowItemBorder}`}>
                <span className={styles.rowItemTitle}>{t('card_type')}</span>
                <div className='w-[150px]'>
                    <Select className="w-full mt-2"
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
            
            <div className={`${styles.issueRowItem} ${styles.issueRowItemBorder}`}>
                <div className={styles.inputWrap}>
                    <span className={styles.inputTitle}>{t("cardholder_name")}</span>
                    <input 
                    onChange={({target}) => setState({
                        ...state,
                        cardholderName: target.value
                    })}
                    value={state.cardholderName}
                        placeholder={t("enter_cardholder_name")} 
                        className={styles.issue_inp}
                    />
                </div>
            </div>       
            <div className={`${styles.issueRowItem} ${styles.issueRowItemBorder}`}>
                <div className={styles.inputWrap}>
                    <span className={styles.inputTitle}>{t("linked_phone_number")}</span>
                    <input
                        className={styles.issue_inp}
                        onChange={({target}) => setState({
                            ...state,
                            linkedPhone: target.value
                        })}
                        placeholder={t("auth.enter_phone_number")} 
                        value={state.linkedPhone}
                    />
                </div>
            </div>
            {state.cardType !== 'PLASTIC' ? null : (<div className='flex flex-col gap-[12px]'>
                <div className={`${styles.issueRowItem} ${styles.issueRowItemBorder}`}>
                    <div className={styles.issueTextGroup}>
                        <span className={styles.issueTextGroupTitle}>{t('delivery_address')}</span>
                        <span className={styles.issueTextGroupSubtitle}>{t('same_as_the_residence_address')}</span>
                    </div>
                    <Switch
                        checked={state.isResidenceAddress}
                        onChange={switchResidenceAddress}
                    />
                </div>
                <span className={styles.issueTextGroupTitle}>{t('country')}</span>
                <div className='w-[250px] mb-[12px]'>
                    <SearchSelect
                        className="w-full mt-2"
                        placeholder={t("select_country")+"..."}
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
                    
                <div className={`${styles.issueRowItem} ${styles.issueRowItemBorder}`}>
                    <div className={styles.inputWrap}>
                        <span className={styles.inputTitle}>{t("city")}</span>
                        <input 
                            value={state.city}
                            onChange={({target}) => setState({
                                ...state,
                                city: target.value
                            })}
                            placeholder={t("enter_city_name")}
                            className={styles.issue_inp}
                        />
                    </div>
                </div>

                <div className={`${styles.issueRowItem} ${styles.issueRowItemBorder}`}>
                    <div className={styles.inputWrap}>
                        <span className={styles.inputTitle}>{t("post_code")}</span>
                        <input 
                            value={state.postalCode}
                            placeholder={t("enter_post_code")}
                            onChange={({target}) => setState({
                                ...state,
                                postalCode: target.value
                            })}
                            className={styles.issue_inp}
                        />
                    </div>
                </div>
                <div className={`${styles.issueRowItem} ${styles.issueRowItemBorder}`}>
                    <div className={styles.inputWrap}>
                        <span className={styles.inputTitle}>{t("street")}</span>
                        <input 
                            value={state.street}
                            placeholder={t("enter_street_name")}
                            onChange={({target}) => setState({
                                ...state,
                                street: target.value
                            })}
                            className={styles.issue_inp}
                        />
                    </div>
                </div>
                <div className={`${styles.issueRowItem} ${styles.issueRowItemBorder}`}>
                    <div className={styles.inputWrap}>
                        <span className={styles.inputTitle}>{t("house")}</span>
                        <input 
                            value={state.houseNumber}
                            placeholder={t("enter_house_name_or_number_if_available")}
                            onChange={({target}) => setState({
                                ...state,
                                houseNumber: target.value
                            })}
                            className={styles.issue_inp}
                        />
                    </div>
                </div>

                <div className={`${styles.issueRowItem} ${styles.issueRowItemBorder}`}>
                    <div className={styles.inputWrap}>
                        <span className={styles.inputTitle}>{t("flat")}</span>
                        <input 
                            value={state.apartmentNumber}
                            placeholder={t("enter_flat_name_or_number_if_available")}
                            onChange={({target}) => setState({
                                ...state,
                                apartmentNumber: target.value
                            })}
                            className={styles.issue_inp}
                        />
                    </div>
                </div>

                <div className={`${styles.issueRowItem} ${styles.issueRowItemBorder}`}>
                    <div className={styles.inputWrap}>
                        <span className={styles.inputTitle}>{t("recipient")}</span>
                        <input 
                            value={state.recipientName}
                            placeholder={t("enter_recipient_name_if_necessary")}
                            onChange={({target}) => setState({
                                ...state,
                                recipientName: target.value
                            })}
                            className={styles.issue_inp}
                        />
                    </div>
                </div>
            </div>)}
        </div>
        <div className={styles.issueFooter}>
            <Button className='w-full'
                    disabled={!isValid}
                    onClick={() => {
                        setStep('ConfirmationNewCard');
                    }}
            >{t("proceed")}</Button>
            <Button variant='gray' onClick={close}>{t("back")}</Button>
        </div>
    </div>
}
