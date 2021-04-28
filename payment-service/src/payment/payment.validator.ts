import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum } from 'class-validator';

export class CreatePayemt {
  @ApiProperty()
  @IsDefined()
  orderId: number;

  @IsDefined()
  @ApiProperty()
  amount: number;

  @IsDefined()
  @ApiProperty()
  cardInfo: string;
}
