import { IResErrors, IResResult } from "@/shared/api";
import { $axios } from "@/shared/lib/(orval)axios";

export interface IDeliveryData {
  isExpressDelivery: boolean;
  deliveryAddress: {
    cardId: string;
    productType: string;
    accountId: string;
    ownerClientId: string;
    city: string;
    countryCode: string;
    postalCode: string;
    street: string;
    streetNumber: string;
    apartmentNumber: string;
    recipientName: string;
  };
}

export const apiOrderVirtualCard = (deliveryData: IDeliveryData) =>
  $axios.post<IResErrors | IResResult>(`api/v2/cards/${deliveryData.deliveryAddress.cardId}/order`, deliveryData, {
    headers: {
      "X-Confirmation-Type": "PIN"
    }
  });
