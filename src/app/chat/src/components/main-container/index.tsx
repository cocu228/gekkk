import {PropsWithChildren} from 'react'
import styled from 'styled-components'


const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    position: relative;
    display: flex;
    flex-direction: row;
    background-color: ${({ theme }) => theme.background};
`

export default function MainContainer({ children}: PropsWithChildren) {
    return (
        <Container id='chat-main-container' tabIndex={-1}>
            {children}
        </Container>
    )
}