import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { OrderStatusEnum } from './order.enum';
import { OrderCreation } from './order.interface';
import { Orders } from './order.model';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>
  ) {}

  public getById(id: number): Promise<Orders | undefined> {
    return this.orderRepository.findOne(id);
  }
  async create(order: OrderCreation): Promise<Orders> {
    return await this.orderRepository.save(order);
  }
  async updateStatusById(id: number, status: OrderStatusEnum): Promise<void> {
    await this.orderRepository.update(id, { status });
  }

  async getAll(): Promise<Orders[]> {
    return await this.orderRepository.find();
  }

  async updateDeliveredStatus(): Promise<void> {
    await this.orderRepository.update(
      {
        status: OrderStatusEnum.confirmed,
        updatedAt: LessThan(new Date((new Date().getTime() - +process.env.XAMOUNT)).toUTCString())
      },
      {
        status: OrderStatusEnum.delivered
      }
    );
  }
}
