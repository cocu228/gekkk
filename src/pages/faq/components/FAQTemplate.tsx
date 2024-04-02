import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  styled,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next';

export const Wrapper = styled(
  Box,
  {},
)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
}))

export type FAQTemplateProps = {
  title: string,
  items: { title: string, content: React.ReactNode } [];
};

export function FAQTemplate({ title, items }: FAQTemplateProps) {

  const {t} = useTranslation()

  return (
    <Wrapper>
      <Typography marginBottom="24px" variant="h2" color="brand pale blue">
        {t(title)}
      </Typography>
      {items.map(({title, content}) => {
        return (
        <Accordion>
          <AccordionSummary>{t(title)}</AccordionSummary>
          <AccordionDetails>
            {content}
          </AccordionDetails>
        </Accordion>
        );
      })}
      
    </Wrapper>
  )
}
