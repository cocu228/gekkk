import React, {memo} from 'react';
import {S} from "@/pages/auth/ui";
import ReactQRCode from "react-qr-code";


type TProps = {
    handleView: (val: S) => void
}

const QRCode = memo(({handleView}: TProps) => {

    // const {login} = useAuth();

    return <>
        <h1 className="text-header font-extrabold text-center text-gekDarkGray pb-4">Forgot your PIN?</h1>
        <div className="wrapper flex justify-center">
            <img width={240} src="/public/img/picture-mobile-app.png" alt="picture-mobile-app"/>
        </div>
        <div className="wrapper">
            <div className="row flex flex-nowrap mt-10 mb-4 relative">
                <span className="mr-2 text-green absolute -left-4">1.</span>
                <p>Log in to the Gekkard app on your phone</p>
            </div>
            <div className="row flex flex-nowrap justify-center mb-6">
                <div className="col m-2">
                    <img src="/public/img/app-store.svg" alt="app-store"/>
                </div>
                <div className="col m-2">
                    <img src="/public/img/google-play.svg" alt="google-play"/>
                </div>
            </div>
            <div className="row flex flex-nowrap mb-10 relative">
                <span className="mr-2 text-green absolute -left-4">2.</span>
                <p>Tap Gekkoin invest platform and select Logging in using the QR code</p>
            </div>
            <div className="row flex flex-nowrap mb-10 relative">
                <span className="mr-2 text-green absolute -left-4">3.</span>
                <p>Point your phone to this screen to capture the code</p>
            </div>
        </div>

        <div className="row text-right pb-10 flex justify-center">
            <div className="wrapper w-[max-content] border-1 border-blue border-solid p-4 rounded-md">
                <div style={{height: "auto", margin: "0 auto", maxWidth: 148, width: "100%"}}>
                    <ReactQRCode
                        size={148}
                        style={{height: "auto", maxWidth: "100%", width: "100%"}}
                        value={"value"}
                        viewBox={`0 0 148 148`}
                    />
                </div>
            </div>
        </div>
    </>
})

export default QRCode
