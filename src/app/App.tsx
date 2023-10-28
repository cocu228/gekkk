import AppRouter from './providers/AppRouter'
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";
// import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import "../processes/firebaseConfig"
import Decimal from "decimal.js";
import ChatButton from '@/widgets/chat/ui/chat-button/ChatButton';
import ChatModal from '@/widgets/chat/ui/chat-modal/ChatModal';
import { useState } from 'react';
import useModal from "@/shared/model/hooks/useModal";

function App() {
    Decimal.set({toExpNeg: -18})
    const { isModalOpen, showModal, handleCancel } = useModal();

    return (
        <BreakpointsProvider>
            <AppRouter />
            <ChatButton onClick={isModalOpen ? handleCancel : showModal} />
            {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={handleCancel} />}
        </BreakpointsProvider>
    ) 
}



export default App
