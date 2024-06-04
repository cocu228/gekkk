import styles from './styles.module.scss';
import {Switch} from '@/shared/ui/Switch';
import Input from '@/shared/ui/input/Input';
import ExtendedSelect from '../../selector';
import {useTranslation} from 'react-i18next';
import Button from '@/shared/ui/button/Button';
import {useOrderCardContext} from '../../../model/context';
import BankCard from '@/widgets/dashboard/ui/cards/bank-card/BankCard';
import { deliveryCountriesList } from '@/shared/config/delivery-coutries-list';

export function DeliveryInfo() {
    const {t} = useTranslation();
    const {
        state,
        close,
        setStep,
        setState,
        switchResidenceAddress
    } = useOrderCardContext();
    
    return <>
        <div className={styles.DesignContainer}>
            <span className={styles.DesignTitle}>{t('select_card_design')}: </span>
            <BankCard cardNumber='5270 0000 0000 0000' expiresAt='00/00' holderName='CARDHOLDER'/>
        </div>

        <ExtendedSelect
            className='mt-4'
            label={t('country')}
            placeholder={t("select_country")}
            value={state.countryCode}
            options={deliveryCountriesList.map(c => ({
                label: c.name,
                value: c.code
            }))}
            onSelect={(code) => setState({
                ...state,
                countryCode: code
            })}
            preContent={
                <div className={styles.SwitchContainer}>
                    <div className={styles.SwitchTitleContainer}>
                        <span className={styles.SwitchTitle}>{t('delivery_address')}</span>
                        <span className={styles.SwitchSubtitle}>{t('same_as_the_residence_address')}</span>
                    </div>
                    <Switch
                        onChange={switchResidenceAddress}
                        defaultCheked={state.isResidenceAddress}
                    />
                </div>
            }
        >
            <div className={styles.Container}>
                <div>
                    <div className={styles.Label}>{t("city")}:</div>
                    <Input
                        value={state.city}
                        placeholder={`-${t('enter_city_name').toLowerCase()}-`} 
                        onChange={({target}) => setState({
                            ...state,
                            city: target.value
                        })}
                    />
                </div>

                <div>
                    <div className={styles.Label}>{t("post_code")}:</div>
                    <Input
                        value={state.postalCode}
                        placeholder={`-${t('enter_post_code').toLowerCase()}-`} 
                        onChange={({target}) => setState({
                            ...state,
                            postalCode: target.value
                        })}
                    />
                </div>

                <div>
                    <div className={styles.Label}>{t("street")}:</div>
                    <Input
                        value={state.street}
                        placeholder={`-${t('enter_street_name').toLowerCase()}-`} 
                        onChange={({target}) => setState({
                            ...state,
                            street: target.value
                        })}
                    />
                </div>

                <div>
                    <div className={styles.Label}>{t("house")}:</div>
                    <Input
                        value={state.houseNumber}
                        placeholder={`-${t('enter_house_number').toLowerCase()}-`} 
                        onChange={({target}) => setState({
                            ...state,
                            houseNumber: target.value
                        })}
                    />
                </div>

                <div>
                    <div className={styles.Label}>{t("flat")}:</div>
                    <Input
                        value={state.apartmentNumber}
                        placeholder={`-${t('enter_flat_number').toLowerCase()}-`} 
                        onChange={({target}) => setState({
                            ...state,
                            apartmentNumber: target.value
                        })}
                    />
                </div>

                <div>
                    <div className={styles.Label}>{t("recipient")}:</div>
                    <Input
                        value={state.recipientName}
                        placeholder={`-${t('enter_recipient_name').toLowerCase()}-`} 
                        onChange={({target}) => setState({
                            ...state,
                            recipientName: target.value
                        })}
                    />
                </div>

                <div className='h-[55px] flex flex-row w-full justify-center gap-2 pt-3'>
                    <Button 
                        color='green'
                        className='w-full'
                        onClick={() => setStep('OrderConfirmation')}
                    >
                        {t("proceed")}   
                    </Button>

                    <Button
                        skeleton
                        color='green'
                        className='w-full'
                        onClick={() => state.cardholderName
                            ? setStep('IssueNewCard')
                            : close()
                        }
                    >
                        {t("back")}   
                    </Button>
                </div>
            </div>
        </ExtendedSelect>
    </>
}
