import smWarn from '@/assets/smWarn.svg?react';
import { apiUnmask } from '@/shared/(orval)api/gek';
import { CardSecretDTO } from '@/shared/(orval)api/gek/model';
import { useCardStore } from '@/widgets/cards-menu/model/currentCardStore';
import { useEffect, useState } from 'react';


export function CardData() {
    const [cardInfo, setCardInfo] = useState<CardSecretDTO>(null);
    const card = useCardStore((state) => state.card);

    useEffect(() => {
        try {
            apiUnmask({cardId: card.cardId})
                        .then(({data}) => {
                            if (data.result.pan === null) {
                                return;
                            }
                            
                            setCardInfo(data.result);
                        });
        } catch (error: unknown) {
            console.log(error);
        }

    });
    return (
        <div className="substrate">
            {cardInfo.cvv}
        </div>
    );
}