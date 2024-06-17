import styled from "styled-components";
import {mediaQuery} from "../../theme";

export const InnerContainer = styled.div`
    width: 100%;
    padding: 15px 20px;
    border-radius: 8px 8px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background-color: ${({ theme }) => theme.white};
    border-bottom: 2px solid ${({ theme }) => theme.background};
    ${mediaQuery.isMobile} {
        border-bottom: none;
        justify-content: flex-start;
        border-radius: 0;
        background-color: ${({ theme }) => theme.darkBlue};
    }
    
    & > svg {
        cursor: pointer;
        transform: rotate(180deg);
    }
`

export const Title = styled.p`
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.lightBlue};
    ${mediaQuery.isMobile} {
        color: ${({ theme }) => theme.white};
    }
`