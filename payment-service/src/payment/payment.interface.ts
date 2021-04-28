export interface PaymentRequest {
    orderId: number;
    amount: number;
    cardInfo: string;
}

export interface PaymentInfo {
    orderId: number;
    amount: number;
    externalTransactionId: string;
}