import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import RootLayout from './RootLayout'
import AuthPage from './auth/AuthPage'
import InnerLayout from './InnerLayout'
import Dashboard from './dashboard/Dashboard'
import IndexRedirect from './IndexRedirect'
import FormLoginAccount from '../widgets/form-authorization'
import FormCreateAccount from '../widgets/form-registration'


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