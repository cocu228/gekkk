import React, {useState} from 'react';
import {Outlet} from 'react-router'
import {NavLink} from 'react-router-dom'

function AuthPage() {

    const [toggle, setToggle] = useState("Login")

    return (

            <div className="wrapper absolute top-0 left-0 right-0 px-4 pt-6">
                <div className="wrapper">
                    <div className="grid grid-rows-1 justify-center pb-6">
                        <img width={72} height={24} src="public/logo.png" alt="logo"/>
                    </div>
                </div>
                <div className="grid justify-center pb-10">
                    <div className="gap-2 inline-grid grid-cols-2 grid-rows-1">
                        <NavLink to={'/auth/login'} >
                            {
                                ({isActive}) =>
                            <span className={isActive ? "active border-b-2 text-center border-b-blue-600" : "text-center"}>
                                Login
                            </span>
                             }
                        </NavLink>
                        <NavLink to={'/auth/register'} >
                            {
                                ({isActive}) =>
                                    <span className={isActive ? "active border-b-2 text-center border-b-blue-600" : "text-center"}>
                                Create
                            </span>
                            }
                        </NavLink>
                    </div>
                </div>

                <div className={`wrapper`}>
                    <Outlet />
                </div>
            </div>

    )
}

export default AuthPage;
