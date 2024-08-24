import { Module } from '@nestjs/common';
import { peopleProviders } from '../../config/providers/people.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  providers: peopleProviders,
})
export class PeopleModule {}
