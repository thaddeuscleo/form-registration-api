import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class CreateEventInput {
  @IsString({
    message: 'Event Name must be in string format',
  })
  @Length(4, 20, {
    message:
      'Name must be atleast 4 characters and not more than 20 characters',
  })
  @Field(() => String, { description: 'Person Name' })
  name: string;
}
