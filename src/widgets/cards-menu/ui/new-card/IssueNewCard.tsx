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
import s from './styles.module.scss'

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
        <div className={s.issueHeader}>
            <h3 className={s.issueTitle}>{t("issue_new_card")}</h3>
            <CloseWindowButton onClick={close}/>
        </div>
        <div className={s.issueBody}>
            <div className={`${s.issueRowItem} ${s.issueRowItemBorder}`}>
                <span className={s.rowItemTitle}>{t('card_type')}</span>
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
            
            <div className={`${s.issueRowItem} ${s.issueRowItemBorder}`}>
                <div className={s.inputWrap}>
                    <span className={s.inputTitle}>{t("cardholder_name")}</span>
                    <input 
                    onChange={({target}) => setState({
                        ...state,
                        cardholderName: target.value
                    })}
                    value={state.cardholderName}
                        placeholder={t("enter_cardholder_name")} 
                        className={s.issue_inp}
                    />
                </div>
            </div>       
            <div className={`${s.issueRowItem} ${s.issueRowItemBorder}`}>
                <div className={s.inputWrap}>
                    <span className={s.inputTitle}>{t("linked_phone_number")}</span>
                    <input
                        className={s.issue_inp}
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
                <div className={`${s.issueRowItem} ${s.issueRowItemBorder}`}>
                    <div className={s.issueTextGroup}>
                        <span className={s.issueTextGroupTitle}>{t('delivery_address')}</span>
                        <span className={s.issueTextGroupSubtitle}>{t('same_as_the_residence_address')}</span>
                    </div>
                    <Switch
                        checked={state.isResidenceAddress}
                        onChange={switchResidenceAddress}
                    />
                </div>
                <span className={s.issueTextGroupTitle}>{t('country')}</span>
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
                    
                <div className={`${s.issueRowItem} ${s.issueRowItemBorder}`}>
                    <div className={s.inputWrap}>
                        <span className={s.inputTitle}>{t("city")}</span>
                        <input 
                            value={state.city}
                            onChange={({target}) => setState({
                                ...state,
                                city: target.value
                            })}
                            placeholder={t("enter_city_name")}
                            className={s.issue_inp}
                        />
                    </div>
                </div>

                <div className={`${s.issueRowItem} ${s.issueRowItemBorder}`}>
                    <div className={s.inputWrap}>
                        <span className={s.inputTitle}>{t("post_code")}</span>
                        <input 
                            value={state.postalCode}
                            placeholder={t("enter_post_code")}
                            onChange={({target}) => setState({
                                ...state,
                                postalCode: target.value
                            })}
                            className={s.issue_inp}
                        />
                    </div>
                </div>
                <div className={`${s.issueRowItem} ${s.issueRowItemBorder}`}>
                    <div className={s.inputWrap}>
                        <span className={s.inputTitle}>{t("street")}</span>
                        <input 
                            value={state.street}
                            placeholder={t("enter_street_name")}
                            onChange={({target}) => setState({
                                ...state,
                                street: target.value
                            })}
                            className={s.issue_inp}
                        />
                    </div>
                </div>
                <div className={`${s.issueRowItem} ${s.issueRowItemBorder}`}>
                    <div className={s.inputWrap}>
                        <span className={s.inputTitle}>{t("house")}</span>
                        <input 
                            value={state.houseNumber}
                            placeholder={t("enter_house_name_or_number_if_available")}
                            onChange={({target}) => setState({
                                ...state,
                                houseNumber: target.value
                            })}
                            className={s.issue_inp}
                        />
                    </div>
                </div>

                <div className={`${s.issueRowItem} ${s.issueRowItemBorder}`}>
                    <div className={s.inputWrap}>
                        <span className={s.inputTitle}>{t("flat")}</span>
                        <input 
                            value={state.apartmentNumber}
                            placeholder={t("enter_flat_name_or_number_if_available")}
                            onChange={({target}) => setState({
                                ...state,
                                apartmentNumber: target.value
                            })}
                            className={s.issue_inp}
                        />
                    </div>
                </div>

                <div className={`${s.issueRowItem} ${s.issueRowItemBorder}`}>
                    <div className={s.inputWrap}>
                        <span className={s.inputTitle}>{t("recipient")}</span>
                        <input 
                            value={state.recipientName}
                            placeholder={t("enter_recipient_name_if_necessary")}
                            onChange={({target}) => setState({
                                ...state,
                                recipientName: target.value
                            })}
                            className={s.issue_inp}
                        />
                    </div>
                </div>
            </div>)}
        </div>
        <div className={s.issueFooter}>
            <Button className='w-full'
                    disabled={!isValid}
                    onClick={() => {
                        setStep('ConfirmationNewCard');
                    }}
            >{t("proceed")}</Button>
            <Button gray onClick={close}>{t("back")}</Button>
        </div>
    </div>
}
