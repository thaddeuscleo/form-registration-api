import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Booking {
  @Field(() => ID, { description: 'Booking ID' })
  id: string;

  @Field(() => String, { description: 'Person Name' })
  name: string;

  @Field(() => String, { description: 'Person email' })
  email: string;

  @Field(() => String, { description: 'Person Phone' })
  phone: string;

  @Field(() => Int, { description: 'Number of seat booked by the person' })
  bookedSeatCount: number;

  @Field(() => Int, { description: 'Number of seat seated by the person' })
  attendanceCount: number;

  @Field(() => Date, { description: 'Number of seat seated by the person' })
  createdAt: Date
}
