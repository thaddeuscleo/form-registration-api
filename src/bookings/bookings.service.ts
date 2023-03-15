import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  create({ name, email, phone, bookedSeatCount }: CreateBookingInput) {
    return this.prisma.booking.create({
      data: {
        name,
        email,
        phone,
        bookedSeatCount,
      },
    });
  }

  findAll() {
    return this.prisma.booking.findMany();
  }

  findOne(email: string) {
    return this.prisma.booking.findUnique({
      where: {
        email,
      },
    });
  }

  async update({ id }: UpdateBookingInput) {
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
}
