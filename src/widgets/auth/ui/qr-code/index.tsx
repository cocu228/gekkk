import React, {memo, useEffect, useRef, useState} from 'react';
import {S} from "@/pages/auth/ui";
import ReactQRCode from "react-qr-code";
import {apiQRCode} from "@/widgets/auth/api";


type TProps = {
    handleView: (val: S) => void
}

const QRCode = memo(({handleView}: TProps) => {

    const [hash, setHash] = useState<null | string>(null)
    const ref = useRef<unknown>(null)
    // const {login} = useAuth();

    useEffect(() => {

        (async () => {
            apiQRCode().then(res => {
                if (typeof res.data === "string") {

                    setHash(res.data)

                    ref.current = setInterval(() => {
                        apiQRCode(res.data).then(res => {
                            console.log(res)
                        })
                    }, 3000)
                }
            })
        })()

        return () => clearInterval(ref.current)

    }, [])

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

        {hash && <div className="row text-right pb-10 flex justify-center">
            <div className="wrapper w-[max-content] border-1 border-blue border-solid p-4 rounded-md">
                <div style={{height: "auto", margin: "0 auto", maxWidth: 148, width: "100%"}}>
                    <ReactQRCode
                        size={148}
                        style={{height: "auto", maxWidth: "100%", width: "100%"}}
                        value={hash}
                        viewBox={`0 0 148 148`}
                    />
                </div>
            </div>
        </div>}
    </>
})

export default QRCode
