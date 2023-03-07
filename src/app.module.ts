import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from '@components/product/product.module';
import { PrismaModule } from '@services/prisma/prisma.module';
import { SearchModule } from '@services/search/search.module';
import { ObserverModule } from '@observers/observer.module';
import { PrismaClient } from '@prisma/client';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppService } from './app.service';

@Module({
  imports: [
    EventEmitterModule.forRoot({}),
    ProductModule,
    PrismaModule,
    ProductModule,
    SearchModule,
    ObserverModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
