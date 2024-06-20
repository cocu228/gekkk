import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
`;

export const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const Image = styled.img`
  position: absolute;
  z-index: 100;
  margin-top: 50px;
`;

export const InnerContainer = styled.div`
  height: 100%;
`;
