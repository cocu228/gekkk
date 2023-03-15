import React from 'react';

interface Props {
    title?: React.ReactNode,
    subtitle?: React.ReactNode,
}

function PageHead({title, subtitle}: Props) {
    if (!title && !subtitle) {
        return null;
    }

    return (
        <div className="mb-14 md:mb-8">
            <h1 className="mb-1 text-3xl md:text-2xl font-bold">{title}</h1>
            <p className="font-medium">{subtitle}</p>
        </div>
    );
}

export default PageHead;