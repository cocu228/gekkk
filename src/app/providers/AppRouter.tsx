import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import RootLayout from './RootLayout'
import Dashboard from '@/pages/dashboard'
import Deposit from "@/pages/deposit";
import Wallet from '@/pages/wallet';


const router = createBrowserRouter([
{
    path: "/",
    element: <RootLayout/> ,
    children: [
        {
            path: 'dashboard',
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