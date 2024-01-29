import {memo, useContext, useRef, useState} from 'react';
import {storyDisplayAuth} from '../../model/story';


const ForgotPassword = memo(() => {

    const {toggleStage} = storyDisplayAuth(state => state);

    return <div
        className='typography-b1'
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
        }}>
        <p>
            To restore your password, contact the Support team and provide the following details:
        </p>

        <ul style={{
            color: 'var(--new-pale-blue)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            listStyle: 'disc',
            paddingLeft: '18px',
            marginBottom: '36px',
        }}>
            <li>
                Your full name
            </li>
            <li>
                Your phone number, linked to the Gekkard account
            </li>
            <li>
                Your email address, linked to the Gekkard account
            </li>
            <li>
                Today’s selfie with your passport or ID card
            </li>
            <p>
                When you have this data, you can contact contact the Support team by clicking the button below
            </p>
        </ul>
        <div style={{
            display: 'flex',
            gap: '36px'

        }}>
            <button className='account-button' type="button">
                Contact support
            </button>
            <button className='second_value-button' type="button" onClick={() => {
                toggleStage('authorization');
            }}>
                Back to Log in
            </button>
        </div>
    </div>
})

export default ForgotPassword
