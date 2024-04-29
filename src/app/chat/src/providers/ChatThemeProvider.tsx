import ChatThemeContext from '../contexts/ChatThemeContext'

type Props = {
    colorSet?: {},
    theme?: string
    children: any
}

export default function ChatThemeProvider({
    colorSet,
    children,
    theme
}: Props) {

    return (
        <ChatThemeContext.Provider value={{ colorSet, themeColor: theme || '#6ea9d7' }} >
            {children}
        </ChatThemeContext.Provider>
    )
}