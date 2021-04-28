import { Injectable } from '@nestjs/common';
import { PaymentStatus } from 'src/payment/payment.enum';

@Injectable()
export class BankGateRepository {
  constructor() {}

  async chargeAmountByCard(
    cardInfo: string,
    amount: number
  ): Promise<{
    status: PaymentStatus;
    cardInfo: string;
    amount: number;
    externalTransactionId: string;
  }> {
    const isSucceed = Math.random() < 0.5;
    const result = {
      cardInfo,
      amount
    };
    if (isSucceed) {
      return {
        ...result,
        status: PaymentStatus.Succeed,
        externalTransactionId: Date.now()
      };
    }
    return {
      ...result,
      status: PaymentStatus.Fail,
      externalTransactionId: null
    };
  }
}
