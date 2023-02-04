import { MongoServerError } from 'mongodb';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  ArgumentsHost,
  Catch,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

@Catch(MongoServerError)
export class MongoExceptionFilter extends BaseExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const i18n = I18nContext.current(host);

    // const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();

    const key = Object?.keys(exception?.keyValue)?.join() ?? '';

    const message = i18n.t(`mongo-db-exception.${String(exception.code)}`, {
      args: {
        field: key,
      },
    });

    switch (exception.code) {
      case 11000:
        throw new ConflictException(message);
      default:
        throw new InternalServerErrorException();
        break;
    }
  }
}
