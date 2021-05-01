import { Injectable } from '@nestjs/common';
import { BankGateRepository } from '../bankGate/bankGate.repository';
import { PaymentStatus } from './payment.enum';
import { PaymentRequest } from './payment.interface';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly bankGateRepository: BankGateRepository
  ) {}

  async create(
    payment: PaymentRequest
  ): Promise<{ status: string; paymentId: number | null }> {
    const { cardInfo, ...paymentInfo } = payment;
    const feeInfo = await this.bankGateRepository.chargeAmountByCard(
      cardInfo,
      payment.amount
    );
    if (feeInfo.status === PaymentStatus.Succeed) {
      const result = await this.paymentRepository.create({
        ...paymentInfo,
        externalTransactionId: feeInfo.externalTransactionId
      });
      return {
        status: feeInfo.status,
        paymentId: result.id
      };
    }
    return {
      status: feeInfo.status,
      paymentId: null
    };
  }
}
