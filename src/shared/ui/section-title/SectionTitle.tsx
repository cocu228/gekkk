import React from 'react';

function SectionTitle({children}: any) {
    return (
        <h3 className="text-gray text-[14px] font-medium mb-[12px] phone:hidden">{children}</h3>
    );
}

export default SectionTitle;