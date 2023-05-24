import {Skeleton} from 'antd';
import Card from "@/shared/ui/card/Card";
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import BankAccount from '../cards/bank-account/BankAccount';
import {storeBankData} from '@/shared/store/bank-data/bank-data';
import SectionTitle from "@/shared/ui/section-title/SectionTitle";

function AccountsLayout() {
    const bankData = storeBankData(state => state.bankData)

    return (
        <div className="wrapper">
            <SectionTitle>Accounts</SectionTitle>

            <CardsGrid>
                {bankData === null ? (
                    <Card>
                        <Skeleton active/>
                    </Card>
                ) : (<>
                    {bankData.accounts.map((acc) =>
                        <BankAccount
                            key={`ACC_CARD_${acc.id}`}
                            iban={acc.number}
                            balance={acc.balance}
                            currency={acc.currency.code}
                        />
                    )}
                </>)}
            </CardsGrid>
        </div>
    );
}

export default AccountsLayout;
