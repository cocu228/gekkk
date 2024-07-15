export type SignHeaders = {
  "X-App-Uuid"?: string;
  "X-Confirmation-Code": string;
  "X-Confirmation-Token": string;
  "X-Confirmation-Type": "PIN" | "SIGN";
};

export interface IResCommission {
  total: number;
  commission: number;
  currency: {
    code: string;
    label: string; // Not used
  };
}

export interface IResErrors {
  errors: [
    {
      code: number;
      type: string;
      message: string;
      properties: Record<string, string>[];
    }
  ];
}

export interface IResResult {
  status: string;
  referenceNumber: string;
}
