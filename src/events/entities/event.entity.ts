import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Booking } from './../../bookings/entities/booking.entity';

@ObjectType()
export class Event {
  @Field(() => ID, { description: 'Booking ID' })
  id: string;

  @Field(() => String, { description: 'Event Name' })
  name: string;

  @Field(() => [Booking], {
    description: 'Bookings in a event',
  })
  bookings: Booking[];

  @Field(() => Date, { description: 'Number of seat seated by the person' })
  createdAt: Date;
}
