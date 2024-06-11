import {PropsWithChildren} from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 8px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.white};
`


export default function MessageContainer({children}: PropsWithChildren) {
    return (
        <Container>
            {children}
        </Container>
    )
}