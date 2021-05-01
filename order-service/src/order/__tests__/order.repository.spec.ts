import { Test, TestingModule } from '@nestjs/testing';
import { PaymentModule } from '../../payment/payment.module';
import { OrderStatusEnum } from '../order.enum';
import { OrderRepository } from '../order.repository';
import { Repository } from 'typeorm';
import { Orders } from '../order.model';
import { getRepositoryToken } from '@nestjs/typeorm';

export class OrderInstanceMocked {
  public create(): void {}
  public async save(): Promise<void> {}
  public async remove(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async update(): Promise<void> {}
  public async find(): Promise<void> {}
}

describe('OrderRepository', () => {
  let orderRepository: OrderRepository;
  let orderInstance: Repository<Orders>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PaymentModule],
      providers: [
        OrderRepository,
        {
          provide: getRepositoryToken(Orders),
          useClass: OrderInstanceMocked
        }
      ]
    }).compile();

    orderRepository = app.get<OrderRepository>(OrderRepository);
    orderInstance = app.get(getRepositoryToken(Orders));
  });

  describe('getById', () => {
    it('should return an order when orderId is correct', async () => {
      // given
      const orderId = 1;
      const order = {
        id: orderId,
        status: OrderStatusEnum.confirmed,
        name: 'test',
        amount: 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date()
      };
      const orderInstanceFindOneSpy = jest
        .spyOn(orderInstance, 'findOne')
        .mockResolvedValue(order);
      // when
      const result = await orderRepository.getById(orderId);
      // then
      expect(result).toEqual(order);
      expect(orderInstanceFindOneSpy).toBeCalledWith(orderId);
    });
  });

  describe('create', () => {
    it('should create order when data is correct', async () => {
      // given
      const orderId = 1;
      const order = {
        status: OrderStatusEnum.confirmed,
        name: 'test',
        amount: 10
      };
      const orderCreated = {
        ...order,
        createdAt: new Date().toISOString(),
        updatedAt: new Date(),
        id: orderId
      };
      const orderInstanceFindOneSpy = jest
        .spyOn(orderInstance, 'save')
        .mockResolvedValue(orderCreated);
      // when
      const result = await orderRepository.create(order);
      // then
      expect(result).toEqual(orderCreated);
      expect(orderInstanceFindOneSpy).toBeCalledWith(order);
    });
  });

  describe('updateStatusById', () => {
    it('should update status an order by id', async () => {
      // given
      const orderId = 1;

      const orderInstanceUpdateSpy = jest
        .spyOn(orderInstance, 'update')
        .mockResolvedValue({} as any);

      // when
      await orderRepository.updateStatusById(
        orderId,
        OrderStatusEnum.confirmed
      );
      // then
      expect(orderInstanceUpdateSpy).toBeCalledWith(orderId, {
        status: OrderStatusEnum.confirmed
      });
    });
  });

  describe('getAll', () => {
    it('should return an order when orderId is correct', async () => {
      // given
      const orderId = 1;
      const order = {
        id: orderId,
        status: OrderStatusEnum.confirmed,
        name: 'test',
        amount: 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date()
      };
      const orderInstanceFindOneSpy = jest
        .spyOn(orderInstance, 'find')
        .mockResolvedValue([order]);
      // when
      const result = await orderRepository.getAll();
      // then
      expect(result).toEqual([order]);
      expect(orderInstanceFindOneSpy).toBeCalledWith();
    });
  });

  describe('getAll', () => {
    it('should return all order', async () => {
      // given
      const orderId = 1;
      const order = {
        id: orderId,
        status: OrderStatusEnum.confirmed,
        name: 'test',
        amount: 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date()
      };
      const orderInstanceFindOneSpy = jest
        .spyOn(orderInstance, 'find')
        .mockResolvedValue([order]);
      // when
      const result = await orderRepository.getAll();
      // then
      expect(result).toEqual([order]);
      expect(orderInstanceFindOneSpy).toBeCalledWith();
    });
  });

  describe('updateDeliveredStatus', () => {
    it('should update status of confirmed item when matching time', async () => {
      // given
      const orderId = 1;

      const orderInstanceUpdateSpy = jest
        .spyOn(orderInstance, 'update')
        .mockResolvedValue({} as any);

      // when
      await orderRepository.updateDeliveredStatus();
      // then
      expect(orderInstanceUpdateSpy).toBeCalledWith(
        expect.objectContaining({ status: OrderStatusEnum.confirmed }),
        {
          status: OrderStatusEnum.delivered
        }
      );
    });
  });
});
