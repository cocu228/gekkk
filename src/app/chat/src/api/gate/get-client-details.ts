import { makeApiRequest } from "../../utils/(cs)axios";
import { GateApiResponse } from "./types";

interface ClientDetails {
    clientId: string;
    name: string;
    phone: string;
    email: string;
    citizenship: string;
    address: string;
    street: string;
    streetNumber: string;
    city: string;
    postalCode: string;
    country: string;
}

export const apiGetClientDetails = () =>
  makeApiRequest<GateApiResponse<ClientDetails>>('GET', '/gek/v1/bank/client_details', null, {
    //@ts-ignore
    baseURL: import.meta.env.VITE_GATE_URL,
    headers: {
        ApplicationId: "GEKKARD",
        ProductId: "GEKKARD",
    }
  });
