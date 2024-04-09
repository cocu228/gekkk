const digitsPattern = /[\d|\.]/;
const allowedSymbolsPattern = /[\@\!\#\$\%\^\&\*\(\)\_\+\-\=\"\,\/]/;
const latinAlphabetPattern = /[^a-zA-Z|\s|\d\@\!\#\$\%\^\&\*\(\)\_\+\-\=\"\,\.\/]+/;

export const validateInput = (
    event: React.ChangeEvent<any>,
    allowDigits: boolean,
    allowSymbols: boolean
): boolean => {
    const inpValue = event.target.value;

    if (!allowDigits && digitsPattern.test(inpValue))
        return false;

    if (!allowSymbols && allowedSymbolsPattern.test(inpValue))
        return false;

    if (latinAlphabetPattern.test(inpValue))
        return false;

    return true;
};
