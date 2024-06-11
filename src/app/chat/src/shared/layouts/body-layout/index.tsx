import {Container, Layout} from "./style";
import {PropsWithChildren} from "react";

export default function BodyLayout({children}: PropsWithChildren) {
    return (
        <Layout>
            <Container>
                {children}
            </Container>
        </Layout>
    )
}