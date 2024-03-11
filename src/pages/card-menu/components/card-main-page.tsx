import CardsMenu from '@/widgets/cards-menu/ui/CardsMenu';
import { useState } from 'react';

export function MainCardPage() {
    const [isNewCardOpened, setIsNewCardOpened] = useState(false);

    return <div>
        <CardsMenu 
            isMobile
            isNewCardOpened={isNewCardOpened}
            setIsNewCardOpened={setIsNewCardOpened} 
        />
    </div>
};