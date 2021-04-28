import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';

describe('AppController', () => {
  let orderController: OrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    orderController = app.get<OrderController>(OrderController);
  });

  describe('root', () => {
    it('should return "Hello World!"',async () => {
      const orderId = '_orderId';
      expect(await orderController.getOrderStatus(orderId)).toBe({status: 'created'});
    });
  });
});
