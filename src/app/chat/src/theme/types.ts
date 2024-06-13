export interface ThemeProps {
    background: string;
    darkBlue: string;
    lightBlue: string;
    lightGray: string
    midGray: string
    darkGray: string;
    white: string;
    black: string;
}

export interface Breakpoints {
    mobile: number;
}

export interface MediaQuery {
    isMobile: string;
    isDesktop: string;
}