import React from "react";
import {THeaderMenuList} from "@/widgets/header/model/header-menu-list";

type TOnActionParams = Array<{
    type: string,
    action: (value: THeaderMenuList[0]["action"]["value"]) => void
}>

export default class DropdownMenuFunctions {

    ref: React.MutableRefObject<null | HTMLDivElement>;
    actions?: TOnActionParams;
    toggleOpen: React.Dispatch<React.SetStateAction<boolean>>

    constructor(ref, toggleOpen, actions) {
        this.ref = ref
        this.actions = actions
        this.toggleOpen = toggleOpen
    }

    onOpen = () => {
        this.toggleOpen(prev => !prev)
        document.addEventListener('click', this.onClick)
    }


    onClick = ({target}) => {
        if (!this.ref.current.contains(target)) {
            this.toggleOpen(false)
            this.removeEventListener()
        }
    }

    onAction = (action: THeaderMenuList[0]["action"]) => {
        if (action.type) {
            this.actions.forEach(item => item.type == action.type && item.action(action.value))
        }
    }


    removeEventListener = () => document.removeEventListener('click', this.onClick)

}