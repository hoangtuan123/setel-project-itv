import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatusEnum } from './order.enum';
import { OrderCreation } from './order.interface';
import { Orders } from './order.model';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>
  ) {}

  public getById(id: string): Promise<Orders | undefined> {
    return this.orderRepository.findOne(id);
  }
  async create(order: OrderCreation): Promise<void> {
    await this.orderRepository.save(order);
  }
  async cancell(id: string, status: OrderStatusEnum): Promise<void> {
    await this.orderRepository.update(id, { status });
  }

  async getAll(): Promise<Orders[]> {
    return await this.orderRepository.find();
  }
}
