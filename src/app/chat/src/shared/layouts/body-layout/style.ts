import styled from "styled-components";
import {mediaQuery} from "../../../theme";

export const Layout = styled.div`
    width: 100%;
    flex: 1 1 auto;
    padding: 0;
    
    ${mediaQuery.isMobile} {
        padding: 10px 10px 0;
        border-radius: 8px;
        overflow: hidden;
    }
`

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    ${mediaQuery.isMobile} {
        margin: 0 auto;
        max-width: 330px;
        border-radius: 8px;
        overflow: hidden;
    }
`