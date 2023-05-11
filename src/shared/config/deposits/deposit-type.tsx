export enum DepositType {
    FIXED = 'Fixed',
    STRUCTED = 'Structured'
}


export default {
    [DepositType.FIXED]: <p className="leading-6">
        A deposit with a fixed income allows you to earn <b>0,8% per month</b>.
        The payments are made <b>every 30 calendar days</b> to your EURG account.
        Terms of deposit - <b>360 days</b>. The minimum amount of the deposit - <b>1000 EURG</b>.
    </p>,

    [DepositType.STRUCTED]: <p className="leading-6">
        With a stuctured deposit, you can invest in cryptocurrencies and have
        full or partial capital protection from potential losses.
        You choose the term. You choose the level of risk and return.
    </p>,
}
