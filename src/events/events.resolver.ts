import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => Event)
  createBooking(
    @Args('createEventInput') createEventInput: CreateEventInput,
  ) {
    return this.eventsService.create(createEventInput);
  }

  @Query(() => [Event], { name: 'bookings' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Query(() => Event, { name: 'booking' })
  findOne(@Args('email', { type: () => String }) email: string) {
    return this.eventsService.findOne(email);
  }

  @Mutation(() => Event)
  updateBooking(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ) {
    return this.eventsService.update(updateEventInput);
  }

  @Mutation(() => Event)
  removeBooking(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.remove(id);
  }
}
