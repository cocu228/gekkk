import Download from '@/assets/download.svg?react';
import {Box, IconButton, Typography} from '@mui/material';
import {useBreakpoints} from '@/app/providers/BreakpointsProvider';
import {StatementsByIBAN, apiDownloadStatements} from '@/shared/api/statements';
import {apiGetUas} from '@/shared/(orval)api';
import {storeAccountDetails} from '@/shared/store/account-details/accountDetails';

export function TableRow({
    statement
}: {
    statement: StatementsByIBAN
}) {
    const {sm} = useBreakpoints();
    const {getAccountDetails} = storeAccountDetails();
    const {
        to,
        from,
        reportName,
        downloadLink
    } = statement;

    return <Box
        gap="30px"
        display="grid"
        gridTemplateColumns={!sm ? 'auto auto 0.25fr' : 'auto 0.25fr'}
    >
        <Typography flex="0 0 auto" variant="b2" color="dark grey">
            {from} - {to}
        </Typography>

        {!sm && (
            <Typography
                display="flex"
                width="100%"
                variant="b1"
                justifyContent='center'
                color="pale blue"
            >
                {reportName}
            </Typography>
        )}

        <IconButton onClick={async () => {
            const {data} = await apiGetUas();
            const {phone} = await getAccountDetails();

            const response = await apiDownloadStatements(downloadLink, {
                headers: {
                    Authorization: phone,
                    Token: data.result.token
                }
            });

            const pdfBlob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(pdfBlob);

            const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute(
              "download",
              `${reportName}.pdf`
            );
            
            document.body.appendChild(tempLink);
            tempLink.click();

            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(url);
        }} sx={{
            flex: '0 0 auto',
            color: 'pale blue',
            justifyContent: 'end'
        }}>
            <Download />
        </IconButton>
    </Box>
}
