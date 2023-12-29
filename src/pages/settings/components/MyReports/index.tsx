import { AreaWrapper } from '../AreaWrapper'
import { Table } from './components/Table'
import { useTranslation } from 'react-i18next'

export function MyReports() {
  const {t} = useTranslation();
  return (
    <AreaWrapper title={t("my_reports")}>
      <Table />
    </AreaWrapper>
  )
}
