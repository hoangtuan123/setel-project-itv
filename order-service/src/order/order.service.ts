import { Injectable } from '@nestjs/common';
import { MessageCodeError } from '../common/message-code-error';
import { PaymentRepository } from '../payment/payment.repository';
import { OrderStatusEnum } from './order.enum';
import { OrderCreation } from './order.interface';
import { Orders } from './order.model';
import { OrderRepository } from './order.repository';
import * as lodash from 'lodash';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly paymentRepository: PaymentRepository
  ) {}

  async getStatus(id: number): Promise<{ status: string }> {
    const order = await this.orderRepository.getById(id);
    if (!order) {
      throw new MessageCodeError('order:id:notfound');
    }
    return {
      status: order.status
    };
  }

  async create(orderRequest: OrderCreation): Promise<void> {
    const order = await this.orderRepository.create({
      name: orderRequest.name,
      amount: orderRequest.amount
    });
    const paymentResult = await this.paymentRepository.request({
      cardInfo: orderRequest.cardInfo,
      amount: order.amount,
      orderId: order.id
    });
    if (paymentResult) {
      await this.orderRepository.updateStatusById(
        order.id,
        OrderStatusEnum.confirmed
      );
    } else {
      await this.orderRepository.updateStatusById(
        order.id,
        OrderStatusEnum.cancelled
      );
    }
  }

  async cancel(id: number): Promise<void> {
    const order = await this.orderRepository.getById(id);
    if (!order) {
      throw new MessageCodeError('order:id:notfound');
    }
    if (
      order.status === OrderStatusEnum.cancelled ||
      order.status === OrderStatusEnum.delivered
    ) {
      throw new MessageCodeError('order:status:notCorrect');
    }
    await this.orderRepository.updateStatusById(id, OrderStatusEnum.cancelled);
  }

  async getAll(): Promise<Orders[]> {
    return await this.orderRepository.getAll();
  }

  async processDelivered() {
    await this.orderRepository.updateDeliveredStatus();
  }
}
