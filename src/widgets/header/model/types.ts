import { ICtxAccount } from "@/processes/RootContext"

export type TOnActionParams = Array<{
    type: string,
    action: (value?: THeaderMenuList[0]["action"]["value"]) => void
}>

export type THeaderMenuList = Array<{
    item: string | JSX.Element,
    id?: null | number | string,
    action?: {
        type?: null | string,
        value?: ICtxAccount | unknown,
    },
    style?: object
}>

export interface TPropsHeaderMenu {
    children: JSX.Element,
    className?: string,
    items: THeaderMenuList,
    actions?: TOnActionParams
}