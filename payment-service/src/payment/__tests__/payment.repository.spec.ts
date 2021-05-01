import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Payments } from '../payment.model';
import { PaymentRepository } from '../payment.repository';

export class PaymentInstanceMocked {
  public save(): void {}
}

describe('OrderRepository', () => {
  let paymentRepository: PaymentRepository;
  let paymentInstance: Repository<Payments>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentRepository,
        {
          provide: getRepositoryToken(Payments),
          useClass: PaymentInstanceMocked
        }
      ]
    }).compile();

    paymentRepository = app.get<PaymentRepository>(PaymentRepository);
    paymentInstance = app.get(getRepositoryToken(Payments));
  });

  describe('create', () => {
    it('Should create an payment request succeed', async () => {
      // given
      const orderId = 1;
      const paymentInfo = {
        amount: 10,
        orderId,
        externalTransactionId: '__externalTransactionId'
      };
      const paymentInserted = {
        ...paymentInfo,
        id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date()
      };
      const paymentInstanceSaveSpy = jest
        .spyOn(paymentInstance, 'save')
        .mockResolvedValue(paymentInserted);
      // when
      const result = await paymentRepository.create(paymentInfo);
      // then
      expect(result).toEqual(paymentInserted);
      expect(paymentInstanceSaveSpy).toBeCalledWith(paymentInfo);
    });
  });
});
