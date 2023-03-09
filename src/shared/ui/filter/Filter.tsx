import React from 'react';
import Select from "@/shared/ui/select/Select";

interface Props {
    options: {value: string, label: string}[],
    selected: string,
    onChange: (val: string) => void
}

function Filter({options, selected, onChange}: Props) {
    const handleClickOptionBtn = (val: string) => (e: React.SyntheticEvent<HTMLButtonElement>) => {
        onChange(val);
    };

    return (
        <div className="wrapper">
            <div className="inline-flex flex-wrap bg-[#F9F9FA] rounded-[4px] phone:hidden">
                {options.map(opt => (
                    <button
                        key={opt.value}
                        className={`
                            bg-none px-[20px] rounded-[6px] py-[8px] text-[14px] font-medium border-solid border-1 
                            ${opt.value === selected ? 'text-gekDarkGray border-blue' : 'text-gekGray border-[#F9F9FA]'}
                        `}
                        onClick={handleClickOptionBtn(opt.value)}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
            <div className="hidden phone:block">
                <Select
                    defaultValue={selected}
                    style={{ width: 120 }}
                    options={options}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default Filter;