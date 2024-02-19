import styles from "./style.module.scss"
import {$ENV} from "@/shared/lib";

const Footer = ({textAlight}: { textAlight: string }) => {

    return <>
        <footer className="py-4">
            <div className="row mb-2 px-4">
                <span className={`${textAlight} text-gray-500 font-semibold text-sm w-full block`}>© Gekkard. v.{$ENV.VITE_APP_VERSION}</span>
            </div>
            <div className="wrapper px-4">
                <p className={`${textAlight} text-gray-400 font-medium leading-4 text-xs`}>Crypto exchange service is
                    powered
                    by AtlantEX OU (licensed partner
                    for crypto wallet and exchange)</p>
            </div>
        </footer>
    </>

}

export default Footer
