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

    return {
        topLeft: borderTopLeft ? "8px" : "2px",
        topRight: borderTopRight ? "8px" : "2px",
        bottomLeft: borderBottomLeft ? "8px" : "2px",
        bottomRight: borderBottomRight ? "8px" : "2px"
    }
}