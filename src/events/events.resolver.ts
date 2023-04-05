import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Booking } from './../bookings/entities/booking.entity';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  @Query(() => [Event], { name: 'events' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Query(() => [Event], { name: 'allEvents' })
  findAllWithoutLimit() {
    return this.eventsService.findAllWithoutLimit();
  }

  @Query(() => Event, { name: 'event' })
  findOne(@Args('email', { type: () => String }) email: string) {
    return this.eventsService.findOne(email);
  }

  @Mutation(() => Event)
  updateEvent(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventsService.update(updateEventInput);
  }

  @Mutation(() => Event)
  removeEvent(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.remove(id);
  }

  @ResolveField(() => [Booking])
  bookings(@Parent() event: Event) {
    return this.eventsService.getBooking(event.id);
  }
}
