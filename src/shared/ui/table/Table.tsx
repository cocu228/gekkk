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
        <table className="table-auto w-full border-solid border-1 border-[#EEEFF2] bg-[#F9F9FA] mt-4">
            {data.labels && (
                <thead className="md:hidden text-gray-600">
                <tr className="bg-[#EEEFF2] whitespace-nowrap text-left">
                    {data.labels.map((l, index) => (
                        <th key={index + "_th"} className="py-[10px] px-[20px] text-[14px] font-semibold">{l.text}</th>
                    ))}
                </tr>
                </thead>
            )}

                <tbody className="md:flex md:flex-col">
                {data.rows && data.rows.length ? (
                    <>
                        {data.rows.map((row, index) => (
                            <tr key={index + "_tr"} className={`
                                md:flex
                                md:flex-wrap
                                md:gap-[10px]
                                md:p-[15px]
                                md:justify-between
                                ${index !== 0 ? 'md:border-solid md:border-t-1 md:border-[#EEEFF2]' : ''}
                            `}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex + "_td"}
                                        className={`
                                            align-middle py-2.5 px-5 lg:py-2 lg:px-2 text-sm md:p-0
                                            ${cell.options?.nowrap ? 'whitespace-nowrap' : ''}
                                            ${cell.options?.wFull ? 'md:min-w-[100%]' : ''}
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
        </div>
    );
}

export default Table;