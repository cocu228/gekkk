import React from 'react'
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import Dashboard from '@/pages/dashboard'
import Deposit from "@/pages/new-deposit";
import AppInit from "@/app/providers/AppInit";
import PageProblems from '@/pages/page-problems/PageProblems';
import Support from "@/pages/support";
import ProfileSettings from "@/pages/profile-settings";
import DepositTypes from "@/pages/deposit-types";
import CurrentDeposit from "@/pages/current-deposit";


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
                path: 'open-deposit',
                element: <Deposit/>
            },
            {
                path: 'deposit-types',
                element: <DepositTypes/>,
            },
            {
                path: 'deposit/:id',
                element: <CurrentDeposit/>
            },
            {
                path: 'support',
                children: [
                    {
                        path: '',
                        element: <Support/>
                    },
                    // {
                    //     path: 'chat',
                    //     element: <SupportChatAuthorized/>
                    // },
                ]
            },
            {
                path: 'support',
                element: <Support/>
            },
            {
                path: 'profile-settings',
                element: <ProfileSettings/>
            },
        ],
    },
    // {
    //     path: 'chat',
    //     element: <SupportChatUnauthorized/>
    // },
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