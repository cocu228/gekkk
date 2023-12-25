import { Box, Typography, TextField, styled } from '@mui/material';
import { CloseWindowButton } from "@/shared/ui/CloseWindowButton";
import { useNewCardContext } from './newCardContext';
import { CardDesign } from './CardDesign';
import {Switch} from "antd";
import Button from '@/shared/ui/button/Button';
import Select from '@/shared/ui/select/Select';

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
    const { setStep } = useNewCardContext();

    return <>
        <Box>
            <Typography fontSize={"16px"} variant='b2 - bold'>Card design</Typography>
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
        <Box display={"flex"} flexDirection={'column'} gap="12px" paddingTop={"12px"}>
            <RowItem hasBorderTop hasBorderBottom paddingTop={"12px"}>
                <Typography fontSize={"16px"} variant='b2 - bold' color="dark blue">Card type</Typography>
                <Box width={"100px"} >
                    <Select className="w-full mt-2" options={[
                        {
                            label: 'one',
                            value: 'one_v',
                        },
                        {
                            label: 'two',
                            value: 'two_v',
                        }
                    ]}/>
                </Box>
            </RowItem>
            <RowItem hasBorderBottom>
                <Typography fontSize={"16px"} variant='b2 - bold' color="dark blue">Delivery type</Typography>
                <Box width={"100px"} >
                    <Select className="w-full mt-2" options={[
                        {
                            label: 'one',
                            value: 'one_v',
                        },
                        {
                            label: 'two',
                            value: 'two_v',
                        }
                    ]}/>
                </Box>
            </RowItem>

            <RowItem hasBorderBottom  alignItems={'flex-end'}>
                <Box display={'flex'} flexDirection={"column"} gap="6px">
                    <Typography fontSize={"16px"} variant='b2 - bold' color="dark blue">Delivery address</Typography>
                    <Typography fontSize={"16px"} variant='b2' color="dark blue">Same as the residence address</Typography>
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
            <Button className='w-full' onClick={() => {
                setStep('ConfirmationNewCard');
            }}>Proceed</Button>
        </Box>
    </>
}