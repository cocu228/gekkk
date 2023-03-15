import React, {PropsWithChildren} from "react";


const Layout = ({children}: { children: PropsWithChildren }) => {

    console.log("default")

    return <>
        {children}
    </>
}

export default Layout