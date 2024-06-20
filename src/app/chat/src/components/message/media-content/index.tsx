import { FC, useEffect, useState } from "react";
import { MediaType } from "../../../types/MessageType";
import { getBorderCss, IGetBorderCssProps } from "../borderController";
import { makeApiRequest } from "../../../utils/(cs)axios";
import { FileContainer, ImageContainer, LoadingContainer, SizeText, Image, Video } from "./style";

const DownloadIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='none'
    viewBox='0 0 24 24'
    style={{ position: "absolute", left: 12, top: 8 }}
    strokeWidth='2'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
    />
  </svg>
);

interface IMediaContentProps extends MediaType {
  last?: boolean;
  single?: boolean;
  messageType: "incoming" | "outgoing";
}

const MediaContent: FC<IMediaContentProps> = ({ type, url, size, last, single, messageType }) => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [content, setContent] = useState();

  useEffect(() => {
    setFetching(true);
    makeApiRequest("GET", url, undefined, { responseType: "blob" }).then(res => {
      // @ts-ignore
      setContent(URL.createObjectURL(res.data));
      setFetching(false);
    });
  }, []);

  if (fetching) {
    return <LoadingContainer>{/* <img src={loadingSvg} alt="loading" /> */}</LoadingContainer>;
  }

  const getBorder = (props: IGetBorderCssProps) => getBorderCss(props);

  return (
    <>
      {(type === "image" || type === "gif") && (
        <ImageContainer>
          <Image borderCss={getBorder({ type: messageType, last, single })} src={content} alt={content} />
        </ImageContainer>
      )}
      {(type === "file" || type === "video") && (
        <div style={{ position: "relative", width: "100%" }}>
          {type === "video" && (
            <Video controls borderCss={getBorder({ type: messageType, last, single })}>
              <source src={url} type='video/mp4' />
              <source src={url} type='video/ogg' />
              Your browser does not support the video tag.
            </Video>
          )}
          <div style={{ width: "100%", display: "flex" }}>
            <FileContainer target='_blank' href={content}>
              {DownloadIcon}&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ textDecoration: "underline" }}>
                {content}
                {size && <SizeText>({size})</SizeText>}
              </span>
            </FileContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaContent;
