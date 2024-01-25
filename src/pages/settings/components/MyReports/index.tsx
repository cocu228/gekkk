import { storeStatements } from '@/shared/store/statements/statements';
import { AreaWrapper } from '../AreaWrapper'
import { Table } from './components/Table'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react';
import { Typography } from '@mui/material';



export function MyReports() {
  const {t} = useTranslation();
  const {getStatements , statementsOrigin} = storeStatements(state => state);

  useEffect(() => {

    getStatements()

  }, []);
  if (statementsOrigin === null) {
    return (
      <AreaWrapper title={t("my_reports")}>
        <Typography>
          Loading
        </Typography>
      </AreaWrapper>
    )
  }

  if (statementsOrigin?.errors) {
    return (
      <AreaWrapper title={t("my_reports")}>
        <Typography>
          Loading Report issue {statementsOrigin.errors.code}
        </Typography>
      </AreaWrapper>
    )
  }

  return (
    <AreaWrapper title={t("my_reports")}>
      <Table />
    </AreaWrapper>
  )
}
