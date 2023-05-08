export type TypeInputCurrency = {
    onChange: (v: string) => void,
    value: number | null | string,
    disabled?: boolean,
    showWill?: boolean,
    currency: {
        const: string,
        availableBalance?: number,
        minAmount?: number
    }
}