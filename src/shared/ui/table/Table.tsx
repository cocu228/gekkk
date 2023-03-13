import React from 'react';

interface Props {
    data: {
        labels?: {
            text: any
        }[],
        rows: {
            text: any,
            options?: {
                color?: string,
                nowrap?: boolean,
                wFull?: boolean
            }
        }[][],
    },
    noDataText?: string
}

function Table({data, noDataText = 'No data'}: Props) {
    return (
        <table className="table-auto w-full border-solid border-1 border-[#EEEFF2] bg-[#F9F9FA] mt-[25px]">
            {data.labels && (
                <thead className="tablet:hidden">
                <tr className="bg-[#EEEFF2] whitespace-nowrap text-left">
                    {data.labels.map((l, index) => (
                        <th key={index + "_th"} className="py-[10px] px-[20px] text-[14px] font-semibold">{l.text}</th>
                    ))}
                </tr>
                </thead>
            )}

            <tbody className="tablet:flex tablet:flex-col">
                {data.rows && data.rows.length ? (
                    <>
                        {data.rows.map((row, index) => (
                            <tr key={index + "_tr"} className={`
                                tablet:flex
                                tablet:flex-wrap
                                tablet:gap-[10px]
                                tablet:p-[15px]
                                tablet:justify-between
                                ${index !== 0 ? 'tablet:border-solid tablet:border-t-1 tablet:border-[#EEEFF2]' : ''}
                            `}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex + "_td"}
                                        className={`
                                            align-middle py-[10px] px-[20px] text-[14px] tablet:p-0
                                            ${cell.options?.nowrap ? 'whitespace-nowrap' : ''}
                                            ${cell.options?.wFull ? 'tablet:min-w-[100%]' : ''}
                                        `}
                                    >
                                        {cell.text}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </>
                ) : (
                    <tr>
                        <td className="align-middle py-[15px] px-[20px] text-[14px]">{noDataText}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;