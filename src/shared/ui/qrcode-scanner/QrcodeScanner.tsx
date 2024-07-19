import { Dispatch, SetStateAction, useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeCameraScanConfig } from "html5-qrcode";

import styles from "./style.module.scss";

const qrScannerId = "html5-qrcode-scanner";

type IParams = Partial<Html5QrcodeCameraScanConfig> & {
  verbose?: boolean;
  onSuccess: (value: string) => void;
  onError?: () => void;
  setIsScanning: Dispatch<SetStateAction<boolean>>
};

const QrcodeScanner = ({
  fps,
  qrbox,
  aspectRatio,
  setIsScanning,
  disableFlip,
  videoConstraints,
  onSuccess,
  onError = () => {},
  verbose = false
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

    console.log(qrScanner.getState())

    return () => {
      qrScanner.clear().catch(error => {
        console.error("Error when clearing qrcode-scanner state", error);
      });
    };
  }, []);

  useEffect(() => {
    const headerElem = document.getElementById('html5-qrcode-scanner')
    const dashboard = document.getElementById('html5-qrcode-scanner__dashboard_section_csr')

    const interval = setInterval(() => {
      const cameraStop = document.getElementById('html5-qrcode-button-camera-stop')
      // const dashboard = document.getElementById('html5-qrcode-scanner__dashboard_section_csr')
      const videoElem = document.getElementById('html5-qrcode-scanner__scan_region')
      const videoElement = videoElem.querySelector('video');

      if(videoElement !== null) {
        headerElem.classList.add('QrcodeHeader')
        videoElem.classList.add('QrcodeVideoBlock')
        headerElem.classList.remove('QrcodeHeaderNoneScan')
        dashboard.classList.add('QrcodeDashboard')
        setIsScanning(true)
        dashboard.classList.remove('QrcodeDashboardNoneScan')
        cameraStop.classList.add('QrcodeStopBtn')
      } else {
        setIsScanning(false)
        headerElem.classList.remove('QrcodeHeader')
        headerElem.classList.add('QrcodeHeaderNoneScan')
        videoElem.classList.remove('QrcodeVideoBlock')
        dashboard.classList.add('QrcodeDashboardNoneScan')
        dashboard.classList.remove('QrcodeDashboard')
        cameraStop.classList.remove('QrcodeStopBtn')
      }

    }, 200)

    return () => {
      clearInterval(interval)
    }
  })

  return <div className={styles.QrScanner} id={qrScannerId} />;
};

export default QrcodeScanner;
