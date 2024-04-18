
import s from '../../styles.module.scss'
import { AreaWrapper } from '../AreaWrapper'
import { useTranslation } from 'react-i18next'

export function LegalNotices() {
  const {t} = useTranslation();
  return (
    <AreaWrapper title={t("legal_notices")}>
      <div className={s.noticeWrap} >
        <a href="https://gekkard.com/terms-and-conditions.html" 
        className={s.noticeLink}
        >
          {t('terms_and_conditions')}
        </a>
        <a href="https://qgekkard.com/data-protection-policy.html"
          className={s.noticeLink}
        >
          {t('data_protection')}
        </a>
        <a href="/"
          className={s.noticeLink}
        >
          {t('third-party_software_libraries')}
        </a>
      </div>
    </AreaWrapper>
  )
}
