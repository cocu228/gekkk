import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import Dashboard from '@/pages/dashboard'
import Deposit from "@/pages/deposit";
import CurrentDeposit from '@/pages/current-deposit'
import Wallet from '@/pages/wallet';
import Exchange from "@/pages/exchange";
import AppInit from "@/app/providers/AppInit";
import Assets from '@/pages/assets';
import P404 from '@/pages/404/404';

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
                path: 'assets',
                element: <Assets/>
            },
            {
                path: 'wallet/:currency/:tab?',
                element: <Wallet/>
            },
            {
                path: 'current-deposit',
                element: <CurrentDeposit/>
            },
        ],
    },
    {
        path: "*",
        element: <P404/>
    },
]);

export default () => {
    return (
        <RouterProvider router={router}/>
    )
}