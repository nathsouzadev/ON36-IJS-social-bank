import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { managersProvider } from '../../config/providers/managers.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from '../../config/db/entities/people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  controllers: [ManagerController],
  providers: managersProvider,
})
export class ManagerModule {}
