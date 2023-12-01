import AuthPage from "@/pages/auth";
import { AuthProvider, useAuth } from "./AuthRouter";
import RootLayout from "@/app/providers/RootLayout";
import ErrorsProvider from "@/app/providers/ErrorsProvider";
// import useModal from "@/shared/model/hooks/useModal";
// import ChatModal from '@/features/chat/ui/chat-modal/ChatModal';
// import ChatButton from '@/features/chat/ui/chat-button/ChatButton';

const AppInit = () => {
    console.log('(3) App init')
    
    const { token } = useAuth();

    const content = !token ? <AuthPage /> : <RootLayout />;
    // const {isModalOpen, showModal, handleCancel} = useModal();

    return <ErrorsProvider>
        {/* {token ? <ChatButton onClick={isModalOpen ? handleCancel : showModal} /> : null}
        {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={handleCancel} />}  */}
        {content}
    </ErrorsProvider>;

}


export default () => <AuthProvider>
    <AppInit />
</AuthProvider>

// export default () => <Assets/>
