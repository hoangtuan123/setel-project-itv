import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderCreation } from './order.interface';
import { Orders } from './order.model';
import { OrderService } from './order.service';
import { CreateOrderValdator } from './order.validator';

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'get all order' })
  @HttpCode(200)
  async getOrders(): Promise<Orders[]> {
    return await this.orderService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'create order' })
  @HttpCode(201)
  async createOrder(@Body() body: CreateOrderValdator): Promise<void> {
    await this.orderService.create(body);
  }

  @Get(":id/status")
  @ApiOperation({ summary: 'get order status by id' })
  @HttpCode(200)
  getOrderStatus(@Param('id') id: number): Promise<{status: string}> {
    return this.orderService.getStatus(id);
  }

  @Patch(":id/cancel")
  @ApiOperation({ summary: 'cancel order by id' })
  @HttpCode(204)
  async cancelOrder(@Param('id') id: number): Promise<void> {
    await this.orderService.cancell(id);
  }
}
