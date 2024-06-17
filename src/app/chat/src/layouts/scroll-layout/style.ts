import styled from "styled-components";
import {mediaQuery} from "../../theme";

export const ScrollContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    padding-top: 15px;
    padding-inline: 15px;
    background-color: ${({theme}) => theme.white};

    ::-webkit-scrollbar { /* WebKit */
        width: 0;
        height: 0;
    }

    ${mediaQuery.isMobile} {
        padding-top: 20px;
    }
`

export const Buffer = styled.div`
    height: 2px;
    width: 100%;
    position: relative;
`

export const NoMessagesTextContainer = styled.div`
    color: ${({theme}) => theme.lightBlue};
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    user-select: none;
`