import styles from './styles.module.scss';
import Input from '@/shared/ui/input/Input';
import ExtendedSelect from '../../selector';
import {useTranslation} from 'react-i18next';
import Button from '@/shared/ui/button/Button';
import {useOrderCardContext} from '../../../model/context';
import BankCard from '@/widgets/dashboard/ui/cards/bank-card/BankCard';

export function IssueNewCard({closable}: {closable: boolean}) {
    const {t} = useTranslation();
    const {
        state,
        close,
        setStep,
        setState
    } = useOrderCardContext();
    
    return <>
        <div className={styles.DesignContainer}>
            <span className={styles.DesignTitle}>{t('select_card_design')}: </span>
            <BankCard cardNumber='5270 0000 0000 0000' expiresAt='00/00' holderName='CARDHOLDER'/>
        </div>

        <ExtendedSelect
            className='mt-4'
            label='Card type:'
            value={state.cardType}
            onSelect={(v: 'VIRTUAL' | 'PLASTIC') => setState({
                ...state,
                cardType: v
            })}
            options={[{
                label: t('virtual'),
                value: 'VIRTUAL',
            }, {
                label: t('plastic'),
                value: 'PLASTIC',
            }]}
        >
            <div className={styles.Container}>
                {state.card ? null : <>
                    <div>
                        <div className={styles.Label}>{t("cardholder_name")}:</div>
                        <Input
                            value={state.cardholderName}
                            placeholder={'-enter name-'} 
                            onChange={({target}) => setState({
                                ...state,
                                cardholderName: target.value
                            })}
                        />
                    </div>

                    <div>
                        <div className={styles.Label}>{t("linked_phone_number")}:</div>
                        <Input
                            allowDigits
                            allowSymbols
                            value={state.linkedPhone}
                            placeholder={"-enter phone number-"} 
                            onChange={({target}) => setState({
                                ...state,
                                linkedPhone: target.value
                            })}
                        />
                    </div>
                </>}

                <div className='h-[55px] flex flex-row w-full justify-center gap-2 pt-3'>
                    <Button 
                        color='green'
                        className='w-full'
                        disabled={!state.cardholderName || !state.linkedPhone}
                        // If plastic card, we need delivery information
                        // Otherwise, we can proceed to confirmation
                        onClick={() => state.cardType === 'PLASTIC'
                            ? setStep('DeliveryInfo')
                            : setStep('OrderConfirmation')
                        }
                    >
                        {t("proceed")}   
                    </Button>

                    {closable && (
                        <Button
                            skeleton
                            color='green'
                            onClick={close}
                            className='w-full'
                        >
                            {t("back")}   
                        </Button>
                    )}
                </div>
            </div>
        </ExtendedSelect>
    </>
}
