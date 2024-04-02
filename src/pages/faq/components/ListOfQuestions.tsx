import { Box, styled, Typography } from '@mui/material'
import { useFaqContext } from '../faqContext'
import { FaqItem } from './FaqItem'
import { faqAreasMap, faqAreasMapKeys } from '../faqAreasMap'
import { useBreakpoints } from '@/app/providers/BreakpointsProvider'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { horizontalScrollTo } from '@/shared/lib/helpers'
import { useTranslation } from 'react-i18next'

export const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isMobile',
})<{ isSelected?: boolean, isMobile: boolean }>(({ isSelected, isMobile }) => ({
  display: 'flex',
  justifyContent: isSelected ? undefined : 'space-between',
  flexWrap: isSelected ? undefined : 'wrap',
  flexDirection: isSelected ? isMobile ? 'row' : 'column' : undefined,
  overflow: isSelected && isMobile ? "auto" : undefined,
  gap: isMobile ? '12px' : '30px',
}))

export function ListOfQuestions() {
  const { setSelectedArea, selectedArea } = useFaqContext()
  const {xxl, md} = useBreakpoints();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false)
  const {t} = useTranslation()


  useEffect(() => {
    setIsMounted(true);
    if (!selectedArea || !wrapperRef.current) {
      return;
    }

    horizontalScrollTo(wrapperRef.current.querySelector(`.${selectedArea}`), wrapperRef.current)

  }, [selectedArea, wrapperRef, isMounted])


  return (
    <Wrapper ref={wrapperRef} isSelected={Boolean(selectedArea)} isMobile={xxl}>
      {faqAreasMapKeys.map((key) => {
        const info = faqAreasMap(t)[key]
        if (!info) {
          return null
        }
        const { icon } = info
        return (
          <FaqItem
            className={key}
            isMobile={md}
            isSelected={selectedArea === key}
            isSomeSelected={Boolean(selectedArea)}
            component="button"
            onClick={() => {
              setSelectedArea(key)
            }}
          >
            {icon}
            <Typography variant="h3" width={"100%"} noWrap textAlign={"left"}>{t(info.title)}</Typography>
          </FaqItem>
        )
      })}
    </Wrapper>
  )
}
