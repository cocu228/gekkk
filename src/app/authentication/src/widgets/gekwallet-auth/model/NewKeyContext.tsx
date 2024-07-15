import { StateUpdater } from "preact/hooks";
import * as React from "react";
import { useState } from "react";
import { createContext } from "react";

interface NewKeyContextProviderProps {
    children: React.ReactNode
}

interface INewKeyContext {
    opened: boolean;
    setOpened: StateUpdater<boolean>
}

export const NewKeyContext = createContext<INewKeyContext>(null)

export default function NewKeyContextProvider(props: NewKeyContextProviderProps) {
    const {children} = props
    const [opened, setOpened] = useState<boolean>()

    return (
        <NewKeyContext.Provider value={{
            opened,
            setOpened
        }}>
            {children}
        </NewKeyContext.Provider>
    )
}
