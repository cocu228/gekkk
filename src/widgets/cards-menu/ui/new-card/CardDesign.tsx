import { Box,  styled, Typography } from '@mui/material';

export type CardDesignProps = {
    isSelected: boolean
    title: React.ReactNode
    description: React.ReactNode
    image: React.ReactNode
}


export const Wrapper = styled(Box)<{ isSelected?: boolean }>(
    ({ theme, isSelected }) => ({
        padding: '12px',
        width: '315px',
        display: "flex",
        gap: '24px',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid',
        borderColor: isSelected ? theme.palette['green numbers'] : theme.palette.strokes,
        background: isSelected ? theme.palette['light green'] : theme.palette.white,
        borderRadius: '8px',
        cursor: 'pointer'

    }),
  );


export const Tickbox = styled(Box)<{ isSelected?: boolean }>(
    ({ theme, isSelected }) => ({
        height: '10px',
        width: '10px',
        border: '2px solid',
        borderColor: isSelected ? theme.palette['green numbers'] : theme.palette.strokes,
        background: isSelected ? theme.palette['pale green'] : theme.palette.strokes,
        borderRadius: '50%',
    }),
  );

export function CardDesign({title, description, image, isSelected}: CardDesignProps) {
    return <Wrapper isSelected={isSelected} component={"button"}>
        <Box display={"flex"} gap="24px" alignItems={'center'}>
            <Box display={"flex"} flexDirection={"column"} gap="12px">
                <Typography variant='b2 - bold' color="dark blue">
                    {title}
                </Typography>
                
                <Typography textAlign={"left"} variant='b4' color="pale blue">
                    {description}
                </Typography>
            </Box>
            <Box flex="0 0 116px">
                {image}
            </Box>
        </Box>
        <Tickbox isSelected={isSelected}/>
    </Wrapper>
}
