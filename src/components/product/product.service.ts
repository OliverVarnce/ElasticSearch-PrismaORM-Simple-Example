import { Inject, Injectable } from '@nestjs/common';
import { SearchServiceInterface } from '@services/search/interface/search.service.interface';
import { ProductSearchObject } from '@components/product/model/product.search.object';
import { PrismaService } from '@services/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
    private prisma: PrismaService,
  ) {}

  async create(createProductDto: Product): Promise<Product> {
    return await this.prisma.product.create({
      data: createProductDto,
    });
  }

  async update(id: number, updateProductDto: Product): Promise<Product> {
    return await this.prisma.product.update({
      where: { id: Number(id) },
      data: updateProductDto,
    });
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id: Number(id) },
    });
  }

  public async search(q: any): Promise<any> {
    const data = ProductSearchObject.searchObject(q);
    console.log('search object: ', JSON.stringify(data));
    return await this.searchService.searchIndex(data);
  }
}
