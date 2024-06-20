const digitsPattern = /[\d|\.]/;
const allowedSymbolsPattern = /[\@\!\#\$\%\^\&\*\(\)\_\+\-\=\"\,\/]/;
const latinAlphabetPattern = /[^a-zA-Z|\s|\d\@\!\#\$\%\^\&\*\(\)\_\+\-\=\"\,\.\/]+/;
const latinAlphabet = /[a-zA-Z]/;

export const validateInput = (
  event: React.ChangeEvent<any>,
  allowDigits: boolean,
  allowSymbols: boolean,
  discardSymbols: boolean
): boolean => {
  const inpValue = event.target.value;

  if (!allowDigits && digitsPattern.test(inpValue)) return false;

  if (!allowSymbols && allowedSymbolsPattern.test(inpValue)) return false;

  if (discardSymbols && latinAlphabet.test(inpValue)) return false;

  if (latinAlphabetPattern.test(inpValue)) return false;

  return true;
};
