import { CreateBookingInput } from './create-booking.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateBookingInput extends PartialType(CreateBookingInput) {
  @IsUUID('4')
  @Field(() => ID)
  id: string;
}
