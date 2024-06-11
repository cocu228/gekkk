import styled from "styled-components";
import {mediaQuery} from "../../theme";

export const Container = styled.div`
    width: 100%;
    flex: 1 1 auto;
    position: relative;
    overflow: hidden;
`

export const ImageContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`
export const Image = styled.img`
    position: absolute;
    z-index: 100;
    margin-top: 50px;

`

export const InnerContainer = styled.div`
    height: 100%;
`


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

export const NoMessagesTextContainer = styled.div<{
    color?: string
}>`
    color: ${({color}) => color || 'rgba(0,0,0,.36)'};
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    user-select: none;
`

export const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    position: relative;
`