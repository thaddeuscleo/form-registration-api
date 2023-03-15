import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookingInput {
  @Field(() => String, { description: 'Person Name' })
  name: string;

  @Field(() => String, { description: 'Person email' })
  email: string;

  @Field(() => String, { description: 'Person Phone' })
  phone: string;

  @Field(() => Int, { description: 'Number of seat booked by the person' })
  bookedSeatCount: number;
}
