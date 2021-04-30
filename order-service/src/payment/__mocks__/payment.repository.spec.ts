const axiosPostMocked = jest.fn();
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { PaymentRepository } from '../payment.repository';

jest.mock('axios');

process.env.PAYMENT_HOST = 'http/localhost:111/';

describe('PaymentRepository', () => {
  let paymentRepository: PaymentRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PaymentRepository]
    }).compile();

    paymentRepository = app.get<PaymentRepository>(PaymentRepository);
  });

  describe('request', () => {
    it('Should run payment request succeed', async () => {
      // given
      const orderId = 1;
      const paymentRequest = {
        orderId,
        amount: 10,
        cardInfo: '123'
      };
      (axios.post as jest.Mock).mockResolvedValueOnce({
        data: { status: 'Succeed' }
      });

      // when
      const result = await paymentRepository.request(paymentRequest);
      // then
      expect(result).toEqual(true);
      expect(axios.post).toBeCalledWith('http/localhost:111//payments', {
        amount: 10,
        cardInfo: '123',
        orderId: 1
      });
    });
    it('Should run payment request fail', async () => {
      // given
      const orderId = 1;
      const paymentRequest = {
        orderId,
        amount: 10,
        cardInfo: '123'
      };
      (axios.post as jest.Mock).mockResolvedValueOnce({
        data: { status: 'Fail' }
      });

      // when
      const result = await paymentRepository.request(paymentRequest);
      // then
      expect(result).toEqual(false);
      expect(axios.post).toBeCalledWith('http/localhost:111//payments', {
        amount: 10,
        cardInfo: '123',
        orderId: 1
      });
    });
  });
});
