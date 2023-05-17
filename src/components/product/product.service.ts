import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SearchServiceInterface } from '@services/search/interface/search.service.interface';
import { ProductSearchObject } from '@components/product/model/product.search.object';
import { PrismaService } from '@services/prisma/prisma.service';
import { Product } from '@prisma/client';
import { ProductServiceInterface } from '@components/product/interfaces/product.service.interface';

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
    private prisma: PrismaService,
  ) {}

  async findAll(): Promise<Product[] | null> {
    return this.prisma.product.findMany();
  }

  async create(createProductDto: Product): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async update(id: number, updateProductDto: Product): Promise<Product> {
    return this.prisma.product.update({
      where: { id: Number(id) },
      data: updateProductDto,
    });
  }

  async remove(id: number): Promise<Product | null> {
    return this.prisma.product
      .delete({
        where: { id },
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.NOT_FOUND);
      });
  }

  async search(q: any): Promise<any> {
    const data = ProductSearchObject.searchObject(q);
    return await this.searchService.searchIndex(data);
  }
}
