import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import RootLayout from './RootLayout'
import AuthPage from '../../pages/auth/AuthPage'
import InnerLayout from './InnerLayout'
import Dashboard from '../../pages/dashboard/Dashboard'
import IndexRedirect from './IndexRedirect'
import FormLoginAccount from '../../entities/auth/ui/form-authorization'
import FormCreateAccount from '../../entities/auth/ui/form-registration'


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