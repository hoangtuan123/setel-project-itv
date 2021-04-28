import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OrderService } from './order.service';

@Injectable()
export class OrdersScheduler {
  private readonly logger = new Logger(OrdersScheduler.name);

  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Cron('10 * * * * *')
  async handleCron() {
    this.logger.debug('Called when the current second is 10');
    await this.orderService.processDelivered()
  }
}