import Card from "@/shared/ui/card/Card";

interface AccoundData {
    iban: string;
    balance: number;
    currency: string;
}

const BankAccount = ({iban, balance, currency}: AccoundData) => {
    const formattedIBAN = iban.slice(0, 10) + '***' + iban.slice(-4);

    return (
        <Card>
            <div className='font-semibold text-lg mb-auto'>IBAN: {formattedIBAN}</div>
            <div className='font-semibold text-gray-400'>Balance:</div>
            <div className='font-medium uppercase text-sm'>
                <span className="text-fs32 font-bold">{balance}</span> {currency}
            </div>
        </Card>
    )
}

export default BankAccount;
