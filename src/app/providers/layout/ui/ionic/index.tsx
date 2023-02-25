import React, {PropsWithChildren} from "react";


const Layout = ({children}: { children: PropsWithChildren }) => {
    console.log("ionic")
    return <>
        {children}
    </>
}

export default Layout