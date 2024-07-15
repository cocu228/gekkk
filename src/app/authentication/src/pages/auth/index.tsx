import { IS_GEKKARD_APP, IS_GEKKOIN_APP } from '../../utils/getMode';
import { GekkardAuth } from '../../widgets/gekkard-auth';
import { GekkoinAuth } from '../../widgets/gekkoin-auth';
import { GekwalletAuth } from '../../widgets/gekwallet-auth';
import NewKeyContextProvider from '../../widgets/gekwallet-auth/model/NewKeyContext';
import { CookiePolicy } from '../../widgets/cookie-policy/CookiePolicy';
import { PwaInstallPopupIOS } from '../../widgets/react-pwa-install-ios';



const Auth = () => {

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
            <PwaInstallPopupIOS delay={3} appIcon="/img/favicon/favicon-192x192.png"/>
            <CookiePolicy />
        </>
    )
}

export default Auth;
