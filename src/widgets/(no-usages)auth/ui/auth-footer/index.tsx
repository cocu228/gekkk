import {memo} from 'react';
import DownloadApp from '@/assets/download-app.svg?react';
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';

const AuthFooter = memo(() => {
    const {md} = useBreakpoints();
    return <div 
        style={{
            flex: '0 0 auto',
            display: 'flex',
            flexDirection: 'column',
        }}>
        {md ?
            <a style={{
                marginBottom: '18px'
            }}>
                <DownloadApp />
            </a> : null
        }
        <div className='typography-b2'
            style={{
                marginBottom: '6px',
                color: 'var(--new-pale-blue)',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <a
                    href="https://gekkard.com/terms-and-conditions.html"
                    target="_blank"
                    rel="noreferrer noopener">
                    General terms and conditions
                </a>
                <a 
                    href="https://gekkard.com/data-protection-policy.html"
                    target="_blank"
                    rel="noreferrer noopener">
                    Data protection policy
                </a>
                <a 
                    href="https://gekkard.com/legal-agreements.html"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Legal agreements
                </a>
        </div>
        <div className='typography-b4'
            style={{
                color: 'var(--new-light-grey)',
                marginBottom: '3px',
            }}>
            Crypto exchange service is powered by AtlantEX OU (licensed partner for crypto wallet and exchange)
        </div>
        <div className='typography-b4-bold' style={{
            color: 'var(--new-light-grey)',
        }}>
        © Gekkard. v.{import.meta.env.VITE_APP_VERSION}
        </div>

    </div>
})

export default AuthFooter
