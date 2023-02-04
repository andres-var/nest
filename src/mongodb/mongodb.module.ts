import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.DB_HOST}:${process.env.DB_PORT}`, {
      dbName: process.env.DB_NAME,
      auth: {
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
      },
    }),
  ],
})
export class MongodbModule {}
