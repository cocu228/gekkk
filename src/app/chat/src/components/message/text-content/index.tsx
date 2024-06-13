import styled from 'styled-components'

type Props = {
    children?: string
}

export const Content = styled.div`
    width: 100%;
    word-wrap: break-word;
    text-align:left;
    vertical-align:text-top;
    font-size: 12px;
    align-self:flex-start;
    color:${({ theme }) => theme.lightBlue};
    position: relative;
    
    a {
        color:${({ theme }) => theme.lightBlue};
    }

`


export default function TextContent({children = ""}: Props) {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return (
        <Content dangerouslySetInnerHTML={{ __html: children.replace(urlRegex, '<a href="$&" target="_blank">$&</a>') }}/>
    )
}