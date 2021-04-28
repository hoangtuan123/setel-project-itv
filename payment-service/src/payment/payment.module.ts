import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from './payment.model';
import {PaymentController} from './payment.controller'
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';


@Module({
    imports: [
        TypeOrmModule.forFeature([Payments]),
        HttpModule
    ],
    controllers: [PaymentController],
    providers: [PaymentService, PaymentRepository]
})
export class PaymentModule { }
