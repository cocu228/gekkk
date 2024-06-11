import {ThemeProps} from "./types";
import {createGlobalStyle, withTheme} from "styled-components";

export const darkTheme: ThemeProps = {
    background: 'var(--dark-background)',
    lightBlue: 'var(--dark-light-blue)',
    darkBlue: 'var(--dark-dark-blue)',
    lightGray: 'var(--dark-light-gray)',
    darkGray: 'var(--dark-dark-gray)',
    white: 'var(--dark-white)',
    black: 'var(--dark-black)'
};

export const lightTheme: ThemeProps = {
    background: 'var(--light-background)',
    lightBlue: 'var(--light-light-blue)',
    darkBlue: 'var(--light-dark-blue)',
    lightGray: 'var(--light-light-gray)',
    darkGray: 'var(--light-dark-gray)',
    white: 'var(--light-white)',
    black: 'var(--light-black)'
};

export const GlobalStyle = withTheme(createGlobalStyle`
    :root {
        //dark-mode
        --dark-background: #F7F7F0;
        --dark-light-blue: #285E69;
        --dark-dark-blue: #1F3446;
        --dark-light-gray: #DCDCD9;
        --dark-dark-gray: #B9B9B5;
        --dark-white: #FFFFFF;
        --dark-black: #000000;

        //light-mode
        --light-background: #F7F7F0;
        --light-light-blue: #285E69;
        --light-dark-blue: #1F3446;
        --light-light-gray: #DCDCD9;
        --light-dark-gray: #B9B9B5;
        --light-white: #FFFFFF;
        --light-black: #000000;
    }
`);