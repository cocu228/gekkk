import { getFormattedIBAN } from "@/shared/lib/helpers";
import Card from "@/shared/ui/card/Card";

interface AccoundData {
    iban: string;
    balance: number;
    currency: string;
}

const BankAccount = ({iban, balance, currency}: AccoundData) => {
    return (
        <Card>
            <div className='font-semibold text-lg mb-auto'>IBAN: {getFormattedIBAN(iban)}</div>
            <div className='font-semibold text-gray-400'>Balance:</div>
            <div className='font-medium uppercase text-sm'>
                <span className="text-fs32 font-bold">{balance}</span> {currency}
            </div>
        </Card>
    )
}

export default BankAccount;
