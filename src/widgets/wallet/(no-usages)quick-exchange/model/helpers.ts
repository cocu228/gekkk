export const getCurrentRate = (
  rates: unknown | Array<{ key: string; value: number }>,
  $const: string,
  commission: number
): number => {
  if (rates === null) return 0;

  if (rates) {
    if (rates[$const] === undefined) return 0;
  }

  const ratesObj = rates as { [key: string]: number };

  if (ratesObj[$const] === undefined) return 0;

  const rate = ratesObj[$const];
  const increaseAmount = rate * (commission / 100);

  return rate + increaseAmount;
};
