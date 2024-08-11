import { Module } from '@nestjs/common';
import { BrasilService } from './brasil.service';

@Module({
  providers: [BrasilService],
})
export class BrasilModule {}
