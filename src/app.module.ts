import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { MongodbModule } from './mongodb/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    MongodbModule,
    CommonModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
