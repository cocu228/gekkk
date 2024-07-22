import { useEffect } from 'preact/compat';
import { IS_GEKKARD_APP, IS_GEKKOIN_APP } from '../../utils/getMode';
import { GekkardAuth } from '../../widgets/gekkard-auth';
import { GekkoinAuth } from '../../widgets/gekkoin-auth';
import { GekwalletAuth } from '../../widgets/gekwallet-auth';
import NewKeyContextProvider from '../../widgets/gekwallet-auth/model/NewKeyContext';
import { CookiePolicy } from '../../widgets/cookie-policy/CookiePolicy';
import { PwaInstallPopupIOS } from '../../widgets/react-pwa-install-ios';
import { setCookieData } from '../../shared';


const Auth = () => {

    useEffect(() => {
        const url = new URL(window.location.href);
        const agentCode = url.searchParams.get('code');

        if (!!agentCode) {
            setCookieData([{
                key: 'agentCode',
                value: agentCode,
                expiration: 7 * 24 * 60 * 60 // 7 days in seconds
            }]);

            url.searchParams.delete('code');
            window.history.replaceState(null, '', url.pathname.replace('agent', ''));
        }
    }, []);

    return (
        <>
            {IS_GEKKARD_APP()
                ? <GekkardAuth />
                : IS_GEKKOIN_APP()
                    ? <GekkoinAuth />
                    : (
                        <NewKeyContextProvider>
                            <GekwalletAuth />
                        </NewKeyContextProvider>
                    )
            }
            <PwaInstallPopupIOS 
                delay={3} 
                appIcon="/img/favicon/favicon-192x192.png"
                appName={IS_GEKKARD_APP()
                    ? 'Gekkard'
                    : IS_GEKKOIN_APP()
                        ? 'Gekkoin'
                        : 'Gekwallet'
                }
            />
            <CookiePolicy />
        </>
    )
}

export default Auth;
