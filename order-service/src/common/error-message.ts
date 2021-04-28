import { HttpStatus } from '@nestjs/common';

export interface IErrorMessages {
    type: string;
    httpStatus: HttpStatus;
    errorMessage: string;
    userMessage: string;
  }

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
  'order:id:notfound': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Order not found',
    userMessage: 'Order not found'
  },
  'order:status:notCorrect': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Order is not allow to change status',
    userMessage: 'Order is not allow to change status'
  }
};
