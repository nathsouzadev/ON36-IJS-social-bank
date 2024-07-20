import { PartialType } from '@nestjs/swagger';
import { AccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(AccountDto) {
    accountId: string;
}
