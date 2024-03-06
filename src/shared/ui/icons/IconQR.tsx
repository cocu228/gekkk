interface Props {
    className?: string
    size?: number,
    stroke?: string,
}

function IconQR({stroke, size, className = ''}: Props) {
    return (
        <svg width={size} height={size + 1} className={className} viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.40625 6.90625H9.21875V9.71875H6.40625V6.90625Z" stroke={stroke}/>
            <path d="M6.40625 16.2812H9.21875V19.0937H6.40625V16.2812Z" stroke={stroke}/>
            <path d="M15.7812 6.90625H18.5937V9.71875H15.7812V6.90625Z" stroke={stroke}/>
            <path d="M19.6875 20.1875H16.875V21.5938H19.6875C20.4688 21.5938 21.0937 20.9688 21.0937 20.1875V18.7812H19.6875V20.1875Z" stroke={stroke}/>
            <path d="M3.90625 5.8125V12.2188H11.7188V4.40625H5.3125C4.53125 4.40625 3.90625 5.03125 3.90625 5.8125ZM10.3125 10.8125H5.3125V5.8125H10.3125V10.8125Z" stroke={stroke}/>
            <path d="M4 20.4063C4 21.1875 4.625 21.8125 5.40625 21.8125H11.8125V14H4V20.4063ZM5.40625 15.4062H10.4062V20.4063H5.40625V15.4062Z" stroke={stroke}/>
            <path d="M13.2812 13.7812H18.2812V15.1875H13.2812V13.7812Z" stroke={stroke}/>
            <path d="M16.875 15.8125H15.3125V17.375H16.875V18.7812H18.2812V17.375H21.0938V15.8125H18.2812H16.875Z" stroke={stroke}/>
            <path d="M13.2812 18.7812H14.6875V21.5938H13.2812V18.7812Z" stroke={stroke}/>
            <path d="M15.3125 18.7812H16.7187V20.1875H15.3125V18.7812Z" stroke={stroke}/>
            <path d="M13.2812 15.8125H14.6875V17.2187H13.2812V15.8125Z" stroke={stroke}/>
            <path d="M19.6875 13.7812H21.0937V15.1875H19.6875V13.7812Z" stroke={stroke}/>
            <path d="M19.6875 4.40625H13.2812V12.2188H21.0938V5.8125C21.0938 5.03125 20.4688 4.40625 19.6875 4.40625ZM19.6875 10.8125H14.6875V5.8125H19.6875V10.8125Z" stroke={stroke}/>
        </svg>
    );
}

export default IconQR;
