import styles from "./style.module.scss"

const Footer = () => {
    return <>
        <footer className="bg-gray-200 py-4">
            <div className="row flex justify-center mb-2">
                <span className="text-center text-gray-500 text-bold">© Gekkoin. v.0.9</span>
            </div>
            <div className="wrapper px-4">
                <p className="text-center text-gray-400">Crypto exchange service is powered by AtlantEX OU (licensed partner for
                    crypto wallet and
                    exchange)</p>
            </div>
        </footer>
    </>

}

export default Footer