import React from 'react';

interface Props {
    title: React.ReactNode,
    subtitle: React.ReactNode,
    rightContent: React.ReactNode
}

function PageHead({title, subtitle, rightContent}: Partial<Props>) {

    return (
        <div className="m-4 md:mb-8">
            <div className="flex lg:flex-col justify-between items-center lg:items-start gap-6">
                <div className="wrapper">
                    <h1 className="mb-4 text-fs32 md:text-2xl font-bold">{title}</h1>
                    <p className="text-fs14 leading-5">{subtitle}</p>
                </div>
                {rightContent && (
                    <div className="wrapper shrink-0 lg:w-full">
                        {rightContent}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PageHead;