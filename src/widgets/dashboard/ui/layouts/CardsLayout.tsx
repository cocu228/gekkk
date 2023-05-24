import {Skeleton} from 'antd';
import Card from "@/shared/ui/card/Card";
import BankCard from '../cards/bank-card/BankCard';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import {storeBankData} from '@/shared/store/bank-data/bank-data';
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import {formatMonthYear} from '../../model/helpers';

function CardsLayout() {
    const bankData = storeBankData(state => state.bankData)

    return (
        <div className="wrapper">
            <SectionTitle>Bank cards</SectionTitle>

            <CardsGrid>
                {bankData === null ? (
                    <Card>
                        <Skeleton active/>
                    </Card>
                ) : (<>
                    {bankData.cards.filter(c => c.number).map((card) =>
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
