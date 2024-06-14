import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 10px;
    border-top: 2px solid ${({ theme }) => theme.background};
    background-color: ${({ theme }) => theme.white};
    border-radius: 0 0 8px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 7px;
`

const IconsContainer = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const AttachmentContainer = styled(IconsContainer)<{ disabled: boolean }>`
    ${({disabled}) => !disabled ? `cursor: pointer; opacity: 1;` : `
        opacity: 0.6;
        pointer-events: none;
    `}

    & > svg {
        cursor: pointer;
        transform: rotate(45deg);
    }
`

export const ArrowContainer = styled(IconsContainer)<{ showCursor: boolean, disabled: boolean }>`
    cursor: ${({showCursor, disabled}) => showCursor && !disabled ? 'pointer' : 'default'};
    opacity: ${({showCursor, disabled}) => showCursor && !disabled ? '1' : '0.4'};
    ${({disabled}) => disabled ? `pointer-events: none;` : ''}

    & > svg {
        cursor: pointer;
    }
`

export const InputContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.lightGray};
    border-radius: 8px;
    padding: 10px 31px;
    
    &::placeholder {
        color: ${({ theme }) => theme.midGray}
    }
`

export const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    padding: 0;
    font-size: 12px;
`