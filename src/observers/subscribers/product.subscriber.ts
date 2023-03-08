import { ProductElasticIndex } from '@services/search/search-index/product.elastic.index';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ProductSubscriber {
  constructor(private readonly productEsIndex: ProductElasticIndex) {}

  @OnEvent('Product.after.create')
  async afterInsert(payload: any, response: any) {
    return this.productEsIndex.insertProductDocument(response);
  }

  @OnEvent('Product.after.update')
  public async afterUpdate(payload: any, response: any): Promise<any> {
    return this.productEsIndex.updateProductDocument(response);
  }

  @OnEvent('Product.after.delete')
  public async afterDelete(payload: any, response: any): Promise<any> {
    return this.productEsIndex.deleteProductDocument(response.id);
  }
}
