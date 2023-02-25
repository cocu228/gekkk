import React, {PropsWithChildren} from "react";


const Layout = ({children}: { children: PropsWithChildren }) => {
    console.log("default")
    return <>
        <span>default</span>
        {children}
    </>
}

export default Layout