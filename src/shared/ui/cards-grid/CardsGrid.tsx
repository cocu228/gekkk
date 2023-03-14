import React from 'react';

function CardsGrid({children}: any) {
    return (
        <div className="
            flex
            flex-wrap
            gap-[20px]
            gap-y-[38px]
            desktop:gap-y-[20px]
        ">
            {children}
        </div>
    );
}

export default CardsGrid;