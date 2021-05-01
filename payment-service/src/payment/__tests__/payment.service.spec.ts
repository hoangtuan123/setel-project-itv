import { Test, TestingModule } from '@nestjs/testing';
import { BankGateRepository } from '../../bankGate/bankGate.repository';
import { BankGateModule } from '../../bankGate/bankGate.module';
import { PaymentStatus } from '../payment.enum';
import { PaymentRepository } from '../payment.repository';
import { PaymentService } from '../payment.service';

jest.mock('../payment.repository');
jest.mock('../../bankGate/bankGate.repository.ts');

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let paymentRepository: PaymentRepository;
  let bankGateRepository: BankGateRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [BankGateModule],
      providers: [PaymentService, PaymentRepository]
    }).compile();

    paymentService = app.get<PaymentService>(PaymentService);
    paymentRepository = app.get<PaymentRepository>(PaymentRepository);
    bankGateRepository = app.get<BankGateRepository>(BankGateRepository);
  });

  describe('create', () => {
    it('Should return succeed', async () => {
      // given
      const body = {
        orderId: 1,
        cardInfo: '123',
        amount: 10
      };
      const paymentServiceResponse = {
        id: 1
      };
      (paymentRepository.create as jest.Mock).mockResolvedValueOnce(
        paymentServiceResponse
      );
      (bankGateRepository.chargeAmountByCard as jest.Mock).mockResolvedValueOnce(
        {
          status: PaymentStatus.Succeed,
          cardInfo: body.cardInfo,
          amount: body.amount,
          externalTransactionId: '__externalTransactionId'
        }
      );

      // when
      const result = await paymentService.create(body);

      // then
      expect(paymentRepository.create).toBeCalledWith({
        orderId: 1,
        amount: 10,
        externalTransactionId: '__externalTransactionId'
      });
      expect(result).toEqual({ paymentId: 1, status: 'Succeed' });
    });
    it('Should return fail', async () => {
      // given
      const body = {
        orderId: 1,
        cardInfo: '123',
        amount: 10
      };
      (paymentRepository.create as jest.Mock).mockResolvedValueOnce({});
      (bankGateRepository.chargeAmountByCard as jest.Mock).mockResolvedValueOnce(
        {
          status: PaymentStatus.Fail,
          cardInfo: body.cardInfo,
          amount: body.amount,
          externalTransactionId: null
        }
      );

      // when
      const result = await paymentService.create(body);

      // then
      expect(paymentRepository.create).not.toBeCalled();
      expect(result).toEqual({ paymentId: null, status: 'Fail' });
    });
  });
});
