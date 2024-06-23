import React, { useRef } from 'react';
import Loading from '../loading';
import ConversationType from '../../types/ConversationType';
import Conversation from '../conversation';
import style from './styles.module.scss'
import styled from 'styled-components';

export interface Props {
  onConversationClick?: (index: number) => void;
  conversations?: ConversationType[];
  loading?: boolean;
  selectedConversationId?: string;
  onScrollToBottom?: () => void;
  themeColor?: string;
  mobileView?: boolean;
  /**
   * the current user on the chat ui
   */
  currentUserId?: string;
  renderCustomConversationitem?: (conversation: ConversationType, index: number) => React.ReactNode
  customLoaderComponent?: React.ReactNode
  customEmptyConversationsComponent?: React.ReactNode

}

const ScrollContainer = styled.div<{
  loading?: boolean,
  backgroundColor?: string
}>`
position: relative;
  height: 100%;
  width: 100%;
padding-top: ${({ loading }) => loading ? '0px' : '56px'};
box-sizing: border-box;
overflow-y: auto;
max-height: 100vh;
overflow-x: hidden;
background-color: ${({ backgroundColor }) => backgroundColor || '#ffffff'};
scrollbar-width: none; /* Firefox */
 -ms-overflow-style: none;  /* Internet Explorer 10+ */
::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
  }
`;

const NoChatsTextContainer = styled.div<{
  color?: string
}>`
  color: ${({ color }) => color || 'rgba(0, 0, 0, 0.36)'};
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export default function ConversationList({
  conversations,
  loading,
  onConversationClick,
  selectedConversationId,
  onScrollToBottom,
  currentUserId,
  renderCustomConversationitem,
  customLoaderComponent,
  customEmptyConversationsComponent
}: Props) {
  const scrollContainerRef = useRef<any>();

  return (
    <div className={style.Container}>
      <ScrollContainer
        backgroundColor={"backgroundColor"}
        loading={loading}
        onScroll={() => {
          //detect when scrolled to bottom
          const bottom =
            scrollContainerRef.current.scrollHeight -
            scrollContainerRef.current.scrollTop ===
            scrollContainerRef.current.clientHeight;
          if (bottom) {
            onScrollToBottom && onScrollToBottom();
          }
        }}
        ref={scrollContainerRef}
      >
        {loading ?
          <div className={style.LoadingContainer} >
            {customLoaderComponent ?
              customLoaderComponent :
              <Loading themeColor={"themeColor"} />}
          </div> : (
            <>
              {conversations && conversations.length <= 0 && (
                customEmptyConversationsComponent ?
                  customEmptyConversationsComponent :
                  <NoChatsTextContainer color={"noConversation"}>
                    <p>No conversation started...</p>
                  </NoChatsTextContainer>
              )}

              {conversations &&
                conversations.map((conversation, index) => (
                  (renderCustomConversationitem && renderCustomConversationitem(conversation, index)) ?
                    renderCustomConversationitem(conversation, index)
                    :
                    <Conversation
                      onClick={() => onConversationClick && onConversationClick(index)}
                      key={index}
                      title={conversation.title}
                      lastMessage={conversation.lastMessage}
                      avatar={conversation.avatar}
                      selected={selectedConversationId === conversation.id}
                      currentUserId={currentUserId}
                      unread={conversation.unread}
                    />
                ))}
            </>
          )}
      </ScrollContainer>
    </div>
  );
}
