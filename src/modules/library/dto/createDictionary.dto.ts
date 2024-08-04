import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateDictionaryDTO {
  @Field()
  @Length(4, 128)
  name: string;
}
