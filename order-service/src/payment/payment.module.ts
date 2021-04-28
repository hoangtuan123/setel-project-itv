import { Module } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [PaymentRepository],
  exports: [PaymentRepository]
})
export class PaymentModule {}
