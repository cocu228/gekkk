import {InnerContainer, Title} from "./style";
import useMedia from "../../hooks/useMedia";
import {IconApp} from "../../shared/components/icon-app";
import {useTheme} from "styled-components";

export default function MessageHeader() {
    const { isMobile } = useMedia()
    const theme = useTheme()

    const handleOnClose = () => {
        document.getElementById("chat")?.classList.toggle("isOpen")
    }

    return (
        <InnerContainer>
            {isMobile ? <IconApp code={"t08"} size={15} color={theme.white} onClick={handleOnClose} /> : null}
            <Title>Chat us</Title>
            {isMobile ? null : <IconApp code={"t26"} size={20} color={theme.darkGray} onClick={handleOnClose}/>}
        </InnerContainer>
    );
}