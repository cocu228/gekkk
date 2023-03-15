import React from 'react';

function CardsGrid({children}: any) {
    return (
        <div className="
            flex
            flex-wrap
            gap-5
            gap-y-10
            xl:gap-5
        ">
            {children}
        </div>
    );
}

export default CardsGrid;