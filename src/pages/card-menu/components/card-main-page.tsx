import MobileCardsMenu from '@/widgets/cards-menu/ui/mobile-cards-menu';
import { useState } from 'react';

export function MainCardPage() {
    const [isNewCardOpened, setIsNewCardOpened] = useState(false);

    return <div>
        <MobileCardsMenu 
            isMobile
            isNewCardOpened={isNewCardOpened}
            setIsNewCardOpened={setIsNewCardOpened} 
        />
    </div>
};