import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  styled,
  Typography,
} from '@mui/material'

export const Wrapper = styled(
  Box,
  {},
)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
}))

export type FAQTemplateProps = {
  title: React.ReactNode,
  items: { title: React.ReactNode, content: React.ReactNode } [];
};

export function FAQTemplate({ title, items }: FAQTemplateProps) {
  return (
    <Wrapper>
      <Typography marginBottom="24px" variant="h2" color="brand pale blue">
        {title}
      </Typography>
      {items.map(({title, content}) => {
        return (
        <Accordion>
          <AccordionSummary>{title}</AccordionSummary>
          <AccordionDetails>
            {content}
          </AccordionDetails>
        </Accordion>
        );
      })}
      
    </Wrapper>
  )
}
