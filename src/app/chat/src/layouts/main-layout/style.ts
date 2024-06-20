import styled from "styled-components";
import { mediaQuery } from "../../theme";

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px 10px 0;
  border-radius: 10px;
  ${mediaQuery.isMobile} {
    padding: 0;
    background-color: ${({ theme }) => theme.background};
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
