import { InputType, PartialType } from '@nestjs/graphql';

import { CreateDictionaryDTO } from './createDictionary.dto';

@InputType()
export class UpdateDictionaryDTO extends PartialType(CreateDictionaryDTO) {}
