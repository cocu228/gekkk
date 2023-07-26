export function getDescriptionText(name: string, currency: string, flags: number) {
    let actions: string = actionsByFlag[flags];
    if (!actions)
        return 'Short description for this currency is not done yet.';

    return `${actions} your ${name} (${currency}) directly from your Gekkoin account`;
}

export const EurgDescriptionText: string = `Utility token with a fixed rate\n1 EURG = 1 euro`;


export const EurgTooltipText: string = `We pay you 3% per annum of EURG on your balance under following conditions:\n
(i) your weighted average balance for the reporting period is equal to or higher than 300 EURG\n
(ii) our upper limit for the balance to pay the interest rate is 100,000 EURG.`;

export const GkeTooltipText: string = `Fixed yield on average monthly balance (in GKE tokens):
➔ 5% p.a. first year from the date of issue
➔ 3% p.a. second year from the date of issue`;

export const actionsByFlag: Record<number, string> = {
    2: 'Buy or Sell',
    8: 'Top up, Exchange and Send',
}
