import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import RootLayout from './RootLayout'
import AuthPage from '../../pages/auth'
import InnerLayout from './InnerLayout'
import Dashboard from '../../pages/dashboard'
import IndexRedirect from './IndexRedirect'
import FormLoginAccount from '../../entities/auth/ui/form-authorization'
import FormCreateAccount from '../../entities/auth/ui/form-registration'
import Deposit from "../../pages/deposit";


const router = createBrowserRouter([
{
    element: <RootLayout />,
    path: '/',
    children: [
            {
                index: true,
                element: <IndexRedirect />
            },
            {
                path: "auth",
                element: <AuthPage />,
                children: [
                     {
                        path: "login",
                        element: <FormLoginAccount />,

                    },
                     {
                        path: "register",
                        element: <FormCreateAccount />,
                    },

                ],
            },

        {
            path: 'in',
            element: <InnerLayout/>,
            children: [
                {
                    path: 'dashboard',
                    element: <Dashboard/>
                },
                {
                    path: 'deposit',
                    element: <Deposit/>
                }
            ]
        }
    ],
},
]);

export default () => {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<b>Fatal</b>}
        />
    )
}