import { Module } from '@nestjs/common';
import { SearchService } from '@services/search/search.service';
import { ProductElasticIndex } from '@services/search/search-index/product.elastic.index';
import { ProductSubscriber } from '@observers/subscribers/product.subscriber';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
    ProductElasticIndex,
    ProductSubscriber,
    PrismaClient,
  ],
  controllers: [],
  exports: [],
})
export class ObserverModule {}
