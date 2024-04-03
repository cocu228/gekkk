import { Box, Typography, TextField, styled } from '@mui/material';
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
        <Box display="flex" justifyContent="space-between" width="100%">
            <Typography fontSize={"16px"} variant="h3">Issue new card</Typography>
            <CloseWindowButton onClick={close}/>
        </Box>
        
        <Box display={"flex"} flexDirection={'column'} gap="12px" paddingTop={"12px"}>
            <RowItem hasBorderBottom /*hasBorderTop paddingTop={"12px"}*/>
                <Typography fontSize={"16px"} variant='b2 - bold' color="dark blue">{t('card_type')}</Typography>
                <Box width={"150px"} >
                    <Select className="w-full mt-2"
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

            <TextField label={'Cardholer name'} placeholder={t("enter_cardholder_name")} 
                onChange={({target}) => setState({
                    ...state,
                    cardholderName: target.value
                })}
                value={state.cardholderName}
            />
        
            <TextField label={t("linked_phone_number")} placeholder={t("enter_phone_number")} 
                onChange={({target}) => setState({
                    ...state,
                    linkedPhone: target.value
                })}
                value={state.linkedPhone}
            />

            {state.cardType !== 'PLASTIC' ? null : (<Box>
                <RowItem hasBorderBottom paddingTop={"8px"} alignItems={'flex-end'}>
                    <Box display={'flex'} flexDirection={"column"} gap="6px">
                        <Typography fontSize={"16px"} variant='b2 - bold' color="dark blue">{t('delivery_address')}</Typography>
                        <Typography fontSize={"16px"} variant='b2' color="dark blue">{t('same_as_the_residence_address')}</Typography>
                    </Box>
                    <Switch
                        checked={state.isResidenceAddress}
                        onChange={switchResidenceAddress}
                    />
                </RowItem>
                <Typography fontSize={"16px"} variant='b2 - bold' color="dark blue">{t('Country')}</Typography>
                <Box width={"250px"} marginBottom={'12px'}>
                    <SearchSelect
                        className="w-full mt-2"
                        placeholder='Select country...'
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
                    
                <TextField
                    fullWidth
                    margin={'normal'}
                    value={state.city}
                    onChange={({target}) => setState({
                        ...state,
                        city: target.value
                    })}
                    label={t("city")}
                    placeholder={t("enter_city_name")}
                />

                <TextField
                    fullWidth
                    margin={'normal'}
                    label={t("post_code")}
                    value={state.postalCode}
                    placeholder={t("enter_post_code")}
                    onChange={({target}) => setState({
                        ...state,
                        postalCode: target.value
                    })}
                />

                <TextField
                    fullWidth
                    margin={'normal'}
                    label={t("street")}
                    value={state.street}
                    placeholder={t("enter_street_name")}
                    onChange={({target}) => setState({
                        ...state,
                        street: target.value
                    })}
                />

                <TextField
                    fullWidth
                    margin={'normal'}
                    value={state.houseNumber}
                    label={t("house")}
                    placeholder={t("enter_house_name_or_number_if_available")}
                    onChange={({target}) => setState({
                        ...state,
                        houseNumber: target.value
                    })}
                />

                <TextField
                    fullWidth
                    margin={'normal'}
                    value={state.apartmentNumber}
                    label={t("flat")}
                    placeholder={t("enter_flat_name_or_number_if_available")}
                    onChange={({target}) => setState({
                        ...state,
                        apartmentNumber: target.value
                    })}
                />

                <TextField
                    fullWidth
                    margin={'normal'}
                    value={state.recipientName}
                    onChange={({target}) => setState({
                        ...state,
                        recipientName: target.value
                    })}
                    label={t("Recipient")}
                    placeholder={t("enter_recipient_name_if_necessary")}
                />
            </Box>)}
        </Box>
        
        <Box display={"flex"} gap="24px" paddingTop={"48px"}>
            <Button className='w-full'
                    disabled={!isValid}
                    onClick={() => {
                        setStep('ConfirmationNewCard');
                    }}
            >{t("proceed")}</Button>
            <Button gray onClick={close}>{t("back")}</Button>
        </Box>
    </div>
}
