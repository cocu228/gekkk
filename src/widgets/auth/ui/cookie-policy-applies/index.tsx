import {memo, useState} from 'react';
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';
import Cookie from '@/assets/cookie.svg?react';

const CookiePolicyApplies = memo(() => {
    const {md} = useBreakpoints();
    const [isShown, setIsShown] = useState(true);

    if (!isShown) {
        return null;
    }

    return <div style={{
        flex: '0 0 auto',
        width: md ?'100%' : '480px',
        background: 'var(--new-FFFFFF)',
        position: md ? 'static' : 'fixed',
        marginTop: md ? '40px' : '',
        marginBottom: md ? '20px' : '',
        bottom: '29px',
        right: '126px',
        padding: '24px 27px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        borderRadius: '8px',
        boxShadow: 'var(--new-active-account-shadow)',
        zIndex: 1,


    }}>
        <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            color: 'var(--new-pale-blue)'
        }}>
            <Cookie />
            <span className='typography-h3'>Cookie policy applies</span>
        </div>
        <div className='typography-b2' style={{ color: 'var(--new-dark-blue)'}}>
            Our website uses cookies. The policy objective is to explain how Papaya (hereafter referred to as “we”) uses cookies and processes personal data.
            <div>
                Read more information <a className='typography-b2'>here</a>.
            </div>
        </div>
        <div style={{
            display: 'flex',
            gap: '24px',
        }}>
            <button type="button" className='account-button' onClick={() => setIsShown(false)}>Accept</button>
            <button type="button" className='second_value-button' onClick={() => setIsShown(false)}>Cancel</button>

        </div>

    </div>
})

export default CookiePolicyApplies
