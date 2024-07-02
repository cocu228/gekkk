import { useTranslation } from 'react-i18next';
import styles from "../styles.module.scss"

export type FAQTemplateProps = {
  title: string,
  items: { title: string, content: React.ReactNode } [];
};

export function FAQTemplate({ items }: FAQTemplateProps) {

  const {t} = useTranslation()

  return <>
    {items.map(({title, content}) => {      
      return (<div key={title}>      
        {
          title && (
            <span className={styles.Question}>{t(title)}</span>
          )
        }
        <div className={styles.Answer}>
          {content}
        </div>
      </div>
      );
    })}
  </>
}
