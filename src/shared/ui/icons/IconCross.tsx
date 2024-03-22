import React from "react";

interface Props {
    className?: string
    size?: number,
    fill?: string,
}

function IconCross({fill, size, className = ''}: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 22"
            className={`${className}`}
            {...(size ? {width: size, height: size} : {})}
        >
            <path
                fillRule="evenodd"
                d="M4.725 4.825a1.02 1.02 0 000 1.443L9.056 10.6l-4.33 4.331a1.02 1.02 0 101.443 1.444l4.331-4.331 4.331 4.331a1.02 1.02 0 101.444-1.444l-4.331-4.33 4.33-4.332a1.02 1.02 0 00-1.443-1.443L10.5 9.155l-4.331-4.33a1.02 1.02 0 00-1.444 0z"
                clipRule="evenodd"
                fill={fill}
            />
        </svg>
    );
}

export default IconCross;