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
    private readonly orderInstance: Repository<Orders>
  ) {}

  public getById(id: number): Promise<Orders | undefined> {
    return this.orderInstance.findOne(id);
  }
  async create(order: Omit<OrderCreation, 'cardInfo'>): Promise<Orders> {
    return await this.orderInstance.save(order);
  }
  async updateStatusById(id: number, status: OrderStatusEnum): Promise<void> {
    await this.orderInstance.update(id, { status });
  }

  async getAll(): Promise<Orders[]> {
    return await this.orderInstance.find();
  }

  async updateDeliveredStatus(): Promise<void> {
    await this.orderInstance.update(
      {
        status: OrderStatusEnum.confirmed,
        updatedAt: LessThan(
          new Date(new Date().getTime() - +process.env.XAMOUNT).toUTCString()
        )
      },
      {
        status: OrderStatusEnum.delivered
      }
    );
  }
}
