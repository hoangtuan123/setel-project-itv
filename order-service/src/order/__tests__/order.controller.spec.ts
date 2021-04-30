import { Test, TestingModule } from '@nestjs/testing';
import { PaymentModule } from '../../payment/payment.module';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';

jest.mock('../order.service');

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PaymentModule],
      controllers: [OrderController],
      providers: [OrderService]
    }).compile();

    orderController = app.get<OrderController>(OrderController);
    orderService = app.get<OrderService>(OrderService);
  });

  describe('getOrderStatus', () => {
    it('should return status', async () => {
      // given
      const orderId = 1;
      (orderService.getStatus as jest.Mock).mockResolvedValueOnce({
        status: 'created'
      });
      // when & then
      expect(await orderController.getOrderStatus(orderId)).toEqual({
        status: 'created'
      });
    });
  });

  describe('getOrders', () => {
    it('should return list orders', async () => {
      // given
      const orders = [{ id: 1 }];
      // when & then
      (orderService.getAll as jest.Mock).mockResolvedValueOnce(orders);
      expect(await orderController.getOrders()).toEqual(orders);
    });
  });

  describe('createOrder', () => {
    it('should return list orders', async () => {
      // given
      const body = {
        amount: 1,
        cardInfo: 'string',
        name: 'test'
      };
      (orderService.create as jest.Mock).mockResolvedValueOnce({});

      // when
      await orderController.createOrder(body);

      // then
      expect(orderService.create).toBeCalledWith(body);
    });
  });

  describe('cancelOrder', () => {
    it('should cancel an order succeed', async () => {
      // given
      const orderId = 1;
      (orderService.create as jest.Mock).mockResolvedValueOnce({});

      // when
      await orderController.cancelOrder(orderId);

      // then
      expect(orderService.cancel).toBeCalledWith(orderId);
    });
  });
});
