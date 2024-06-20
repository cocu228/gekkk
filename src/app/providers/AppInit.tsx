// import AuthPage from "@/pages/auth";
//import {AuthProvider} from "./AuthRouter";
// import {AuthProvider} from "./AuthRouter";
import RootLayout from "@/app/providers/RootLayout";
import ErrorsProvider from "@/app/providers/ErrorsProvider";
// import useModal from "@/shared/model/hooks/useModal";
// import ChatModal from '@/features/chat/ui/chat-modal/ChatModal';
// import ChatButton from '@/features/chat/ui/chat-button/ChatButton';

const AppInit = () => {
  // const {access} = useAuth();
  const offlineMode = !navigator.onLine;
  // const content = !access ? <AuthPage/> : <RootLayout/>;
  // const {isModalOpen, showModal, handleCancel} = useModal();

  return (
    <ErrorsProvider offline={offlineMode}>
      {/* {token ? <ChatButton onClick={isModalOpen ? handleCancel : showModal} /> : null}
        {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={handleCancel} />}  */}
      <RootLayout />
    </ErrorsProvider>
  );
};

// export default () => <AuthProvider>
//     <AppInit/>
// </AuthProvider>

export default AppInit;

// export default () => <Assets/>
