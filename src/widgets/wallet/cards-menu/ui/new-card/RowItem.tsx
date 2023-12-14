import { Box,  styled } from '@mui/material';
 
export const RowItem = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'hasBorderTop' && prop !== 'hasBorderBottom',
})<{ hasBorderTop?: boolean, hasBorderBottom?: boolean }>(
    ({ theme, hasBorderTop, hasBorderBottom }) => ({
       display: 'flex',
       justifyContent: 'space-between',
       paddingTop: '12px',
       paddingBottom: '12px',
       borderTop: hasBorderTop ? `1px solid ${theme.palette.strokes}` : undefined,
       borderBottom: hasBorderBottom ? `1px solid ${theme.palette.strokes}` : undefined

    }),
  );