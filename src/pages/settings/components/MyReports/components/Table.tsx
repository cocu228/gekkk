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

    return <div className="flex flex-col gap-[5px]">
        {reports.map(item => {
            return <TableRow statement={item} uasToken={uasToken}/>
        })}
    </div>
}
