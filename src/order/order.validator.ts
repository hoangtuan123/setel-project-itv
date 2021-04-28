import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum } from 'class-validator';
import { OrderStatusEnum } from './order.enum';

export class CreateOrderValdator {
  @ApiProperty()
  @IsDefined()
  name: string;

  @IsDefined()
  @ApiProperty()
  amount: number;
}
