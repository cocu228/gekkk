import { Box, Typography, TextField, styled } from '@mui/material';
import { useNewCardContext } from './newCardContext';
import Button from '@/shared/ui/button/Button';
import { Typography as Tp } from '@/shared/ui/typography/typography';
import {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import {ValidateOrderCardState} from "@/widgets/cards-menu/model/helpers";
import {deliveryCountriesList} from "@/shared/config/delivery-coutries-list";
import SearchSelect from "@/shared/ui/search-select/SearchSelect";
import {CloseWindowButton} from "@/shared/ui/CloseWindowButton";
import {Switch} from "antd";
import { MobileInput } from '@/shared/ui/mobile-input/mobile-input';
import { MobileButton } from '@/shared/ui/mobile-button/mobile-button';

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
        <Box display={"flex"} flexDirection={'column'} gap="12px" paddingTop={"12px"} sx={{
            'backgroundColor': '#ffffff',
            'width': '100%',
            borderRadius: '10px',
            padding: '10px 20px'
        }}>
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
            <RowItem marginTop={"8px"} height={'40px'}>
                <Typography fontSize={"14px"} variant='b2 - bold' color="dark blue">{t('Country')}:</Typography>
                <Box width={"170px"} height={'40px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <SearchSelect
                        isMobile
                        className="w-full"
                        placeholder='Select country'
                        value={state.countryCode}
                        notFoundContent={<span>Country not found</span>}
                        options={deliveryCountriesList.map(c => ({
                            label: c.name,
                            value: c.code
                        }))}
                        onSelect={(code) => setState({
                            ...state,
                            countryCode: code
                        })}
                    />
                </Box>
            </RowItem>
            

            <div className='flex flex-row  justify-between items-center h-[40px]'>
                <Tp variant='h'>{`${t("City")}:`}</Tp>
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
            
            <div className='h-[55px] flex flex-row w-full justify-center gap-2 pt-3'>
                <MobileButton 
                    varitant={'light'} 
                    className='w-[140px]'
                    onClick={() => {
                        setStep('ConfirmationNewCard');
                    }}
                >
                    {t("proceed")}   
                </MobileButton>
                <MobileButton varitant='outline' className='w-[140px]' onClick={close}>
                    Back   
                </MobileButton>
            </div>
        </Box>
        {/* <Box display={"flex"} gap="24px" paddingTop={"48px"}>
            <Button className='w-full'
                    disabled={!isValid}
                    onClick={() => {
                        setStep('ConfirmationNewCard');
                    }}
            >{t("proceed")}</Button>
            <Button gray onClick={close}>Back</Button>
        </Box> */}
    </div>
}
