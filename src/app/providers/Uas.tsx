import { FC, ReactNode } from "react"

interface UasProviderProps {
    children: ReactNode
}

export const UasProvider:FC<UasProviderProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    )
}