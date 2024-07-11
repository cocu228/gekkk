export const formatAsNumber = (str: string) => str.replace(/\D/g, "")

const pattern = /^[^.\d]+|[^\d.]+$/g;
export const formatAsNumberAndDot = (str: string) => {

    if (str.split('.').length > 2) {
        return str.slice(0, -1)
    }
    return (str === "." || str === "") ? "" : str.replace(pattern, "")
}
