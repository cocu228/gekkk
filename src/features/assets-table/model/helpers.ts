export function getAlignment(array: Array<string>, key: string): string {
    return array.indexOf(key) === 0 ? 'md:ml-5 justify-start' :
        array.indexOf(key) === array.length - 1 ? 'md:mr-5 justify-end' :
        'justify-center';
}

export const getAssetsRounding = (value: number, cents_round: number) =>
    value >= 1000 ? Math.round(value) :
    value >= 1 ? value.toFixed(cents_round) :
    value.toFixed(Math.floor(-Math.log10(value)) + 1);
