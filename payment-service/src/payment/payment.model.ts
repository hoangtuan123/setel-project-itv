import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('payments_pkey', ['id'], { unique: true })
@Entity('payments', { schema: 'public' })
export class Payments {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'order_id' })
  orderId: number;

  @Column('integer', { name: 'amount' })
  amount: number;
  
  @Column('character varying', { name: 'externalTransactionId', length: 255 })
  externalTransactionId: string;

}
