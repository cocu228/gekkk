import { Box, Typography, Switch, TextField, Button } from '@mui/material';
import { CloseWindowButton } from "@/shared/ui/CloseWindowButton";
import { useNewCardContext } from './newCardContext';
import { CardDesign } from './CardDesign';
import { RowItem } from './RowItem';


export function IssueNewCard() {
    const { close, setStep } = useNewCardContext();

    return <>
        <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h3">Issue new card</Typography>
            <CloseWindowButton
            onClick={close}
            />
        </Box>
        <Box paddingTop={"24px"}>
            <Typography variant='b2 - bold'>Card design</Typography>
        </Box>
        <Box display={"flex"} flexWrap={"wrap"} gap="48px" paddingTop={"12px"}>
            <CardDesign
                title="Standard"
                description="Standard card is so good that you will love it because it is so good. Is it enough space for description or not really"
                isSelected={true}
                image={<img width={116} src="/img/GekkardCard.png" alt="GekkardCardPreview"/>}
            />
            <CardDesign
                title="Other type card"
                description="Standard card is so good that you will love it because it is so good. Is it enough space for description or not really"
                isSelected={false}
                image={<img width={116} src="/img/GekkardCard.png" alt="GekkardCardPreview"/>}
            />
        </Box>
        <Box display={"flex"} flexDirection={'column'} gap="12px">
            <RowItem hasBorderTop>
                <Typography variant='b2 - bold' color="dark blue">Card type</Typography>
                <div>select</div>
            </RowItem>
            <RowItem hasBorderTop>
                <Typography variant='b2 - bold' color="dark blue">Delivery type</Typography>
                <div>select</div>
            </RowItem>

            <RowItem hasBorderTop hasBorderBottom>
                <Box display={'flex'} flexDirection={"column"} gap="6px">
                    <Typography variant='b2 - bold' color="dark blue">Delivery address</Typography>
                    <Typography variant='b2' color="dark blue">Same as the residence address</Typography>
                </Box>
                <Switch />
            </RowItem>
            <TextField
                fullWidth
                label="Country"
                placeholder="Enter country name"
            />

            
                <TextField
                    fullWidth
                    label="City"
                    placeholder="Enter city name"
                />
            
                <TextField
                    fullWidth
                    label="Region"
                    placeholder="Enter region name, if available"
                />

            
                <TextField
                    fullWidth
                    label="Post code"
                    placeholder="Enter post code"
                />
            
            
                <TextField
                    fullWidth
                    label="Street"
                    placeholder="Enter street name"
                />

            
                <TextField
                    fullWidth
                    label="House"
                    placeholder="Enter house name or number, if available"
                />

            
                <TextField
                    fullWidth
                    label="Flat"
                    placeholder="Enter flat name or number, if available"
                />
        </Box>
    
        <Box display={"flex"} gap="24px" paddingTop={"48px"}>
            <Button onClick={() => {
                setStep('ConfirmationNewCard');
            }}>Proceed</Button>
            <Button onClick={close}>Back</Button>
        </Box>
    </>
}