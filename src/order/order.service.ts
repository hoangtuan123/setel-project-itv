import { Injectable } from '@nestjs/common';
import { MessageCodeError } from 'src/common/message-code-error';
import { OrderStatusEnum } from './order.enum';
import { OrderCreation } from './order.interface';
import { Orders } from './order.model';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getStatus(id: string): Promise<{ status: string }> {
    const order = await this.orderRepository.getById(id);
    if (!order) {
      throw new MessageCodeError('order:id:notfound');
    }
    return {
      status: order.status
    };
  }
  async create(order: OrderCreation): Promise<void> {
    await this.orderRepository.create(order);
  }
  async cancell(id: string): Promise<void> {
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
    await this.orderRepository.cancell(id, OrderStatusEnum.cancelled);
  }
  async getAll(): Promise<Orders[]> {
    return await this.orderRepository.getAll();
  }
}
