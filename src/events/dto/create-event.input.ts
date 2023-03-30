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
  @Length(4, 25, {
    message:
      'Name must be atleast 4 characters and not more than 20 characters',
  })
  @Field(() => String, { description: 'Event Name' })
  name: string;

  @IsString()
  @Field(() => String, { description: 'Event Date' })
  eventDesc: string
}
