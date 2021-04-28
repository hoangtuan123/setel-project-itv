import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentInfo } from './payment.interface';
import { Payments } from './payment.model';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payments)
    private readonly paymentRepository: Repository<Payments>
  ) {}

  async create(payment: PaymentInfo): Promise<Payments> {
    return await this.paymentRepository.save(payment);
  }
}
