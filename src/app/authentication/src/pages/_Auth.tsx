import {ResetPasswordForm} from "../widgets/ResetPasswordForm";
import {LoginPasswordForm} from "../widgets/LoginPasswordForm";
// import {RegisterDeviceKey} from "../widgets/RegisterDeviceKey";
import {LoginDeviceKey} from "../widgets/LoginDeviceKey";
import {useState} from "preact/hooks";

export function _Auth() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const emailCode = urlParams.get('emailCode')

    const [state, setState] =
        useState<"loginPassword" | "loginDeviceKey" | "resetPasswordForm">(emailCode ? "resetPasswordForm" : "loginPassword")


    // console.log(emailCode)

    return <div className="px-24">
        <div className="row mt-40 mb-40">
            <div className="col-xs-12">
                <button onClick={() => setState("loginPassword")}
                        style={state === "loginPassword" ? {border: "2px solid black"} : {}}
                        className="mx-12">Login
                </button>
                <button onClick={() => setState("resetPasswordForm")}
                        style={state === "resetPasswordForm" ? {border: "2px solid black"} : {}}
                        className="mx-12">Reset
                    Password Form
                </button>
                <button onClick={() => setState("loginDeviceKey")}
                        style={state === "loginDeviceKey" ? {border: "2px solid black"} : {}}
                        className="mx-12">Login
                    Device Key
                </button>
            </div>
        </div>
        {state === "resetPasswordForm" && <div className="row mb-40">
            <div className="col-sm-6 col-xs-12">
                <ResetPasswordForm emailCode={emailCode} handleCancel={() => {}}/>
            </div>
        </div>}
        {state === "loginPassword" && <div className="row">
            <div className="col-sm-6 col-xs-12">
                <LoginPasswordForm/>
            </div>
        </div>}
        {state === "loginDeviceKey" && <div className="row">
            {/*<div className="col-sm-6 col-xs-12">*/}
            {/*    <RegisterDeviceKey/>*/}
            {/*</div>*/}
            <div className="col-sm-6 col-xs-12">
                <LoginDeviceKey/>
            </div>
        </div>}
    </div>
}
