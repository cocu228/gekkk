import styled from "styled-components";

export const MessagesContainer = styled.div<{ incoming?: boolean }>`
    position: relative;
    z-index: 1;
    display:flex;
    gap: 5px;
    margin-block: 10px;
    align-items: ${({ incoming }) => incoming ? "flex-end" : "flex-start"};
`

export const MessageContent = styled.div<{ incoming?: boolean }>`
    flex: 1 1 auto;
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme.lightGray};
    border-radius: ${({ incoming }) => incoming ? "8px 8px 0 8px" : "8px 8px 8px 0"};
`

export const UserAvatarContainer = styled.div`
    width: 25px;
    min-width: 25px;
    height: 25px;
`

export const UserAvatar = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 100%;
    border-width: 2px;
    border-color: rgb(255 255 255);
    object-fit: cover;
    position: relative;
    z-index: 1;
`