import { IS_GEKKARD_APP, IS_GEKKOIN_APP } from '../../utils/getMode';
import { GekkardAuth } from '../../widgets/gekkard-auth';
import { GekkoinAuth } from '../../widgets/gekkoin-auth';
import { GekwalletAuth } from '../../widgets/gekwallet-auth';
import PwaInstallPopupIOS from 'react-pwa-install-ios'



const Auth = () => {

    return (
        <>
            {IS_GEKKARD_APP()
                ? <GekkardAuth />
                : IS_GEKKOIN_APP()
                    ? <GekkoinAuth />
                    : <GekwalletAuth />
            }
            <PwaInstallPopupIOS delay={3} lang="en" appIcon="/img/favicon/favicon-192x192.png"/>
        </>
    )
}

export default Auth;
