import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventEmitter2 } from 'eventemitter2';
import {
  PrismaEventDispatcher,
  PrismaEventDispatcherOptions,
} from 'prisma-event-dispatcher';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private eventEmmiter: EventEmitter2) {
    super();

    const options: PrismaEventDispatcherOptions = {
      models: ['Product'],
    };

    this.$use(async (params: any, next: any) => {
      return await PrismaEventDispatcher.setup(
        options,
        this.eventEmmiter,
      ).dispatch(params, next);
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
