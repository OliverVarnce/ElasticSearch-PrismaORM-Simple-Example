import { Module } from '@nestjs/common';
import { PrismaService } from '@services/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { PrismaEventDispatcher } from 'prisma-event-dispatcher';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot({})],
  providers: [PrismaService, PrismaClient, PrismaEventDispatcher],
  exports: [PrismaService],
})
export class PrismaModule {}
