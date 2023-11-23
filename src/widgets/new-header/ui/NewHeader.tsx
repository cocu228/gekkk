import Logo from '@/assets/logo.svg?react';
import FaqIcon from '@/assets/faq-icon.svg?react';
import SupportIcon from '@/assets/support-icon.svg?react';
import SettingsIcon from '@/assets/settings-icon.svg?react';
import LogOutIcon from '@/assets/log-out-icon.svg?react';
import { useAuth } from '@/app/providers/AuthRouter';
import {useNavigate} from "react-router-dom";
// import useModal from "@/shared/model/hooks/useModal";
// import ChatModal from '@/features/chat/ui/chat-modal/ChatModal';
// import ChatButton from '@/features/chat/ui/chat-button/ChatButton';

export type NewHeaderProps = {};

export function NewHeader ({}: NewHeaderProps) {

    const navigate = useNavigate();
    const {token, logout} = useAuth();
    // const {isModalOpen, showModal, handleCancel} = useModal();
   
    // <ChatButton onClick={isModalOpen ? handleCancel : showModal} />
    // {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={handleCancel} />}

    return <header style={{
        position: 'sticky',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        height: '70px',
        background: 'var(--new-brand-dark-blue)',
        padding: '0 25px',
        zIndex: '1'
    }}>

        <Logo className='hover:cursor-pointer' onClick={() => navigate('/')}></Logo>


            {/* <div style={{
                display: 'flex',
                gap: '24px',
            }}>
                {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={handleCancel} />}
            </div> */}


        <div style={{
            display: 'flex',
            gap: '32px',
        }}>

            <div style={{
                display: 'flex',
                gap: '16px',
            }}>
                <button type='button'>
                    <FaqIcon />
                </button>

                <button type='button' onClick={() => navigate('/chat')}>
                    <SupportIcon />
                </button>
            </div>

            {token ? 
                <div style={{
                    display: 'flex',
                    gap: '16px',
                }}>
                    <button type='button'>
                        <SettingsIcon />
                    </button>

                    <button type='button' onClick={logout}>
                        <LogOutIcon />
                    </button>
                </div> : null
            }
        </div>

    </header>;
}

export default NewHeader;