import {useContext} from 'react';
import BankCard from '../cards/bank-card/BankCard';
import {CtxRootData} from '@/processes/RootContext';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import {storeOrganizations} from "@/shared/store/organizations";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import {formatCardNumber, formatMonthYear} from '../../model/helpers';

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
                        .filter(item => item.clientId === account.number)
                        .map(item =>
                            <BankCard
                                key={`BANK_CARD_${item.id}`}
                                cardNumber={formatCardNumber(item.number)}
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
