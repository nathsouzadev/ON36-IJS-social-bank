import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { managersProvider } from '../../config/providers/managers.provider';

@Module({
  controllers: [ManagerController],
  providers: managersProvider,
})
export class ManagerModule {}
