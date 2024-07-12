import React, { memo, useContext, useEffect, useRef, useState } from "react";
import ReactQRCode from "react-qr-code";
import { IResSessionData, apiTokenHash } from "@/widgets/(no-usages)auth/api";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { useAuth } from "@/app/providers/AuthRouter";
import { helperApiQRCode, helperApiTokenHash } from "@/widgets/(no-usages)auth/model/helpers";
import { AxiosResponse } from "axios";
import { $AxiosResponse } from "@/shared/lib/(orval)axios";
import { storyDisplayAuth } from "../../model/story";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";

const QRCode = memo(() => {
  const { toggleStage } = storyDisplayAuth(state => state);
  const [hash, setHash] = useState<null | string>(null);
  const ref = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const { login } = useAuth();
  const { md } = useContext(BreakpointsContext);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    apiTokenHash().then((res: AxiosResponse<$AxiosResponse<string>>) =>
      helperApiQRCode(res).success(() => {
        setHash(res.data.result);

        ref.current = setInterval(() => {
          apiTokenHash(res.data.result).then((res: AxiosResponse<$AxiosResponse<IResSessionData>>) => {
            if (res.data.error?.code === 10029) toggleStage("authorization");
            if (res.data.error) return;

            helperApiTokenHash(res).success(() => {
              login(res.data.result.authorization, res.data.result.token, res.data.result.tokenHeaderName);
              clearInterval(ref.current);
            });
          });
        }, 3000);
      })
    );

    return () => clearInterval(ref.current);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [hash]);

  return (
    <>
      <h1
        className={`font-extrabold text-center text-gray-dark pb-4
            ${md ? "text-2xl" : "text-header"}`}
      >
        Forgot your PIN?
      </h1>
      <div className='wrapper flex justify-center'>
        <img width={240} src='/img/picture-mobile-app.png' alt='picture-mobile-app' />
      </div>

      <div className='wrapper'>
        <div className='row flex flex-nowrap mt-10 mb-4 relative'>
          <span className='mr-2 text-green absolute -left-4'>1.</span>

          <p>Log in to the Gekkard app on your phone</p>
        </div>

        <div className='row flex flex-nowrap justify-center mb-6'>
          <div className='col m-2'>
            <a href='/'>
              <img src='/img/app-store.svg' alt='app-store' />
            </a>
          </div>

          <div className='col m-2'>
            <a href='/'>
              <img src='/img/google-play.svg' alt='google-play' />
            </a>
          </div>
        </div>

        <div className='row flex flex-nowrap mb-10 relative'>
          <span className='mr-2 text-green absolute -left-4'>2.</span>
          <p>Tap Gekkoin invest platform and select Logging in using the QR code</p>
        </div>

        <div className='row flex flex-nowrap mb-10 relative'>
          <span className='mr-2 text-green absolute -left-4'>3.</span>
          <p>Point your phone to this screen to capture the code</p>
        </div>
      </div>

      {hash && (
        <div className='row text-right pb-10 flex justify-center items-center flex-col'>
          <div className='mb-3'>Time left: {timeLeft.toString()} sec.</div>

          <div className='wrapper w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md'>
            <div style={{ height: "auto", margin: "0 auto", maxWidth: "120px", width: "100%" }}>
              <ReactQRCode
                size={148}
                style={{ height: "auto", maxWidth: "120px", width: "100%" }}
                value={hash}
                viewBox={`0 0 148 148`}
              />
            </div>
          </div>

          <div className='row mt-8 w-full'>
            <ClipboardField value={hash} />
          </div>
        </div>
      )}
    </>
  );
});

export default QRCode;
