import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  create({ name, eventDesc }: CreateEventInput) {
    return this.prisma.event.create({
      data: {
        name,
        eventDesc,
      },
    });
  }

  async findAll() {
    const res = await this.prisma.booking.groupBy({
      by: ['eventId'],
      _sum: {
        bookedSeatCount: true,
      },
    });

    const filteredId = res
      .filter((item) => {
        if (item._sum.bookedSeatCount > 1500) {
          return item.eventId;
        }
      })
      .map((item) => item.eventId);

    return this.prisma.event.findMany({
      where: {
        NOT: [...filteredId.map<{ id: string }>((id) => ({ id }))],
      },
    });
  }

  findAllWithoutLimit() {
    return this.prisma.event.findMany({});
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({
      where: {
        id,
      },
    });
  }

  async update({ id }: UpdateEventInput) {
    const res = await this.prisma.booking.findUnique({
      where: {
        id,
      },
    });
    return this.prisma.booking.update({
      data: {
        attendanceCount: res.attendanceCount + 1,
      },
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.booking.delete({
      where: {
        id,
      },
    });
  }

  getBooking(eventId: string) {
    return this.prisma.booking.findMany({
      where: {
        eventId,
      },
    });
  }
}
