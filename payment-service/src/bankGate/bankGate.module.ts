import { Module } from '@nestjs/common';
import { BankGateRepository } from './bankGate.repository';


@Module({
    imports: [
    ],
    controllers: [],
    providers: [BankGateRepository]
})
export class OrderModule { }
