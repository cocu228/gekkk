import {useCallback, useEffect, useState} from "react";
import {mediaQuery} from "../theme";

const useMedia = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false)

    const handleOnResize = useCallback(() => {
        const mobileMedia = mediaQuery.isMobile.split("and ")[1]
        const match = window.matchMedia(mobileMedia).matches
        setIsMobile(match)
    }, [])


    useEffect(() => {
        handleOnResize()
        window.addEventListener("resize", handleOnResize)
        return () => {
            window.removeEventListener("resize", handleOnResize)
        }
    }, [handleOnResize])

    return {
        isMobile,
        isDesktop: !isMobile
    }
}

export default useMedia;