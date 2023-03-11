import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import RootLayout from './RootLayout'
import Dashboard from '@/pages/dashboard'
import Deposit from "@/pages/deposit";
import Wallet from '@/pages/wallet';
import {AuthProvider} from "@/app/providers/AuthRouter";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthProvider>
            <RootLayout/>
        </AuthProvider>,
        children: [
            {
                path: '',
                element: <Dashboard/>
            },
            {
                path: 'deposit',
                element: <Deposit/>
            }, {
                path: 'wallet/:coin',
                element: <Wallet/>
            },
            {
                path: 'wallet',
                element: <Wallet/>
            }
        ],
    },
]);

export default () => {
    return (
        <RouterProvider router={router}/>
    )
}