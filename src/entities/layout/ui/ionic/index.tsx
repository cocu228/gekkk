import React, {PropsWithChildren} from "react";


const Layout = ({children}: { children: PropsWithChildren }) => {
    console.log("ionic")
    return <>
        <span>ionic</span>
        {children}
    </>
}

export default Layout