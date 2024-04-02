import {AxiosRequestConfig} from "axios";
import {$axios} from "@/shared/lib/(orval)axios";

export interface IReceiptData {
    id: string;
    amount: string;
    fee: string;
    status: string;
    paymentType: string;
    fromNumber: string;
    fromName: string;
    fromBank: string;
    toNumber: string;
    toName: string;
    toBank: string;
    currency: {
        code: string;
    };
    clientId: string;
    accountId: string;
    description: string;
    executedAt: string;
    referenceNumber: string;
    paymentToRepeat: {
        type: string;
        fromPhone: string;
        toPhone: string;
        account: string;
        fromCardPan: string;
        fromCardId: string;
        beneficiaryName: string;
        beneficiaryAccount: string;
        country: string;
        city: string;
        address: string;
        swiftCode: string;
        beneficiaryBank: string;
        intermediaryBank: string;
        intermediarySwift: string;
        intermediaryAccount: string;
        commissionType: string;
        urgency: string;
        iban: string;
        phoneNumber: string;
        cardNumber: string;
        currencyCode: string;
        amount: string;
        purpose: string;
        transferDetails: string;
    };
    openapiData: {
        type: string;
        toCard: string;
        toPhone: string;
        subType: string;
        externalOwnerID: string;
        fromCardPan: string;
    };
    operationType: string;
    fromPanDisplay: string;
}

export const apiGetBankReceipt = (referenceNumber: string, params?: AxiosRequestConfig) =>
    $axios.get<any>(`/api/v2/operations/${referenceNumber}`, {
        ...params,
        baseURL: import.meta.env.VITE_BANK_API_URL,
    });


/*TODO: Test data for receipt modal
{
    "id": "PPY199235",
    "amount": -10.00,
    "fee": 0,
    "status": "INSUFFICIENT_FUNDS",
    "paymentType": "TRANSFER",
    "fromNumber": "MT07PAPY36836000002676370005866",
    "fromName": "Ralf Williams",
    "fromBank": null,
    "toNumber": "MT03PAPY36836000002676370007199",
    "toName": "Test Three",
    "toBank": "Papaya",
    "currency": {
        "code": "EUR"
    },
    "clientId": "6449",
    "accountId": "PPY34446",
    "description": "Other Test",
    "executedAt": "2024-04-02T05:07:17.9",
    "referenceNumber": "PPY128fbebb-22e9-42fb-9dbe-1ace2bb972b",
    "paymentToRepeat": {
        "type": "PAYMENT_SEPA",
        "fromPhone": "79111111111",
        "toPhone": null,
        "account": "PPY6963",
        "fromCardPan": null,
        "fromCardId": null,
        "beneficiaryName": "Test",
        "beneficiaryAccount": null,
        "country": null,
        "city": null,
        "address": null,
        "swiftCode": null,
        "beneficiaryBank": null,
        "intermediaryBank": null,
        "intermediarySwift": null,
        "intermediaryAccount": null,
        "commissionType": null,
        "urgency": null,
        "iban": "MT03PAPY36836000002676370007199",
        "phoneNumber": null,
        "cardNumber": null,
        "currencyCode": "EUR",
        "amount": 10,
        "purpose": "Test",
        "transferDetails": "Other"
    },
    "openapiData": {
        "type": "TO_ACCOUNT",
        "toCard": null,
        "toPhone": null,
        "subType": null,
        "externalOwnerID": null,
        "fromCardPan": null
    },
    "operationType": null,
    "fromPanDisplay": null
}
*/
