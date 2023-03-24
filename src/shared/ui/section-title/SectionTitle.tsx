import React from 'react';

function SectionTitle({children}: any) {
    return (
        <h3 className="text-gray-400 text-[14px] font-medium mb-[12px] sm:hidden">{children}</h3>
    );
}

export default SectionTitle;