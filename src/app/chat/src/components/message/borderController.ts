export interface IGetBorderCssProps {
    type: "incoming" | "outgoing",
    last?: boolean,
    single?: boolean,

}
export const getBorderCss = ({
    type,
    last,
    single
}: IGetBorderCssProps) => {

    let borderTopLeft, borderTopRight, borderBottomLeft, borderBottomRight

    if (type === "outgoing") {
        borderTopLeft = true
        borderBottomLeft = true
        borderBottomRight = !!last
        borderTopRight = !!(!last && single)
    } else {
        borderTopRight = true
        borderBottomRight = true
        borderBottomLeft = !!(single || last)
        borderTopLeft = !!last
    }

    return `
        border-top-left-radius: ${borderTopLeft ? "8px" : "2px"};
        border-top-right-radius: ${borderTopRight ? "8px" : "2px"};
        border-bottom-left-radius: ${borderBottomLeft ? "8px" : "2px"};
        border-bottom-right-radius: ${borderBottomRight ? "8px" : "2px"};
    `
}