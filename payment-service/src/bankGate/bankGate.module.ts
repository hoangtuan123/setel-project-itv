import { Module } from '@nestjs/common';
import { BankGateRepository } from './bankGate.repository';


@Module({
    imports: [
    ],
    controllers: [],
    providers: [BankGateRepository],
    exports: [BankGateRepository]
})
export class BankGateModule { }
