import { CreateBookingInput } from './create-booking.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateBookingInput extends PartialType(CreateBookingInput) {
  @Field(() => ID)
  id: string;
}
