import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactNode, useMemo } from 'react'

import componentStyleOverrides from './overrides'
import { paletteOverrides } from './palette'
import { createCustomShadow } from './shadows'
import { typographyOverrides } from './typography'

interface Props {
  children: ReactNode
}
export const muiCache = createCache({
  key: 'mui',
  prepend: true,
})
export default function ThemeCustomization({ children }: Props) {
  const palette = paletteOverrides()
  const typography = typographyOverrides()
  const customShadows = createCustomShadow()

  const theme = createTheme({
    palette: {
      ...palette,
    },
    customShadows,
    typography: {
      ...typography,
    },
  })

  theme.components = useMemo(() => componentStyleOverrides(theme), [theme])

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
