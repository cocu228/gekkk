import { forwardRef, PropsWithChildren } from "react";
import { Container, Image, ImageContainer, InnerContainer } from "./style";
import LoaderIco from "../../assets/logo-loading.svg";
import MessageListBackground from "../../components/message-list-background";

interface IMessageLayoutProps extends PropsWithChildren {
  loading: boolean;
}

const MessageLayout = forwardRef<HTMLDivElement | null, IMessageLayoutProps>(({ children, loading }, ref) => {
  return (
    <Container ref={ref}>
      {loading && (
        <ImageContainer>
          <Image height={30} src={LoaderIco} alt={LoaderIco} />
        </ImageContainer>
      )}
      <MessageListBackground roundedCorners={false} />
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
});

export default MessageLayout;
