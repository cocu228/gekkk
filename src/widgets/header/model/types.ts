export type TOnActionParams = Array<{
    type: string,
    action: (value?: THeaderMenuList[0]["action"]["value"]) => void
}>

export interface IHeaderMenuList {
    item: string | JSX.Element,
    id?: null | number | string,
    action?: {
        type?: null | string,
        value?: null | string | unknown,
    },
    icon?:string | JSX.Element,
    style?: object
}

export type THeaderMenuList = IHeaderMenuList[]

export interface TPropsHeaderMenu {
    children: JSX.Element,
    className?: string,
    items: THeaderMenuList,
    actions?: TOnActionParams,
    onStateChange?: (value: boolean) => void
}
