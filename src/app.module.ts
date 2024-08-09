import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { router } from './config/router';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/interface/config.schema';
import { HealthModule } from './health/health.module';
import config from './config/config';
import { LoggerMiddleware } from './config/logger-middleware';
import { PeopleModule } from './resources/people/people.module';
import { CustomerModule } from './resources/customer/customer.module';
import { AccountsModule } from './resources/accounts/accounts.module';
import { ManagerModule } from './resources/manager/manager.module';
import { CardsModule } from './resources/cards/cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [config],
    }),
    RouterModule.register(router),
    HealthModule,
    PeopleModule,
    CustomerModule,
    AccountsModule,
    ManagerModule,
    CardsModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
