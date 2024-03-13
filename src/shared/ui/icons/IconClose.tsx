interface Props {
    className?: string
    size?: number,
    stroke?: string,
}

function IconClose({stroke, size, className = ''}: Props) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill='transparent' className={className} xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="18" height="18" rx="9" stroke={stroke} stroke-width="2"/>
            <path d="M6.5 6.5L13.5 13.5" stroke={stroke} stroke-width="2" stroke-linecap="round"/>
            <path d="M6.5 13.5L13.5 6.50001" stroke={stroke} stroke-width="2" stroke-linecap="round"/>
        </svg>
    );
}

export default IconClose;