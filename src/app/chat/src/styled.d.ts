import 'styled-components'

declare module "styled-components" {
    interface DefaultTheme {
        background: string;
        darkBlue: string;
        lightBlue: string;
        lightGray: string
        darkGray: string;
        white: string;
        black: string;
    }
}