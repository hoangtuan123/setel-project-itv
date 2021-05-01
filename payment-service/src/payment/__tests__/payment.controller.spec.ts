import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '../payment.controller';
import { PaymentStatus } from '../payment.enum';
import { PaymentService } from '../payment.service';

jest.mock('../payment.service');

describe('PaymentController', () => {
  let paymentService: PaymentService;
  let paymentController: PaymentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, PaymentController]
    }).compile();

    paymentController = app.get<PaymentController>(PaymentController);
    paymentService = app.get<PaymentService>(PaymentService);
  });

  describe('createPayment', () => {
    it('Should return succeed', async () => {
      // given
      const body = {
        orderId: 1,
        cardInfo: '123',
        amount: 10
      };
      const paymentServiceResponse = {
        status: PaymentStatus.Succeed,
        paymentId: 1
      };
      (paymentService.create as jest.Mock).mockResolvedValueOnce(
        paymentServiceResponse
      );

      // when
      const result = await paymentController.createPayment(body);

      // then
      expect(paymentService.create).toBeCalledWith(body);
      expect(result).toEqual(paymentServiceResponse);
    });
  });
});
