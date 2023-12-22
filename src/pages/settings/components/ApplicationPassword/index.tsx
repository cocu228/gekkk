import { Box, TextField } from '@mui/material'
import Button from "@/shared/ui/button/Button";
import { AreaWrapper } from '../AreaWrapper'
import { useTranslation } from 'react-i18next';


export function ApplicationPassword() {
  const {t} = useTranslation();
  return (
    <AreaWrapper title={t("change_application_password")}>
      <Box display="flex" padding="36px 0" gap="24px" flexDirection="column">
        <TextField label={t("current_online_bank_password")} placeholder={t("enter_password")} />
        <TextField label={t("new_online_bank_password")} placeholder={t("enter_new_password")} />
      </Box>
      <Button>{t('Save')}</Button>
    </AreaWrapper>
  )
}
