import {useEffect} from 'react';
import styles from './style.module.scss';
import {Html5QrcodeScanner, Html5QrcodeCameraScanConfig} from 'html5-qrcode';

const qrScannerId = "html5-qrcode-scanner";

type IParams = Partial<Html5QrcodeCameraScanConfig> & {
    verbose?: boolean;
    onSuccess: (value: string) => void;
    onError?: () => void;
}

const QrcodeScanner = ({
    fps,
    qrbox,
    aspectRatio,
    disableFlip,
    videoConstraints,
    onSuccess,
    onError = () => {},
    verbose = false,
}: IParams) => {

    useEffect(() => {
        const config: Html5QrcodeCameraScanConfig = {
            qrbox,
            aspectRatio,
            disableFlip,
            fps: fps ?? 30,
            videoConstraints
        };

        const qrScanner = new Html5QrcodeScanner(qrScannerId, config, verbose);
        qrScanner.render(onSuccess, onError);

        return () => {
            qrScanner.clear().catch(error => {
                console.error("Error when clearing qrcode-scanner state", error);
            });
        };
    }, []);

    return <div className={styles.a} id={qrScannerId}/>;
};

export default QrcodeScanner;
