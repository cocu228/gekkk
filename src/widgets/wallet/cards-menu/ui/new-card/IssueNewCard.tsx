import { Box, Typography, TextField, styled } from '@mui/material';
import { CloseWindowButton } from "@/shared/ui/CloseWindowButton";
import { useNewCardContext } from './newCardContext';
import { CardDesign } from './CardDesign';
import {Switch} from "antd";
import Button from '@/shared/ui/button/Button';
import Select from '@/shared/ui/select/Select';
import {useState} from "react";
import { useTranslation } from 'react-i18next';
import useMask from "@/shared/model/hooks/useMask";
import {MASK_PHONE} from "@/shared/config/mask";

const RowItem = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'hasBorderTop' && prop !== 'hasBorderBottom',
})<{ hasBorderTop?: boolean, hasBorderBottom?: boolean }>(
({ theme, hasBorderTop, hasBorderBottom }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: hasBorderTop ? `1px solid ${theme.palette.strokes}` : undefined,
    borderBottom: hasBorderBottom ? `1px solid ${theme.palette.strokes}` : undefined,
    paddingBottom: '6px',
    alignItems: 'center',

}),
);

export function IssueNewCard() {
    const {t} = useTranslation();
    const {
        onInput: onPhoneNumberInput
    } = useMask(MASK_PHONE);
    const {
        state,
        setStep,
        setState
    } = useNewCardContext();
    
    return <>
        {/*<Box>*/}
        {/*    <Typography fontSize={"16px"} variant='b2 - bold'>{t("card_design")}</Typography>*/}
        {/*</Box>*/}
        {/*<Box display={"flex"} flexWrap={"wrap"} gap="48px" paddingTop={"12px"}>*/}
        {/*    <CardDesign*/}
        {/*        title="Standard"*/}
        {/*        description="Standard card is so good that you will love it because it is so good. Is it enough space for description or not really"*/}
        {/*        isSelected={true}*/}
        {/*        image={<img width={116} src="/img/GekkardCard.png" alt="GekkardCardPreview"/>}*/}
        {/*    />*/}
        {/*    <CardDesign*/}
        {/*        title="Other type card"*/}
        {/*        description="The other type description"*/}
        {/*        isSelected={false}*/}
        {/*        image={<img width={116} src="/img/GekkardCard.png" alt="GekkardCardPreview"/>}*/}
        {/*    />*/}
        {/*</Box>*/}
        <Box display={"flex"} flexDirection={'column'} gap="12px" paddingTop={"12px"}>
            <RowItem hasBorderBottom /*hasBorderTop paddingTop={"12px"}*/>
                <Typography fontSize={"16px"} variant='b2 - bold' color="dark blue">{t('card_type')}</Typography>
                <Box width={"150px"} >
                    <Select className="w-full mt-2"
                            placeholder='Select type...'
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
            
            <TextField
                fullWidth
                label={t('cardholder_name')}
                placeholder={t("enter_cardholder_name")}
                onChange={({target}) => setState({
                    ...state,
                    cardholderName: target.value
                })}
            />
            
            <TextField
                fullWidth
                onInput={onPhoneNumberInput}
                label={t('linked_phone_number')}
                placeholder={t("enter_phone_number")}
                onChange={({target}) => setState({
                    ...state,
                    linkedPhone: target.value
                })}
            />
            
            {state.cardType !== 'PLASTIC' ? null : (<Box>
                {/*<RowItem hasBorderBottom paddingTop={"8px"} alignItems={'flex-end'}>*/}
                {/*    <Box display={'flex'} flexDirection={"column"} gap="6px">*/}
                {/*        <Typography fontSize={"16px"} variant='b2 - bold' color="dark blue">{t('delivery_address')}</Typography>*/}
                {/*        <Typography fontSize={"16px"} variant='b2' color="dark blue">{t('same_as_the_residence_address')}</Typography>*/}
                {/*    </Box>*/}
                {/*    <Switch />*/}
                {/*</RowItem>*/}
                
                <TextField
                    fullWidth
                    label={t('Country')}
                    placeholder={t("enter_country_name")}
                />
                
                <TextField
                    fullWidth
                    label={t("City")}
                    placeholder={t("enter_city_name")}
                />
                
                <TextField
                    fullWidth
                    label={t("Region")}
                    placeholder={t("enter_region_name_if_available")}
                />
                
                <TextField
                    fullWidth
                    label={t("post_code")}
                    placeholder={t("enter_post_code")}
                />
                
                <TextField
                    fullWidth
                    label={t("street")}
                    placeholder={t("enter_street_name")}
                />
                
                <TextField
                    fullWidth
                    label={t("house")}
                    placeholder={t("enter_house_name_or_number_if_available")}
                />
                
                <TextField
                    fullWidth
                    label={t("flat")}
                    placeholder={t("enter_flat_name_or_number_if_available")}
                />
                
                <RowItem hasBorderBottom>
                    <Typography fontSize={"16px"} variant='b2 - bold' color="dark blue">{t('delivery_type')}</Typography>
                    <Box width={"150px"} >
                        <Select className="w-full mt-2"
                                placeholder='Select type...'
                                options={[{
                                    label: 'Standard',
                                    value: 'standard',
                                }, {
                                    label: 'Express',
                                    value: 'express',
                                }]}
                                onSelect={(e: 'express' | 'standard') => setState({
                                    ...state,
                                    isExpressDelivery: e === 'express'
                                })}/>
                    </Box>
                </RowItem>
            </Box>)}
        </Box>
        
        <Box display={"flex"} gap="24px" paddingTop={"48px"}>
            <Button className='w-full' onClick={() => {
                setStep('ConfirmationNewCard');
            }}>{t("proceed")}</Button>
        </Box>
    </>
}
