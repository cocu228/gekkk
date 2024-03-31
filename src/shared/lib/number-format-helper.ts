import {isNull} from "./helpers";

const NumberFiatFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2, minimumFractionDigits: 2});

export function toLocaleFiatRounding(value: number): string | null {
	return (isNaN(value) || isNull(value)) ? null : NumberFiatFormat.format(value);
}

export function toLocaleCryptoRounding (value: number, maximumFractionDigits?: number, minimumFractionDigits?: number): string | null {
	return (isNaN(value) || isNull(value)) ? null : value?.toLocaleString("fr-FR", {
		maximumFractionDigits,
		minimumFractionDigits
	});
}

export const getCurrencyRounding = (value: number | undefined) =>
	// If value more than 1000, cut off fractional part 
    value === undefined ? "-" : value >= 1000
		// If value more than 1, display 2 fractional digits
        ? Math.round(value) : value >= 1
            ? value.toFixed(2)
            : value.toFixed(value != 0
				// If value lower than 0.01 EUR display 2 last fractionals, else - 4 last fractionals
				? Math.floor(-Math.log10(value)) + (value >= 0.01 ? 4 : 2)
				: 0);
