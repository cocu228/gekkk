import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import Dashboard from '@/pages/dashboard'
import Deposit from "@/pages/deposit";
import Wallet from '@/pages/wallet';
import Exchange from "@/pages/exchange";
import AppInit from "@/app/providers/AppInit";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppInit/>,
        children: [
            {
                path: '',
                element: <Dashboard/>
            },
            {
                path: 'deposit',
                element: <Deposit/>
            },
            {
                path: 'exchange',
                element: <Exchange/>
            },
            {
                path: 'wallet/:coin/:tab?',
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