import {PropsWithChildren} from "react";
import {Container, Layout} from "./style";

export default function BodyLayout({children}: PropsWithChildren) {
    return (
        <Layout>
            <Container>
                {children}
            </Container>
        </Layout>
    )
}