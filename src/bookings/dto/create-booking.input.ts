import { InputType, Int, Field, ID } from '@nestjs/graphql';
import {
  IsEmail,
  IsInt,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

@InputType()
export class CreateBookingInput {
  @IsString({
    message: 'Name must be in string format',
  })
  @Length(4, 20, {
    message:
      'Name must be atleast 4 characters and not more than 20 characters',
  })
  @Field(() => String, { description: 'Person Name' })
  name: string;

  @IsString({
    message: 'Email must be in string format',
  })
  @IsEmail(
    {},
    {
      message: 'Please input a valid email format',
    },
  )
  @Field(() => String, { description: 'Person email' })
  email: string;

  @IsPhoneNumber('ID')
  @Field(() => String, { description: 'Person Phone' })
  phone: string;

  @IsInt({
    message: 'Please input the seat in integer format',
  })
  @Min(1, {
    message: 'The minimum number of seat is 1',
  })
  @Max(6, {
    message: 'The minimum number of seat is 6',
  })
  @Field(() => Int, { description: 'Number of seat booked by the person' })
  bookedSeatCount: number;

  @Field(() => ID)
  eventId: string;
}
