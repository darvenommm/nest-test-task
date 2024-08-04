import { InputType, PartialType } from '@nestjs/graphql';

import { CreateRecordDTO } from './createRecord.dto';

@InputType()
export class UpdateRecordDTO extends PartialType(CreateRecordDTO) {}
