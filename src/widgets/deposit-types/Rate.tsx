import React from "react";

const Rate = ({val}) => {
    return <div className="col">
        <div className="flex items-center gap-2  md:flex-col">
            <p className="text-gray-400 text-sm">Return</p>
            <div className="flex gap-1">
                {val.map(it => <div
                    className={`w-[0.5rem] h-[0.5rem]  ${it === null ? "bg-gray-200" : it ? "bg-green" : "bg-red-main"}   rounded-full`}/>)}
            </div>
        </div>
    </div>
}

export default Rate