import React from "react";

export default [
    {
        item: <div className="flex items-center justify-end">
            <div className="wrapper mr-2">
                <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M24.034 17.6c1.23.547 2.302 1.218 3.185 1.994a6.237 6.237 0 012.116 4.687v1.927a3.128 3.128 0 01-3.125 3.125H5.793a3.128 3.128 0 01-3.125-3.125v-1.927c0-1.797.771-3.506 2.115-4.687 1.088-.956 3.173-2.374 6.523-3.11a7.7 7.7 0 01-3.013-6.109c0-4.25 3.458-7.708 7.708-7.708s7.709 3.458 7.709 7.708-3.458 7.708-7.709 7.708c-5.724 0-8.79 2.151-9.843 3.076a4.154 4.154 0 00-1.407 3.122v1.927c0 .575.468 1.042 1.042 1.042H26.21c.574 0 1.041-.467 1.041-1.042v-1.927a4.154 4.154 0 00-1.407-3.122c-.725-.637-1.619-1.194-2.656-1.655a1.042 1.042 0 01.846-1.904zM16 4.75a5.631 5.631 0 00-5.625 5.625A5.631 5.631 0 0016.001 16a5.631 5.631 0 005.625-5.625 5.631 5.631 0 00-5.625-5.625z"
                          fill="#00AEEF"/>
                </svg>

            </div>
            <div className="wrapper">
                <div className="row">
                    <span className="text-sm font-bold text-blue-400">ID: 208294110048 </span>
                </div>
                <div className="row text-start">
                    <span className="text-xs text-start text-blue-400 font-bold">Alexandr Semikov</span>
                </div>
            </div>
        </div>, id: 'id', event: {action: undefined, value: "/"}
    },
    {item: 'Dashboard', id: 'dashboard', event: {action: "link", value: "/"}},
    {item: 'Deposit types', id: 'deposit', event: {action: "link", value: "deposit"}},
    {item: 'Limits', id: 'limits'},
    {item: 'Partnership program', id: 'item-4'},
    {item: 'Settings', id: 'item-4'},
    {
        item: 'Logout', id: 'logout',
        event: {action: "logout", value: null},
        style: {
            borderTop: "1px solid var(--color-gray-400)"
        }
    },
]