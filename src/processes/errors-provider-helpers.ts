import {isNull, randomId} from "@/shared/lib/helpers";
import {uncoverArray} from "@/shared/lib/helpers";
import {IStateErrorProvider, TResponseErrorProvider} from "@/processes/errors-provider-types";

export const skipList = [
    10006, 10007, 10016, 10024, 10039, 10047, 10064, 10035, 10054, 10065
]

export function hunterErrorStatus(error) {

    if (error.code === "ERR_CANCELED") return Promise.reject(error)

    if (error.response?.status === 500) {

        this.navigate("/", {
            state: 500
        });

        return Promise.reject(error);
    }
    this.setState((prevState: IStateErrorProvider) => ({
        ...prevState,
        errors: [
            ...prevState.errors,
            {
                id: randomId(),
                message: error.message,
                response: error.response
            }
        ]
    }));

    // navigate("/")

    return Promise.reject(error);
}

export class HunterErrorsApi {

    readonly response: TResponseErrorProvider;
    filterListForSkip: Array<number> | null;
    typeResponseError: "BANK" | "GEKKARD" | null;

    constructor(response: TResponseErrorProvider) {
        this.response = response;
        this.filterListForSkip = null;
        this.typeResponseError = null;
    }

    isError() {
        this.typeResponseError = null;
        return (this.isServerApi() || this.isBankApi()) && !this.isConfirmationToken()
    }

    isAuthExpired() {

        if (isNull(this.typeResponseError)) {
            this.isServerApi()
        }

        return this.typeResponseError === "GEKKARD" && this.response.data.error.code === 10065
    }
    
    isNewWallet() {
        
        if (isNull(this.typeResponseError)) {
            this.isServerApi()
        }
        
        return this.typeResponseError === "GEKKARD" && this.response.data.error.code === 10001
    }

    private isServerApi() {

        const isDataError = (this.response.data.result === null && this.response.data.error !== null)
        const isSkipError = isDataError && this.filterListForSkip.some(code => this.response.data.error.code === code)

        this.typeResponseError = isDataError ? "GEKKARD" : this.typeResponseError

        return isDataError && !isSkipError
    }

    private isBankApi() {

        const result = !!this.response.data?.errors &&
            Array.isArray(this.response.data.errors) &&
            this.response.data.errors.length > 0

        this.typeResponseError = result ? "BANK" : this.typeResponseError

        return result
    }

    setFilterListForSkip(resCodeList?: Array<number>) {
        this.filterListForSkip = resCodeList;
    }

    getMessageObject() {
        if (this.typeResponseError === "GEKKARD") {
            return {
                error: {
                    message: this.response.data.error.message,
                    code: this.response.data.error.code,
                    type: "GEKKARD"
                }
            }
        } else if (this.typeResponseError === "BANK") {
            return {
                error: {
                    message: uncoverArray<{ message: string }>(this.response.data.errors).message,
                    code: uncoverArray<{ code: number }>(this.response.data.errors).code,
                    type: "BANK"
                }
            }
        } else {
            return null
        }
    }

    isConfirmationToken() {

        if (isNull(this.typeResponseError)) {
            this.isBankApi()
            this.isServerApi()
        }

        return (this.typeResponseError === "BANK" && uncoverArray<{
            code: number
        }>(this.response.data.errors).code === 449) || (this.typeResponseError === "GEKKARD" && this.response.data.error.code === 10068)
    }
}

