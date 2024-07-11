import React, { useEffect, useRef, useState } from 'react';
import MessageType from '../../types/MessageType';
import placeholderProfilePNG from './profile.png';
import { calculateTimeAgo } from '../../utils/date-utils';
import style from './style.module.scss'

export type Props = {
  title: string;
  lastMessage?: MessageType;
  unread?: boolean,
  avatar?: string;
  onClick: () => void;
  selected?: boolean;
  /**
   * the current user on the chat ui
   */
  currentUserId?: string;
};


export default function Conversation({
  title,
  lastMessage,
  onClick,
  avatar,
  selected = false,
  currentUserId,
  unread
}: Props) {
  const [containerWidth, setContainerWidth] = useState(0);

  const [usedAvatar, setUsedAvatar] = React.useState<string>(
    placeholderProfilePNG
  );

  const [dateSent, setDateSent] = useState<string | undefined>()
  const [intervalId, setIntervalId] = useState<any>()

  useEffect(() => {
    function updateDateSent() {
      if (lastMessage?.createdAt) {
        setDateSent(calculateTimeAgo(new Date(lastMessage.createdAt)))
      }
    }

    updateDateSent()
    clearInterval(intervalId)

    const id = setInterval(() => updateDateSent(), 60_000)
    setIntervalId(id)

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null); // Reset intervalId after clearing
      }

    };
  }, [lastMessage])


  useEffect(() => {
    window.addEventListener('resize', () => {
      calculateContainerWidth();
    });
  }, []);

  useEffect(() => {
    if (avatar && avatar.trim().length > 0) {
      setUsedAvatar(avatar);
    }
  }, [avatar]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    calculateContainerWidth();
  }, [containerRef]);


  /**
   *
   */
  const calculateContainerWidth = () => {
    if (containerRef && containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  };


  const getMediaIcon = () => {

    switch (lastMessage?.media?.type) {
      case "image":
        return <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width={"100%"}
          height={"100%"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>

      case "video":
        return <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width={"100%"}
          height={"100%"}
        >
          <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
      case "gif":
        return <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width={"100%"}
          height={"100%"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>


      default:
        return <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width={"100%"}
          height={"100%"}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
        </svg>

    }
  }

  const getMediaText = () => {

    switch (lastMessage?.media?.type) {
      case "image":
        return "Image"
      case "video":
        return lastMessage?.media?.name ? lastMessage?.media?.name : "Video"
      case "gif":
        return lastMessage?.media?.name ? lastMessage?.media?.name : "Gif"
      default:
        return lastMessage?.media?.name ? lastMessage?.media?.name : "File"
    }
  }

  return (
    <div ref={containerRef} onClick={onClick} className={`${style.Container} fade-animation`}>

      <div
        className={`${style.Background}
        ${selected && style.BackgroundSelected}
        `}
      ></div>

      <div className={style.ContentContainer} > 
        <div>
          <div className={style.DisplayPictureContainer} >
            <img
              className={style.DisplayPicture}
              onError={() => {
                setUsedAvatar(placeholderProfilePNG);
              }}
              src={usedAvatar}
            />
          </div>
        </div>

        <div className={style.TextContainer} >

          <div
            className={style.NameContainer}
          >
            <div
              className={`${style.Name} ${unread && style.NameUnread}`}>{title}</div>

            <div
              className={`${style.Timestamp} ${unread && style.TimestampUnread}`}>{dateSent}</div>
          </div>
          
          <div
            className={`${style.MessageComponent} ${unread && style.MessageComponentUnread} max-w-[${containerWidth - 96}px]`}
          >
            {lastMessage?.user.id === currentUserId
              ? 'You'
              : lastMessage?.user.name}
            :{'  '}
            {lastMessage?.user.id === currentUserId
              ? 'You'
              : lastMessage?.user.name}
            :{'  '}
            {lastMessage?.media ? (
              <div
                className={style.MediaContainer}
              >
                <div
                  className={style.MediaIconContainer}
                >
                  {getMediaIcon()}
                </div>
                {getMediaText()}
              </div>
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: lastMessage?.text || "" }}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
