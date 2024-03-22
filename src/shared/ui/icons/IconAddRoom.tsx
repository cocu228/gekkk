interface Props {
    className?: string
    size?: number,
    stroke?: string,
}

function IconAddRoom({stroke, size, className = ''}: Props) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <circle cx="14.3228" cy="17.7677" r="9" transform="rotate(-45 14.3228 17.7677)" stroke={stroke} stroke-width="2"/>
            <path d="M9.37305 17.7677H19.2725" stroke={stroke} stroke-width="2" stroke-linecap="round"/>
            <path d="M14.3232 22.7174V12.8179" stroke={stroke} stroke-width="2" stroke-linecap="round"/>
        </svg>
    );
}

export default IconAddRoom;
