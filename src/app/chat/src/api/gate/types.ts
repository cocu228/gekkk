interface ErrorObject {
  code?: number;
  message?: string | null;
}

export interface GateApiResponse<T> {
  id?: number;
  error?: ErrorObject;
  result?: T;
}
