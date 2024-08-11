import { PartialType } from '@nestjs/swagger';
import { CreateBrasilDto } from './create-brasil.dto';

export class UpdateBrasilDto extends PartialType(CreateBrasilDto) {}
