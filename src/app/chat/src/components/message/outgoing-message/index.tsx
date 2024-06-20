import { FC } from "react";
import { useTheme } from "styled-components";
import MediaContent from "../media-content";
import TextContent from "../text-content";
import Timestamp from "../timestamp";
import { IconApp } from "../../../shared/components/icon-app";
import { IOutgoingMessageProps } from "../messageTypes";

import { MessageContent, MessagesContainer, UserAvatarContainer } from "../style";

const OutgoingMessage: FC<IOutgoingMessageProps> = ({ text, media, last, single, created_at }) => {
  const theme = useTheme();

  return (
    <MessagesContainer
      data-testid='outgoing-message'
      data-date={created_at?.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
      className='fade-animation'
    >
      <UserAvatarContainer />
      <MessageContent incoming>
        {media ? (
          <MediaContent last={last} single={single} messageType='outgoing' {...media} />
        ) : (
          <TextContent>{text}</TextContent>
        )}
        <Timestamp date={created_at} />
      </MessageContent>
      <UserAvatarContainer>
        <IconApp code={"t82"} size={25} color={theme.lightBlue} />
      </UserAvatarContainer>
    </MessagesContainer>
  );
};

export default OutgoingMessage;
