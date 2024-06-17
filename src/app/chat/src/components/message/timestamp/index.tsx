import styled from 'styled-components'
import {getMessageTime} from '../../../utils/date-utils'

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: end;
    align-items: center;
`

export const Content = styled.p`
    text-align: right;
    vertical-align: text-top;
    font-size: 8px;
    align-self: flex-end;
    color: ${({theme}) => theme.midGray};
`

type Props = {
    date?: Date
}

export default function Timestamp({date}: Props) {
    return (
        <Container>
            <Content>{date && getMessageTime(date)}</Content>
        </Container>
    )
}