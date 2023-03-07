import { Module } from '@nestjs/common';
import { PrismaModule } from '@services/prisma/prisma.module';
import { ProductController } from '@components/product/product.controller';
import { ProductService } from '@components/product/product.service';
import { SearchService } from '@services/search/search.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [PrismaModule, EventEmitterModule.forRoot({})],
  controllers: [ProductController],
  providers: [
    {
      provide: 'ProductServiceInterface',
      useClass: ProductService,
    },
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
  ],
})
export class ProductModule {}
