import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding-block: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export const DateContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export const DateText = styled.div`
    z-index:100;
    font-size: 10px;
    font-weight: 700;
    color: ${({ theme }) => theme.midGray};
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 10px;
    opacity: 0.8;
`