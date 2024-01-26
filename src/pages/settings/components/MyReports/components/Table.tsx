import { Box, Typography } from '@mui/material'

import { TableRow } from './TableRow'
import { storeStatements } from '@/shared/store/statements/statements';
import { useContext, useMemo } from 'react';
import { CtxRootData } from '@/processes/RootContext';

export function Table() {
  const {filterByIBAN} = storeStatements(state => state);
  const {account} = useContext(CtxRootData);
  const reports = useMemo(() => {
    
    if (!account) {
      return [];
    }

    return filterByIBAN(account.number);

  }, [account, filterByIBAN]) ;
  return (
    <Box paddingTop="36px" display="flex" flexDirection="column" gap="24px">

      {reports.map(item => {
        return <TableRow statement={item} />
      })}
      
    </Box>
  )
}
