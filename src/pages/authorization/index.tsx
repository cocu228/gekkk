import React, {memo, useState} from "react";
import FormCreateAccount from "../../widgets/form-registration";
import FormLoginAccount from "../../widgets/form-authorization";


function Authorization() {

    const [toggle, setToggle] = useState("Login")

    return (
        <div className="w-full h-full relative">
            <div className="wrapper absolute top-0 left-0 right-0 px-4 pt-6">
                <div className="wrapper">
                    <div className="grid grid-rows-1 justify-center pb-6">
                        <img width={72} height={24} src="public/logo.png" alt="logo"/>
                    </div>
                </div>
                <div className="grid justify-center pb-10">
                    <div className="gap-2 inline-grid grid-cols-2 grid-rows-1">
                        <span onClick={() => setToggle(prev => "Login")}
                              className={`${toggle === "Login" ? "active border-b-2 text-center border-b-blue-600" : "text-center"}`}>Login</span>
                        <span onClick={() => setToggle(prev => "Create")}
                              className={`${toggle === "Create" ? "active text-center border-b-2 border-b-blue-600" : "text-center"}`}>Create</span>
                    </div>
                </div>
                <div className={`wrapper ${toggle === "Login" ? "" : "hidden"}`}>
                    <FormLoginAccount/>
                </div>
                <div className={`wrapper ${toggle === "Create" ? "" : "hidden"}`}>
                    <FormCreateAccount/>
                </div>
            </div>
        </div>
    )
}

export default Authorization;
