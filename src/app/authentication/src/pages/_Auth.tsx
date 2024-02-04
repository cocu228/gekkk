import {ResetPasswordForm} from "../widgets/ResetPasswordForm";
import {LoginPasswordForm} from "../widgets/LoginPasswordForm";
import {RegisterDeviceKey} from "../widgets/RegisterDeviceKey";
import {LoginDeviceKey} from "../widgets/LoginDeviceKey";

export function _Auth() {

    return <>
        <div className="row mb-40">
            <div className="col-sm-6 col-xs-12">
                <ResetPasswordForm/>
            </div>
            <div className="col-sm-6 col-xs-12">
                <LoginPasswordForm/>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-6 col-xs-12">
                <RegisterDeviceKey/>
            </div>
            <div className="col-sm-6 col-xs-12">
                <LoginDeviceKey/>
            </div>
        </div>
    </>
}
