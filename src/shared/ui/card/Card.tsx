import React from 'react';

function Card({children}: unknown) {
    return (
        <div className="
            bg-white
            p-[16px]
            rounded-[4px]
            hover:bg-gradient-to-br
            hover:from-white
            hover:to-[#DEE2E7]
            shadow-[0_4px_12px_0px_rgba(0,0,0,0.12)]
            hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]
            min-h-[195px]
            w-[310px]
            phone:min-h-[216px]
            flex
            flex-col
            transition-all
        ">
            {children}
        </div>
    );
}

export default Card;