import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';

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
  findOne(@Args('email', { type: () => String }) email: string) {
    return this.bookingsService.findOne(email);
  }

  @Mutation(() => Booking)
  updateBooking(
    @Args('updateBookingInput') updateBookingInput: UpdateBookingInput,
  ) {
    return this.bookingsService.update(updateBookingInput);
  }

  @Mutation(() => Booking)
  removeBooking(@Args('id', { type: () => String }) id: string) {
    return this.bookingsService.remove(id);
  }
}
