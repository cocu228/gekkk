import {FC, ReactNode} from 'react'


interface ChatThemeProviderProps {
    children: ReactNode
}


const ChatThemeProvider:FC<ChatThemeProviderProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    )
}

export default ChatThemeProvider