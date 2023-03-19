import { Module } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { PrismaModule } from './../prisma/prisma.module';
import { EventsResolver } from './events.resolver';
import { EventsService } from './events.service';

@Module({
  imports: [PrismaModule],
  providers: [EventsResolver, EventsService, PrismaService],
})
export class EventsModule {}
