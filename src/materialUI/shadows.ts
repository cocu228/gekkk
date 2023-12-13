export const createCustomShadow = () => {
  return {
    'active-account-shadow': `3px 2px 8px 0px #A8A8A84A, 13px 8px 15px 0px #A8A8A842, 28px 17px 20px 0px #A8A8A826, 50px 30px 23px 0px #A8A8A80A, 79px 47px 26px 0px #A8A8A803`,
    'dark-inner-glow': `0px 0px 4px 0px rgba(195, 195, 195, 0.50) inset`,
    'bright-inner-glow': `0px 0px 4px 0px rgba(247, 247, 240, 0.50) inset, 5px 3px 10px 0px rgba(255, 255, 255, 0.05) inset`,
  }
}

declare module '@mui/material/styles' {
  export interface ThemeOptions {
    customShadows?: {
      'dark-inner-glow': string
      'bright-inner-glow': string
      'active-account-shadow': string
    }
  }
  interface Theme {
    customShadows: {
      'dark-inner-glow': string
      'bright-inner-glow': string
      'active-account-shadow': string
    }
  }
}

export type CustomShadowType = ReturnType<typeof createCustomShadow>
