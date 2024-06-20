import styled from "styled-components";

export const ImageContainer = styled.div`
  width: 99%;
  padding: 1px;
  position: relative;
  user-select: none;
`;
export const LoadingContainer = styled.div`
  min-width: 50px;
  min-height: 30px;
`;

export const Image = styled.img<{ borderCss: string }>`
  width: 100%;
  margin: 0;
  position: relative;
  ${({ borderCss }) => borderCss};
`;

export const FileContainer = styled.a`
  text-align: left;
  vertical-align: text-top;
  font-size: 14px;
  align-self: flex-start;
  color: #000000;
  padding: 8px 16px;
  position: relative;
  box-sizing: border-box;
  word-wrap: break-word;
  width: 100%;
  text-decoration: none;
  user-select: none;
`;

export const SizeText = styled.span`
  margin-left: 6px;
  font-size: 11px;
`;

export const Video = styled.video<{ borderCss: string }>`
  width: 100%;
  height: 240px;
  ${({ borderCss }) => borderCss};
`;
