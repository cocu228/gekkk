import {useEffect} from 'react';
import {apiApplyCode} from '@/shared/api';
import {uncoverResponse} from '@/shared/lib/helpers';
import {useNavigate, useSearchParams} from 'react-router-dom';

const useRoomCodeRedirect = (token: string) => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const roomCode = params.get("roomCode");

    if (roomCode) {
        localStorage.setItem("roomCode", roomCode);
    }

    useEffect(() => {
        if (token && location.pathname === '/') {
            const roomCode = localStorage.getItem("roomCode");

            if (!roomCode) return;
            
            (async function() {
                const response = await apiApplyCode(roomCode);

                if (response.data.error) return;

                localStorage.removeItem("roomCode");
                navigate(`/private-room/${uncoverResponse(response)}`);
            })();
        }
    }, [token]);
};

export default useRoomCodeRedirect;
