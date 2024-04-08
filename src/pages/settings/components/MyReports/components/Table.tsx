import {Box} from '@mui/material'
import {TableRow} from './TableRow'
import {useContext, useMemo} from 'react';
import {CtxRootData} from '@/processes/RootContext';
import {StatementsByIBAN} from '@/shared/api/statements';

export function Table({
    uasToken,
    statements,
}: {
    uasToken: string;
    statements: {[key: string]: StatementsByIBAN[]};
}) {
    const {account} = useContext(CtxRootData);
    const reports = useMemo(() => (
        statements[account?.number] ?? []
    ), [account, statements]);

    return <Box
        gap="24px"
        display="flex"
        paddingTop="36px"
        flexDirection="column"
    >
        {reports.map(item => {
            return <TableRow statement={item} uasToken={uasToken}/>
        })}
    </Box>
}
