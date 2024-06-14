import styled from 'styled-components'

const ScrollBackground = styled.div<{
    roundedCorners?: boolean
    backgroundColor?: string
}>`
background-color:${({ backgroundColor }) => backgroundColor || '#f3f4f6'};
position: relative;
width: 100%;
height: 100%;
border-radius: ${({ roundedCorners }) => roundedCorners ? '16px' : '0px'};

`

const ScrollBackgroundContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    box-sizing: border-box;
`

type Props = {
    roundedCorners?: boolean
}

export default function MessageListBackground({
    roundedCorners = true
}: Props) {

    return (
        <ScrollBackgroundContainer>
            <ScrollBackground
                backgroundColor={"backgroundColor"}
                roundedCorners={roundedCorners} />
        </ScrollBackgroundContainer>
    )
}