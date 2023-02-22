import React from 'react'
import * as A from 'antd'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import RootLayout from './RootLayout'
import Auth from './authorization'
import InnerLayout from './InnerLayout'
import IndexHandler from './IndexHandler'


  
const router = createBrowserRouter([
{
    path: "/",
    element: <RootLayout />,

    children: [

            {
                path: "auth",
                element: <Auth />,
                children: [
                    /** {
                path: "login",
                element: <FormLoginAccount />,

            },
                     {
                path: "register",
                element: <FormCreateAccount />,

            },
                     */
                ],
            },

        {
            path: 'in',
            element: <InnerLayout/>,
            children: [
                {
                    path: 'dashboard',
                    element: <InnerLayout/>
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
            fallbackElement={<A.Spin />}
        />
    )
}