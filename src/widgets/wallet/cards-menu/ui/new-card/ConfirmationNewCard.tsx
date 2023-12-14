import { Box, Typography } from '@mui/material';
import { CloseWindowButton } from "@/shared/ui/CloseWindowButton";
import { useNewCardContext } from './newCardContext';
import {Button} from '@mui/material';

export function ConfirmationNewCard() {
    const { close, setStep } = useNewCardContext();

    return <>
        <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h3">Confirmation new card issue</Typography>
            <CloseWindowButton
            onClick={close}
            />
        </Box>
        <Box display={"flex"} gap="24px" paddingTop={"48px"}>
            <Button>Order card</Button>
            <Button onClick={() => {
                setStep('IssueNewCard');
            }}>Back</Button>
        </Box>
    
    </>
}