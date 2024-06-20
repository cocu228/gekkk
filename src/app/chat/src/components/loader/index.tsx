import styled from "styled-components";
import Logo from "../../assets/logo-loading.svg";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <Container>
      <img src={Logo} />
    </Container>
  );
};
export default Loader;
