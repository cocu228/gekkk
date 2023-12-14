import { Box, Typography, styled } from '@mui/material';
import { CloseWindowButton } from "@/shared/ui/CloseWindowButton";
import { useNewCardContext } from './newCardContext';
import {Button} from '@mui/material';

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
    const { close, setStep } = useNewCardContext();

    return <>
        <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h3">Confirmation new card issue</Typography>
            <CloseWindowButton
            onClick={close}
            />
        </Box>
      
        <Box display={"flex"} flexDirection={"column"} gap="12px">
            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">Account owner</Typography>
                <Typography variant='b1' color="pale blue">Igor Koroshev</Typography>
            </RowItem>

            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">Account number</Typography>
                <Typography variant='b1' color="pale blue">MT0000000000000000000000000000000000</Typography>
            </RowItem>

            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">Card design</Typography>
                <Typography variant='b1' color="pale blue">Standard</Typography>
            </RowItem>

            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">Card type</Typography>
                <Typography variant='b1' color="pale blue">Plastic</Typography>
            </RowItem>

            <RowItem hasBorderBottom>
                <Typography variant='b1 - bold' color="pale blue">Delivery address</Typography>
                <Typography variant='b1' color="pale blue">1, 1, Street name, Region name, City, Country, 11111</Typography>
            </RowItem>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap="6px">
            <RowItem>
                <Typography variant='b1' color="pale blue">Card issuance</Typography>
                <Typography variant='b1' color="pale blue">€ 10</Typography>
            </RowItem>
            <RowItem>
                <Typography variant='b1' color="pale blue">Card delivery</Typography>
                <Typography variant='b1' color="pale blue">€ 0</Typography>
            </RowItem>
            <RowItem>
                <Typography variant='b1 - bold' color="pale blue">Total fees</Typography>
                <Typography variant='b1 - bold' color="pale blue">€ 10</Typography>
            </RowItem>
        </Box>
        <RowItem hasBorderBottom>
            <Typography variant='b1 - bold' color="pale blue">Expected delivery time</Typography>
            <Typography variant='b1 - bold' color="pale blue">2 days</Typography> 
        </RowItem>

        <Box display={"flex"} gap="24px" paddingTop={"48px"}>
            <Button>Order card</Button>
            <Button onClick={() => {
                setStep('IssueNewCard');
            }}>Back</Button>
        </Box>
    </>
}