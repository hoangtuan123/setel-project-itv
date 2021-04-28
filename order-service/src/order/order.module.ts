import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { Orders } from './order.model';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { PaymentModule } from "../payment/payment.module";
import { OrdersScheduler } from './order.scheduler';

@Module({
    imports: [
        TypeOrmModule.forFeature([Orders]),
        HttpModule,
        PaymentModule
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository, OrdersScheduler]
})
export class OrderModule { }
