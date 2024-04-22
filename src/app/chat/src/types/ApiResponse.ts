type ApiResponse<T, S extends 'success' | 'error'> = S extends 'success'
    ? {
        status: S;
        data: T;
    } : {
        status: S;
        errorMessage: string;
    };

export default ApiResponse