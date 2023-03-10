import React from 'react';

function CardsGrid({children}: any) {
    return (
        <div className="
            grid grid-cols-4
            desktopXl:grid-cols-3
            desktopXl:grid-cols-2
            desktop:grid-cols-1
            gap-[20px]
            gap-y-[38px]
            desktop:gap-y-[20px]
        ">
            {children}
        </div>
    );
}

export default CardsGrid;