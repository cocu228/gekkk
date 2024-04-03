import {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@/shared/ui/button/Button';
import {useNewCardContext} from './newCardContext';
import {CtxRootData} from "@/processes/RootContext";
import {Box, Typography, styled, TextField} from '@mui/material';
import {apiOrderNewCard} from "@/shared/api/bank/order-new-card";
import Select from "@/shared/ui/select/Select";
import {getAddressPartOrEmpty} from "@/widgets/cards-menu/model/helpers";
import {deliveryCountriesList} from "@/shared/config/delivery-coutries-list";
import {apiDeliveryOptions, IDeliveryOption} from "@/shared/api/bank/get-delivery-options";
import Loader from "@/shared/ui/loader";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";
import {CloseWindowButton} from "@/shared/ui/CloseWindowButton";
import {Format} from '@/shared/(orval)api/gek/model';
import {apiGetUas} from '@/shared/(orval)api';
import {storeAccountDetails} from '@/shared/store/account-details/accountDetails';
import {IResResult} from '@/shared/api';
import useError from '@/shared/model/hooks/useError';

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
    borderBottom: hasBorderBottom ? `1px solid ${theme.palette.strokes}` : undefined
}));

export function ConfirmationNewCard() {
    const {t} = useTranslation();
    const {account} = useContext(CtxRootData);
    const {getAccountDetails} = storeAccountDetails();
    const [loading, setLoading] = useState<boolean>(false);
    const mainCard = storeActiveCards(state => state.mainCard);
    const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
    const [deliveryOption, setDeliveryOption] = useState<IDeliveryOption>(null);
    const {
        state,
        close,
        setStep,
        setState
    } = useNewCardContext();
    
    useEffect(() => {
        (async () => {
            if (state.cardType === 'PLASTIC') {
                const {data} = await apiDeliveryOptions();

                setDeliveryOption(data.find(o => o.countryCode === state.countryCode))
            }
        })();
    }, []);

    const onConfirm = async () => {
        setLoading(true);
        localErrorClear();

        const {data} = await apiGetUas();
        const {phone} = await getAccountDetails();

        const result = await apiOrderNewCard({
            format: state.cardType,
            type: mainCard !== null ? "ADDITIONAL" : "MAIN",
            accountId: account.account_id,
            cardHolderName: state.cardholderName,
            cardHolderPhoneNumber: state.linkedPhone,
            
            ...(state.cardType === "PLASTIC" ? {
                isExpressDelivery: state.isExpressDelivery,
                deliveryAddress: {
                    city: state.city,
                    street: state.street,
                    postalCode: state.postalCode,
                    countryCode: state.countryCode,
                    streetNumber: state.houseNumber,
                    recipientName: state.recipientName,
                    apartmentNumber: state.apartmentNumber
                }
            } : {})
        }, {
            headers: {
                Authorization: phone,
                Token: data.result.token
            }
        });

        if ((result.data as IResResult).status === 'ok') {
            setStep('CardHasBeenOrdered');
        }
        else {
            localErrorHunter({code: 0, message: "And error occured when ordering the card"});
        }

        setLoading(false);
    }
    
    return (state.cardType === 'PLASTIC' && !deliveryOption) ? <Loader className={'relative mt-10'}/> : <>
        <Box display="flex" justifyContent="space-between" width="100%">
            <Typography fontSize={"16px"} variant="h3">Issue new card</Typography>
            <CloseWindowButton onClick={close}/>
        </Box>
        
        <Box display={"flex"} flexDirection={"column"} gap="24px" paddingTop={"48px"}>
            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">{t("account_owner")}</Typography>
                <Typography variant='b1' color="pale blue">{account.name}</Typography>
            </RowItem>

            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">{t("account_number")}</Typography>
                <Typography variant='b1' color="pale blue">{account.number}</Typography>
            </RowItem>

            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">{t("card_design")}</Typography>
                <Typography variant='b1' color="pale blue">Standard</Typography>
            </RowItem>
            
            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">{t("card_type")}</Typography>
                <Typography variant='b1' color="pale blue">{state.cardType.toLowerCase().capitalize()}</Typography>
            </RowItem>
            
            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">{t("cardholder").toLowerCase().capitalize()}</Typography>
                <Typography variant='b1' color="pale blue">{state.cardholderName}</Typography>
            </RowItem>
            
            {!state.recipientName ? null : (
                <RowItem>
                    <Typography variant='b1 - bold' color="pale blue">{t("recipient")}</Typography>
                    <Typography variant='b1' color="pale blue">{state.recipientName}</Typography>
                </RowItem>
            )}
            
            {state.cardType !== 'PLASTIC' ? null : <div>
                <RowItem>
                    <Typography variant='b1 - bold' color="pale blue">{t("delivery_address")}</Typography>
                    <Typography variant='b1' maxWidth={'350px'} textAlign={'right'} color="pale blue">{`
                        ${getAddressPartOrEmpty(deliveryCountriesList.find(c => c.code === state.countryCode).name)}
                        ${getAddressPartOrEmpty(state.postalCode)}
                        ${getAddressPartOrEmpty(state.city)}
                        ${getAddressPartOrEmpty(state.street)}
                        ${getAddressPartOrEmpty(state.houseNumber)}
                        ${state.apartmentNumber ?? ''}
                    `}</Typography>
                </RowItem>
                
                <RowItem alignItems={'center'} paddingBottom={'6px'}>
                    <Typography variant='b1 - bold' color="pale blue">{t("delivery_type")}</Typography>
                    
                    <Box width={"200px"} >
                        <Select className="w-full mt-2"
                                placeholder='Select type...'
                                value={state.isExpressDelivery ? 'express' : 'standard'}
                                options={[{
                                    label: 'Standard (0 €)',
                                    value: 'standard',
                                }, {
                                    label: `Express (${deliveryOption.cost} €)`,
                                    value: 'express',
                                }]}
                                onSelect={(e: 'express' | 'standard') => setState({
                                    ...state,
                                    isExpressDelivery: e === 'express'
                                })}/>
                    </Box>
                </RowItem>

                <RowItem hasBorderBottom>
                    <Typography variant='b1 - bold' color="pale blue">{t("expected_delivery_time")}</Typography>
                    <Typography variant='b1 - bold' color="pale blue">{state.isExpressDelivery ? deliveryOption.deliveryDays : 10} days</Typography> 
                </RowItem>
            </div>}
        </Box>
        
        <Box display={"flex"} flexDirection={"column"} gap="6px" paddingTop={"24px"}>
            <RowItem>
                <Typography variant='b1' color="pale blue">{t("card_issuance")}</Typography>
                <Typography variant='b1' color="pale blue">€ 7</Typography>
            </RowItem>
            <RowItem>
                <Typography variant='b1' color="pale blue">{t("card_delivery")}</Typography>
                <Typography variant='b1' color="pale blue">€ {state.isExpressDelivery ? deliveryOption.cost : 0}</Typography>
            </RowItem>
            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">{t("total_fees")}</Typography>
                <Typography variant='b1 - bold' color="pale blue">€ {7 + (state.isExpressDelivery ? deliveryOption.cost : 0)}</Typography>
            </RowItem>
        </Box>

        <div className='mt-5'>
            {localErrorInfoBox}
        </div>

        <Box display={"flex"} gap="24px" paddingTop={"28px"}>
            <Button disabled={loading} onClick={onConfirm}>{t("order_card")}</Button>
            <Button gray  onClick={() => {
                setStep('IssueNewCard');
            }}>{t("back")}</Button>
        </Box>
    </>
}
