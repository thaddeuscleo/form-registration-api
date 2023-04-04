import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  create({ name, email, phone, bookedSeatCount, eventId }: CreateBookingInput) {
    return this.prisma.booking.create({
      data: {
        name,
        email,
        phone,
        bookedSeatCount,
        eventId,
      },
    });
  }

  findAll() {
    return this.prisma.booking.findMany();
  }

  async findOne(email: string, phone: string, id: string) {
    if (email != undefined) {
      return this.prisma.booking.findUnique({
        where: {
          email,
        },
      });
    } else if (phone != undefined) {
      return this.prisma.booking.findUnique({
        where: {
          phone,
        },
      });
    } else {
      return this.prisma.booking.findUnique({
        where: {
          id,
        },
      });
    }
  }

  async update({ id }: UpdateBookingInput) {
    const res = await this.prisma.booking.findUnique({
      where: {
        id,
      },
    });

    if (res.attendanceCount >= res.bookedSeatCount) {
      return null;
    }

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

  getEvent(bookingId: string) {
    return this.prisma.event.findFirst({
      where: {
        booking: {
          some: {
            id: bookingId,
          },
        },
      },
    });
  }
}
