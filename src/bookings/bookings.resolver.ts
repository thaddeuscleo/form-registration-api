import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { GraphQLError } from 'graphql';
import { Event } from 'src/events/entities/event.entity';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Mutation(() => Booking)
  createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
  ) {
    return this.bookingsService.create(createBookingInput);
  }

  @Query(() => [Booking], { name: 'bookings' })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Query(() => Booking, { name: 'booking' })
  async findOne(
    @Args('email', {
      type: () => String,
      nullable: true,
      defaultValue: undefined,
    })
    email: string,
    @Args('phone', {
      type: () => String,
      nullable: true,
      defaultValue: undefined,
    })
    phone: string,
    @Args('id', {
      type: () => String,
      nullable: true,
      defaultValue: undefined,
    })
    id: string,
  ) {
    const res = await this.bookingsService.findOne(email, phone, id);
    if (res === null) {
      throw new GraphQLError(
        'No booking found with the provided email / booking code',
      );
    }
    return res;
  }

  @Mutation(() => Booking)
  async updateBooking(
    @Args('updateBookingInput') updateBookingInput: UpdateBookingInput,
  ) {
    const res = await this.bookingsService.update(updateBookingInput)
    if(res == null) {
      throw new GraphQLError("Cannot attend more than booked!");
    }
    return res;
  }

  @Mutation(() => Booking)
  removeBooking(@Args('id', { type: () => String }) id: string) {
    return this.bookingsService.remove(id);
  }

  @ResolveField(() => Event)
  event(@Parent() booking: Booking) {
    return this.bookingsService.getEvent(booking.id);
  }
}
