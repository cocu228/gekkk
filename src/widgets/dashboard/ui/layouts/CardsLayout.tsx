import {Skeleton} from 'antd';
import Card from "@/shared/ui/card/Card";
import BankCard from '../cards/bank-card/BankCard';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import {storeBankData} from '@/shared/store/bank-data/bank-data';
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import {formatMonthYear} from '../../model/helpers';
import {useContext} from 'react';
import {CtxRootData} from '@/app/RootContext';

function CardsLayout() {
    const {account} = useContext(CtxRootData);
    const bankData = storeBankData(state => state.bankData);

    return (
        <div className="wrapper">
            <SectionTitle>Selected account: {!account
                ? <Skeleton.Input style={{height: 16, width: 275}} active/>
                : <a>{account.iban}</a>
            }</SectionTitle>

            <CardsGrid>
                {!(bankData && account) ? (
                    <Card>
                        <Skeleton active/>
                    </Card>
                ) : (<>
                    {bankData.cards.filter(c => c.number).filter(c => c.clientId === account.id).map(card =>
                        <BankCard
                            key={`BANK_CARD_${card.id}`}
                            cardNumber={card.number.replace("_", "** ***")}
                            expiresAt={formatMonthYear(new Date(card.expireAt))}
                            holderName={card.owner.embossedName}
                        />
                    )}
                </>)}
            </CardsGrid>
        </div>
    );
}

export default CardsLayout;
