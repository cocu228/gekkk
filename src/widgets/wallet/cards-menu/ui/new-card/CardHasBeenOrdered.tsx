import { Box, Typography } from '@mui/material';
import Success from '@/assets/success.svg?react'
import Button from '@/shared/ui/button/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function CardHasBeenOrdered() {
    const [seconds, setSeconds] = useState(10000);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1000);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (seconds > 0) {
            return;
        }

        navigate('/');
    }, [seconds]);

    const secondsToShow = seconds >= 10000 ? '10' : `0${seconds / 1000}`;

    return <>
        <Box display={"flex"} flexDirection={"column"} gap="48px" alignItems={"center"}>
            <Typography variant='h1' color="pale blue">
                Card has been ordered
            </Typography>

            <Success />

            <Button gray onClick={() => {
               navigate('/'); 
            }}>Back to main page</Button>

            <Typography variant='b2' color="dark grey">
                You will be automatically redirected to the main page in <Typography variant="b3">00:{secondsToShow}</Typography>
            </Typography>
        </Box>
    </>
}