import { ReactNode } from "react";
import { Colors, Variant } from "./types";
import style from './styles.module.scss'; 

export function Typography({variant, color='dark-green', className, children}: {color?: Colors, children?: ReactNode, variant: Variant, className?: string}) {
    const colorSelector = (color: string) => {
        switch (color) {
            case 'dark-green':
                return style.colorDarkGreen;
            case 'light-green':
                return style.colorLightGreen;
            case 'placeholder':
                return style.colorPlaceHolder;
            case 'white': 
                return style.colorWhite;
            default:
                return style.colorDarkGreen;
        }
    }
    
    return (
        variant === 'h' ? (
            <h4 className={`${style.h} ${colorSelector(color)} ${className}`}>{children}</h4>
        ) : (
            <p className={`${style.p} ${colorSelector(color)} ${className}`}>{children}</p>
        )
    );
          
}