import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePayemt } from './payment.validator';

@Controller('payments')
@ApiTags('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'create payment' })
  @HttpCode(201)
  async createPayment(@Body() body: CreatePayemt): Promise<void> {
    await this.paymentService.create(body);
  }

}
