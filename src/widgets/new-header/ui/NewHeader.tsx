import Logo from '@/assets/logo.svg?react';
import FaqIcon from '@/assets/faq-icon.svg?react';
import SupportIcon from '@/assets/support-icon.svg?react';
import SettingsIcon from '@/assets/settings-icon.svg?react';
import LogOutIcon from '@/assets/log-out-icon.svg?react';
import { useAuth } from '@/app/providers/AuthRouter';
import { Link, useLocation } from 'react-router-dom';

export type NewHeaderProps = {};

export function NewHeader ({}: NewHeaderProps) {
    const {token, logout} = useAuth();
    const location = useLocation();
    const getActiveOrDefaultClass = (route: string) => {
        if (location.pathname.includes(route)) {
            return 'top-menu-button_active';
        }

        return 'top-menu-button';
    }

    return <header style={{
        position: 'sticky',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        height: '70px',
        background: 'var(--brand-dark-blue)',
        padding: '0 25px',
    }}>

        <Logo />

        {token ? 
            <div style={{
                display: 'flex',
                gap: '24px',
            }}>
                <Link className={getActiveOrDefaultClass('money')} to='money'>Money</Link>
                <Link className={getActiveOrDefaultClass('crypto')} to="crypto">Crypto</Link>
                <Link className={getActiveOrDefaultClass('pro')} to="pro">PRO</Link>
            </div> : null
        }

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

                <button type='button'>
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