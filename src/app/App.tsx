import Decimal from "decimal.js";
import "../processes/firebaseConfig";
import AppRouter from './providers/AppRouter';
import useModal from "@/shared/model/hooks/useModal";
import ChatModal from '@/features/chat/ui/chat-modal/ChatModal';
import ChatButton from '@/features/chat/ui/chat-button/ChatButton';
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";

function App() {
    Decimal.set({toExpNeg: -18});
    const {isModalOpen, showModal, handleCancel} = useModal();
    
    return (
        <BreakpointsProvider>
            <AppRouter/>
            <ChatButton onClick={isModalOpen ? handleCancel : showModal} />
            {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={handleCancel} />}
        </BreakpointsProvider>
    );
}

export default App;
