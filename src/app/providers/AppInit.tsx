import {useRef} from "react";
import AuthPage from "@/pages/auth";
import {AuthProvider, useAuth} from "./AuthRouter";
import RootLayout from "@/app/providers/RootLayout";
import useRoomCodeHandler from "./useRoomCodeHandler";
import ErrorsProvider from "@/app/providers/ErrorsProvider";

const AppInit = () => {
    const {token} = useAuth();
    const roomCodeHandlerRef = useRef(useRoomCodeHandler(token));

    const content = !token ? <AuthPage/> : <RootLayout/>

    return <ErrorsProvider>{content}</ErrorsProvider>

}


export default () => <AuthProvider>
    <AppInit/>
</AuthProvider>

// export default () => <Assets/>
