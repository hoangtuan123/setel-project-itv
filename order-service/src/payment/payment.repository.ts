import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PaymentStatus } from './payment.enum';
import { PaymentRequest } from './payment.interface';

@Injectable()
export class PaymentRepository {
  constructor() {}

  async request(paymentRequest: PaymentRequest): Promise<boolean> {
    const result = await axios.post(
      process.env.PAYMENT_HOST + '/payments',
      paymentRequest
    );
    const data = result.data;

    Logger.log(data, 'Log data result from payment service');

    if (data.status === PaymentStatus.Succeed) {
      return true;
    }
    return false;
  }
}
