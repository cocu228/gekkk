import {useContext, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import {useTranslation} from 'react-i18next';
import Button from '@/shared/ui/button/Button';
import {useNewCardContext} from './newCardContext';
import {CtxRootData} from "@/processes/RootContext";
import {Box, Typography, styled, TextField} from '@mui/material';

const RowItem = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'hasBorderTop' && prop !== 'hasBorderBottom',
})<{ hasBorderTop?: boolean, hasBorderBottom?: boolean }>(
({ theme, hasBorderTop, hasBorderBottom }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: hasBorderTop ? `1px solid ${theme.palette.strokes}` : undefined,
    borderBottom: hasBorderBottom ? `1px solid ${theme.palette.strokes}` : undefined

}),
);

export function ConfirmationNewCard() {
    const {t} = useTranslation();
    const {account} = useContext(CtxRootData);
    const [isOpen, setIsOpen] = useState(false);
    const {
        state,
        setStep,
        setState
    } = useNewCardContext();
    
    return <>
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
            
            {state.cardType !== 'PLASTIC' ? null : (
                <RowItem hasBorderBottom>
                    <Typography variant='b1 - bold' color="pale blue">{t("delivery_address")}</Typography>
                    <Typography variant='b1' color="pale blue">1, 1, Street name, Region name, City, Country, 11111</Typography>
                </RowItem>
            )}
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap="6px" paddingTop={"24px"}>
            <RowItem>
                <Typography variant='b1' color="pale blue">{t("card_issuance")}</Typography>
                <Typography variant='b1' color="pale blue">€ 10</Typography>
            </RowItem>
            <RowItem>
                <Typography variant='b1' color="pale blue">{t("card_delivery")}</Typography>
                <Typography variant='b1' color="pale blue">€ 0</Typography>
            </RowItem>
            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">{t("total_fees")}</Typography>
                <Typography variant='b1 - bold' color="pale blue">€ 10</Typography>
            </RowItem>
        </Box>
        <RowItem hasBorderBottom>
            <Typography variant='b1 - bold' color="pale blue">{t("expected_delivery_time")}</Typography>
            <Typography variant='b1 - bold' color="pale blue">2 days</Typography> 
        </RowItem>

        <Box display={"flex"} gap="24px" paddingTop={"48px"}>
            <Button onClick={() => {
                setIsOpen(true);
            }}>{t("order_card")}</Button>
            <Button gray  onClick={() => {
                setStep('IssueNewCard');
            }}>{t("back")}</Button>
        </Box>

        <Modal
            open={isOpen}
            title={t('enter_your_online_bank_password_to_confirm_new_card_order')}
            onCancel={() => {
                setIsOpen(false)
            }}
        >
            <TextField
                fullWidth
                label={t("password")}
                placeholder={t("enter_password")}
            />
            <Box display={"flex"} gap="24px" paddingTop={"43px"}>
                <Button onClick={() => {
                    setIsOpen(false);
                    setStep('CardHasBeenOrdered');
                }}>{t("proceed")}</Button>
                <Button gray onClick={() => {
                    setIsOpen(false);
                }}>{t("cancel")}</Button>
            </Box>
        </Modal>
    </>
}