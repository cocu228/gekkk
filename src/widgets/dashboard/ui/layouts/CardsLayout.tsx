import BankCard from '../cards/bank-card/BankCard';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import {formatMonthYear} from '../../model/helpers';
import {useContext} from 'react';
import {CtxRootData} from '@/processes/RootContext';
import {storeOrganizations} from "@/shared/store/organizations";

function CardsLayout() {
    const {account} = useContext(CtxRootData);
    const organizations = storeOrganizations(state => state.organizations);
    return (
        <div className="wrapper">
            <SectionTitle>Selected account: {account.number}</SectionTitle>

            <CardsGrid>
                <>
                    {organizations?.cards
                        .filter(item => item.number)
                        .filter(item => item.clientId === account.client)
                        .map(item =>
                            <BankCard
                                key={`BANK_CARD_${item.id}`}
                                cardNumber={item.number.replace("_", "** ***")}
                                expiresAt={formatMonthYear(new Date(item.expireAt))}
                                holderName={item.owner.embossedName}
                            />
                        )}
                </>
            </CardsGrid>
        </div>
    );
}

export default CardsLayout;
