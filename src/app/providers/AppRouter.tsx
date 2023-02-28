import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import RootLayout from './RootLayout'
import Dashboard from '@/pages/dashboard'
import Deposit from "@/pages/deposit";


const router = createBrowserRouter([

{
    element: <RootLayout />,
    path: '/',
    children: [
        {
            path: 'dashboard',
            element: <Dashboard/>
        },
        {
            path: 'deposit',
            element: <Deposit/>
        }
    ],
},
]);

export default () => {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<b>404</b>}
        />
    )
}