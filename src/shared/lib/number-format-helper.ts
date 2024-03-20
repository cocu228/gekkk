const NumberFiatFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2, minimumFractionDigits: 2});

export function toLocaleFiatRounding(value: number): string | null {
	return isNaN(value) ? null : NumberFiatFormat.format(value);
}

export function toLocaleCryptoRounding (value: number, maximumFractionDigits?: number, minimumFractionDigits?: number): string | null {
	return isNaN(value) ? null : value?.toLocaleString("fr-FR", {
		maximumFractionDigits,
		minimumFractionDigits
	});
}

export const getCurrencyRounding = (value: number | undefined) =>
    value === undefined ? "-" : value >= 1000
        ? Math.round(value) : value >= 1
            ? value.toFixed(2)
            : value.toFixed(value != 0
				? Math.floor(-Math.log10(value)) + 3
				: 0);
