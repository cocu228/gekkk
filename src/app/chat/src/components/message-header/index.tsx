import {InnerContainer, Title} from "./style";
import AppIcons from "../../shared/components/app-icons";
import useMedia from "../../hooks/useMedia";

export default function MessageHeader() {
    const { isMobile } = useMedia()

    const handleOnClose = () => {
        document.getElementById("chat")?.classList.toggle("isOpen")
    }

    return (
        <InnerContainer>
            {isMobile ? <AppIcons type={"arrow"} cursor={"pointer"} size={15} onClick={handleOnClose}/> : null}
            <Title>Chat us</Title>
            {isMobile ? null : <AppIcons type={"close"} cursor={"pointer"} size={20} onClick={handleOnClose}/>}
        </InnerContainer>
    );
}