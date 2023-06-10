import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import Dashboard from '@/pages/dashboard'
import Deposit from "@/pages/new-deposit";
import CurrentDeposit from '@/pages/current-deposit'
import AppInit from "@/app/providers/AppInit";
import PageProblems from '@/pages/page-problems/PageProblems';
import Support from "@/pages/support";
import CryptoDeposits from "@/pages/crypto-deposits";


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
                path: 'new-deposit',
                children: [
                    {
                        path: '',
                        element: <Deposit/>,
                    }
                ]
            },
            {
                path: 'deposit-types',
                element: <CryptoDeposits/>,
            },
            {
                path: 'support',
                element: <Support/>
            },
            {
                path: 'deposit/:id',
                element: <CurrentDeposit/>
            },
        ],
    },
    {
        path: "*",
        element: <PageProblems/>
    },
]);

export default () => {
    return (
        <RouterProvider router={router}/>
    )
}