import { Test, TestingModule } from '@nestjs/testing';
import { PaymentRepository } from '../../payment/payment.repository';
import { MessageCodeError } from '../../common/message-code-error';
import { PaymentModule } from '../../payment/payment.module';
import { OrderStatusEnum } from '../order.enum';
import { OrderRepository } from '../order.repository';
import { OrderService } from '../order.service';
import { PaymentStatus } from '../../payment/payment.enum';

jest.mock('../order.repository');
jest.mock('../../payment/payment.repository.ts');

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: OrderRepository;
  let paymentRepository: PaymentRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PaymentModule],
      providers: [OrderService, OrderRepository]
    }).compile();

    orderService = app.get<OrderService>(OrderService);
    orderRepository = app.get<OrderRepository>(OrderRepository);
    paymentRepository = app.get<PaymentRepository>(PaymentRepository);
  });

  describe('getStatus', () => {
    it('should return status', async () => {
      // given
      const orderId = 1;
      const statusResult = {
        id: orderId,
        status: OrderStatusEnum.confirmed
      };
      (orderRepository.getById as jest.Mock).mockResolvedValueOnce(
        statusResult
      );
      // when
      const result = await orderService.getStatus(orderId);
      // then
      expect(result).toEqual({ status: statusResult.status });
    });
    it('should throw error when id not found', async () => {
      // given
      const orderId = 1;
      (orderRepository.getById as jest.Mock).mockResolvedValueOnce(null);
      // when
      const result = await orderService.getStatus(orderId).catch(err => err);
      // then
      expect(result).toEqual(new MessageCodeError('order:id:notfound'));
    });
  });

  describe('create', () => {
    it('should create order succeed', async () => {
      // given
      const orderRequest = {
        amount: 1,
        cardInfo: 'string',
        name: 'test'
      };
      const orderIdInserted = 1;
      (orderRepository.create as jest.Mock).mockResolvedValueOnce({
        ...orderRequest,
        id: orderIdInserted
      });
      (paymentRepository.request as jest.Mock).mockResolvedValueOnce(true);
      (orderRepository.updateStatusById as jest.Mock).mockResolvedValueOnce({});
      // when
      await orderService.create(orderRequest);
      // then
      expect(orderRepository.create).toBeCalledWith({
        name: orderRequest.name,
        amount: orderRequest.amount
      });
      expect(paymentRepository.request).toBeCalledWith({
        amount: orderRequest.amount,
        cardInfo: orderRequest.cardInfo,
        orderId: orderIdInserted
      });
      expect(orderRepository.updateStatusById).toBeCalledWith(
        orderIdInserted,
        OrderStatusEnum.confirmed
      );
    });
    it('should update status of order to fail when payment not succeed', async () => {
      // given
      const orderRequest = {
        amount: 1,
        cardInfo: 'string',
        name: 'test'
      };
      const orderIdInserted = 1;
      (orderRepository.create as jest.Mock).mockResolvedValueOnce({
        ...orderRequest,
        id: orderIdInserted
      });
      (paymentRepository.request as jest.Mock).mockResolvedValueOnce(false);
      (orderRepository.updateStatusById as jest.Mock).mockResolvedValueOnce({});
      // when
      await orderService.create(orderRequest);
      // then
      expect(orderRepository.create).toBeCalledWith({
        name: orderRequest.name,
        amount: orderRequest.amount
      });
      expect(paymentRepository.request).toBeCalledWith({
        amount: orderRequest.amount,
        cardInfo: orderRequest.cardInfo,
        orderId: orderIdInserted
      });
      expect(orderRepository.updateStatusById).toBeCalledWith(
        orderIdInserted,
        OrderStatusEnum.cancelled
      );
    });
  });

  describe('cancel', () => {
    it('should cancel an order succeed', async () => {
      // given
      const orderId = 1;
      const order = {
        id: orderId,
        status: OrderStatusEnum.confirmed
      };
      (orderRepository.getById as jest.Mock).mockResolvedValueOnce(order);
      // when
      await orderService.cancel(orderId);
      // then
      expect(orderRepository.updateStatusById).toBeCalledWith(
        orderId,
        OrderStatusEnum.cancelled
      );
    });
    it('Should throw order:id:notfound', async () => {
      // given
      const orderId = 1;
      const order = {
        id: orderId,
        status: OrderStatusEnum.confirmed
      };
      (orderRepository.getById as jest.Mock).mockResolvedValueOnce(null);
      // when
      const result = await orderService.cancel(orderId).catch(err => err);
      // then
      expect(result).toEqual(new MessageCodeError('order:id:notfound'));
    });
    it('should throw error when id not found', async () => {
      // given
      const orderId = 1;
      const order = {
        id: orderId,
        status: OrderStatusEnum.delivered
      };
      (orderRepository.getById as jest.Mock).mockResolvedValueOnce(order);
      // when
      const result = await orderService.cancel(orderId).catch(err => err);
      // then
      expect(result).toEqual(new MessageCodeError('order:status:notCorrect'));
    });
  });

  describe('getAll', () => {
    it('should get all orders', async () => {
      // given
      const orderId = 1;
      const orders = [
        {
          id: orderId,
          status: OrderStatusEnum.confirmed
        }
      ];
      (orderRepository.getAll as jest.Mock).mockResolvedValueOnce(orders);
      // when
      const result = await orderService.getAll();
      // then
      expect(result).toEqual(orders);
    });
  });
  describe('processDelivered', () => {
    it('should process for delivery order when it correct', async () => {
      // given
      (orderRepository.updateDeliveredStatus as jest.Mock).mockResolvedValueOnce(
        {}
      );
      // when
      await orderService.processDelivered();
      // then
      expect(orderRepository.updateDeliveredStatus).toBeCalledTimes(1);
    });
  });
});
