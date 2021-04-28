import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { Orders } from './order.model';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Orders]),
        HttpModule
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository]
})
export class OrderModule { }
