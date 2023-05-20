import React from 'react';

function CardsGrid({children}: any) {
    return (
        <div className="
            flex
            flex-wrap
            gap-4
            gap-y-10
            xl:gap-5
            justify-between
        ">
            {children}
        </div>
    );
}

export default CardsGrid;