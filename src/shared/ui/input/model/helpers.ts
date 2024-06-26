const digitsPattern = /[\d|\.]/;
const allowedSymbolsPattern = /[\@\!\#\$\%\^\&\*\(\)\_\+\-\=\"\,\/]/;
const latinAlphabetPattern = /[^a-zA-Z|\s|\d\@\!\#\$\%\^\&\*\(\)\_\+\-\=\"\,\.\/]+/;

export const validateInput = (
    event: React.ChangeEvent<any>,
    allowDigits: boolean = false,
    allowSymbols: boolean = false,
    discardLetters: boolean = false,
): boolean => {
    const inpValue = event.target.value;

    if (!allowDigits && digitsPattern.test(inpValue))
        return false;

    if (!allowSymbols && allowedSymbolsPattern.test(inpValue))
        return false;

    if (discardLetters && latinAlphabetPattern.test(inpValue))
        return false;

    return !latinAlphabetPattern.test(inpValue);


};
