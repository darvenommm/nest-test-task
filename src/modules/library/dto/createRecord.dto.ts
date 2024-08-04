import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, Length } from 'class-validator';

@InputType()
export class CreateRecordDTO {
  @Field()
  @Length(4, 128)
  name: string;

  @Field()
  @Length(4, 128)
  value: string;

  @Field()
  @Length(4, 32)
  color: string;

  @Field(() => ID)
  @IsUUID('4')
  dictionaryId: string;
}
