export function randomId(num = null, value = 12): string | Array<string> {
    if (typeof num === "number") {
        let arr = []
        for (let i = 0; i <= num; i++) {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < value; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            arr.push(text)
        }
        return arr
    }

    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < value; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}