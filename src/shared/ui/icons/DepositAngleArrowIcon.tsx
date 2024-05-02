import React from "react";

function DepositAngleArrowIcon({height, width, className}: { height?: number, width?: number, className?: string }) {
    return (
        <svg version="1.0" className={className} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 1280 1280">
            <path fill="#DEE2E7"
                  d="M0 531.3c0 357.2.2 405 1.5 410.2.8 3.3 3.4 9.8 5.7 14.5 7.7 15.7 24 29.1 42.3 34.6 5.8 1.8 22.7 1.9 420.3 2.1l414.2.3v80c0 55 .3 80 1 80 .6 0 69.4-39.4 152.8-87.6 83.4-48.2 172.1-99.3 197-113.7 24.9-14.4 45.1-26.6 44.9-27.1-.2-.7-390.8-226.8-394.4-228.3-1-.4-1.3 16-1.3 80.1V857H135V127H0v404.3z"/>
        </svg>
    );
}

export default DepositAngleArrowIcon;
