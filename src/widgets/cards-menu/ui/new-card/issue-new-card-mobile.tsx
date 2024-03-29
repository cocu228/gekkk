import { Box, Typography, TextField, styled } from '@mui/material';
import { useNewCardContext } from './newCardContext';
import Button from '@/shared/ui/button/Button';
import Select from '@/shared/ui/select/Select';
import {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import useMask from "@/shared/model/hooks/useMask";
import {MASK_PHONE} from "@/shared/config/mask";
import {ValidateNewCardState} from "@/widgets/cards-menu/model/helpers";
import {deliveryCountriesList} from "@/shared/config/delivery-coutries-list";
import SearchSelect from "@/shared/ui/search-select/SearchSelect";
import {CloseWindowButton} from "@/shared/ui/CloseWindowButton";
import {Switch} from "antd";
import { Typography as Tp } from '@/shared/ui/typography/typography';
import { MobileInput } from '@/shared/ui/mobile-input/mobile-input';
import { MobileButton } from '@/shared/ui/mobile-button/mobile-button';
import styles from './styles.module.scss';

const RowItem = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'hasBorderTop' && prop !== 'hasBorderBottom',
})<{ hasBorderTop?: boolean, hasBorderBottom?: boolean }>(({
    theme,
    hasBorderTop,
    hasBorderBottom
}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: hasBorderTop ? `1px solid ${theme.palette.strokes}` : undefined,
    borderBottom: hasBorderBottom ? `1px solid ${theme.palette.strokes}` : undefined,
    paddingBottom: '6px',
    alignItems: 'center',
}));

export function IssueNewCardMobile() {
    const {t} = useTranslation();
    const [isValid, validate] = useState<boolean>(false);
    const {onInput: onPhoneNumberInput} = useMask(MASK_PHONE);
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
        <div className='flex flex-col items-center justify-center w-full py-5'>
            <span className={`flex typography-b1 ${styles.selectDesign} pb-4`}>Select card design: </span>
            <div className={`${styles.BankCard} `}>
                    <img
                        src='/img/payment-card/payment-card-background2.jpg'
                        className='rounded-[10px]'
                    />
                </div>
        </div>
        <Box display={"flex"} flexDirection={'column'} gap="3px" paddingTop={"12px"} sx={{
            'backgroundColor': '#ffffff',
            'width': '100%',
            borderRadius: '10px',
            padding: '10px 20px'}}
        >
            <RowItem marginTop={"8px"} height={'40px'}>
                <Typography fontSize={"14px"} variant='b2 - bold' color="dark blue">{t('card_type')}:</Typography>
                <Box width={"170px"} height={'40px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <SearchSelect className="w-full mt-2 max-h-[50px]"
                            isMobile
                            placeholder='Select type...'
                            value={state.cardType.toLowerCase()}
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
                </Box>
            </RowItem>

            <div className='flex flex-row  justify-between items-center h-[40px]'>
                <Tp variant='h' className='leading-1'>{`Cardholed name:`}</Tp>
                <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("enter_city_name")} 
                    onChange={({target}) => setState({
                        ...state,
                        cardholderName: target.value
                    })}
                    value={state.cardholderName}
                />
            </div>
            
            <div className='flex flex-row  justify-between items-center h-[40px]'>
                <Tp variant='h' className='leading-1'>{`${t("linked_phone_number")}:`}</Tp>
                <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("enter_phone_number")} 
                    onChange={({target}) => setState({
                        ...state,
                        linkedPhone: target.value
                    })}
                    value={state.linkedPhone}
                />
            </div>
            
            {state.cardType !== 'PLASTIC' ? null : (<Box gap={'8px'}>
                <RowItem  paddingTop={"8px"} alignItems={'flex-end'} height={'50px'}>
                <Box display={'flex'} flexDirection={"column"} gap="1px">
                    <Typography fontSize={"14px"} variant='b2 - bold' color="dark blue">{t('delivery_address')}</Typography>
                    <Typography fontWeight={'300'} fontSize={"12px"} variant='b2' color="dark blue">{t('same_as_the_residence_address')}</Typography>
                </Box>
                <Switch
                    checked={state.isResidenceAddress}
                    onChange={switchResidenceAddress}
                />
            </RowItem>
            <div className='flex flex-row  justify-between items-center h-[40px]'>
                <Tp variant='h'>{`${t("city")}:`}</Tp>
                <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("enter_city_name")} 
                    onChange={({target}) => setState({
                        ...state,
                        city: target.value
                    })}
                    value={state.city}
                />
            </div>
            <div className='flex flex-row  justify-between items-center h-[40px]'>
                <Tp variant='h'>{`${t("post_code")}:`}</Tp>
                <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("enter_post_code")} 
                    onChange={({target}) => setState({
                        ...state,
                        postalCode: target.value
                    })}
                    value={state.postalCode}
                />
            </div>
            <div className='flex flex-row  justify-between items-center h-[40px]'>
                <Tp variant='h'>{`${t("street")}:`}</Tp>
                <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={t("enter_street_name")} 
                    onChange={({target}) => setState({
                        ...state,
                        street: target.value
                    })}
                    value={state.street}
                />
            </div>
            <div className='flex flex-row  justify-between items-center h-[40px]'>
                <Tp variant='h'>{`${t("house")}:`}</Tp>
                <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={'Enter house number'} 
                    onChange={({target}) => setState({
                        ...state,
                        houseNumber: target.value
                    })}
                    value={state.houseNumber}
                />
            </div>
            
            <div className='flex flex-row  justify-between items-center h-[40px]'>
                <Tp variant='h'>{`${t("flat")}:`}</Tp>
                <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={'Enter flat number'} 
                    onChange={({target}) => setState({
                        ...state,
                        apartmentNumber: target.value
                    })}
                    value={state.apartmentNumber}
                />
            </div>
            
            <div className='flex flex-row  justify-between items-center h-[40px]'>
                <Tp variant='h'>{`${t("Recipient")}:`}</Tp>
                <MobileInput className='w-[170px]' wrapperClassName='w-[170px]' placeholder={'Enter recipient name'} 
                    onChange={({target}) => setState({
                        ...state,
                        recipientName: target.value
                    })}
                    value={state.recipientName}
                />
            </div>
            </Box>)}
            <div className='h-[55px] flex flex-row w-full justify-center gap-2 pt-3'>
                <MobileButton 
                    varitant={state.cardholderName ? 'light' : 'disabeled'} 
                    className='w-[140px]'
                    onClick={() => {
                        setStep('ConfirmationNewCard');
                    }}
                >
                    {t("proceed")}   
                </MobileButton>
                <MobileButton varitant='outline' className='w-[140px]' onClick={close}>
                    {t("back")}   
                </MobileButton>
            </div>
        </Box>
    </div>
}
