export const validateStatus = (status)  => {
    if (status === null) {
        return undefined
    } else {
        return status === "SUCCESS" ? "success" : "error"
    }
}

export const alarmText = (status) => status === "INVALID" ?
    "The code is invalid" : status === null ? "" :
        status === "SUCCESS" ? "The code is applied" : ""