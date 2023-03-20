import React from 'react';
import styles from './style.module.scss';

const orders = [
    {
        id: 1,
        payValue: '62,5',
        payToken: 'EURG',
        getValue: '0,5',
        getToken: 'XMR',
        date: '01/12/2022, 17:45',
        price: '125,04',
        info: '(sale at the current market rate)'
    },
    {
        id: 2,
        payValue: '62,5',
        payToken: 'EURG',
        getValue: '0,5',
        getToken: 'XMR',
        date: '01/12/2022, 17:45',
        price: '125,04'
    },
    {
        id: 3,
        payValue: '62,5',
        payToken: 'EURG',
        getValue: '0,5',
        getToken: 'XMR',
        date: '01/12/2022, 17:45',
        price: '125,04'
    }
];

function OpenOrders() {
    return (
        <>
            <div className="flex justify-between">
                <span className="font-medium">Open orders</span>
                <a className="text-xs text-secondary font-medium" href="">All</a>
            </div>
            <div className="mt-1.5">
                {orders.map(orderItem => (
                    <div className={`py-2 text-xs rounded-md ${styles.Item}`} key={orderItem.id}>
                        <div className="flex justify-between">
                            <div className="text-orange bg-orange bg-opacity-10 rounded-md">
                                <strong>{orderItem.payValue}</strong> ${orderItem.payToken} &rarr; <strong>{orderItem.getValue}</strong> {orderItem.getToken}
                            </div>
                            <div className="text-secondary">{orderItem.date}</div>
                        </div>
                        <div className="flex justify-between mt-1">
                            <div className="flex gap-2.5">
                                <div className="text-secondary">Price: </div>
                                <div>
                                    <span>1 ${orderItem.payToken} ~ ${orderItem.price} ${orderItem.getToken}</span>&nbsp;
                                    {orderItem.info && (
                                        <span>{orderItem.info}</span>
                                    )}
                                </div>
                            </div>
                            <button className="text-secondary">Cancel</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default OpenOrders;