
import s from '../../styles.module.scss'
import { AreaWrapper } from '../AreaWrapper'
import { useTranslation } from 'react-i18next';

export function IdentificationStatus() {
  const {t} = useTranslation();

  return (
    <AreaWrapper title="Identification status">
      <div className={s.identBody} >
        <span 
          className={s.identTitle}
        >
          {t('REGISTERED')}
        </span>
        <span className={s.identTitle} >
          {t('identification_status_message')}
        </span>
      </div>
    </AreaWrapper>
  )
}
