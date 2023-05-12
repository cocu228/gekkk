export type TypeInputCurrency = {
    onChange: (v: string) => void,
    value: number | null | string,
    disabled?: boolean,
    showWill?: boolean,
    header?: string | JSX.Element,
    currency: {
        const: string,
        availableBalance?: number,
        minAmount?: number
    }
}