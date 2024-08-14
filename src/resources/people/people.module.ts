import { Module } from '@nestjs/common';
import { peopleProviders } from '../../config/providers/people.provider';

@Module({
  providers: peopleProviders,
})
export class PeopleModule {}
