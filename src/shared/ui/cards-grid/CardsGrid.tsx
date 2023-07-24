import React from 'react';

function CardsGrid({children}: any) {
    return (
        <div className="
            grid
            grid-cols-4
            sm:grid-cols-1
            xl:grid-cols-2
            xxxl:grid-cols-3
            justify-items-center
            gap-4
            gap-y-10
            xl:gap-5
        ">
            {children}
        </div>
    );
}

export default CardsGrid;