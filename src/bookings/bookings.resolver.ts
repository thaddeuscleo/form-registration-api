import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { GraphQLError } from 'graphql';

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
  ) {
    const res = await this.bookingsService.findOne(email, phone);
    if (res === null) {
      throw new GraphQLError(
        'No booking found with the provided email / booking code',
      );
    }
    return res;
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
