import {Input} from "antd";
import {useLayoutEffect, useRef} from "react";

const InputCopy = ({value}) => {

    const inputRef = useRef(null)

    useLayoutEffect(() => {
        inputRef.current.style = "var(--color-gray-300)"
    })

    const onClick = () => {

        inputRef.current.focus({
            cursor: 'all',
        });

        navigator.clipboard.writeText(value)

    }

    return <Input
        ref={inputRef}
        className='flex !border-[var(--color-gray-400)] !shadow-none w-full'
        readOnly={true}
        disabled
        value={value}
        suffix={
            <img className='opacity-50 mx-2 hover:cursor-pointer hover:opacity-100'
                 src={`/img/icon/Copy.svg`}
                 alt='copy'
                 onClick={onClick}
            />
        }
    />
}

export default InputCopy