import { CreateEventInput } from './create-event.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @IsUUID('4')
  @Field(() => ID)
  id: string;

  @IsString()
  @Field(() => String)
  name: string;
}
