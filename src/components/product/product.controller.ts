import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from '@components/product/dto/create-product.dto';
import { Product } from '@prisma/client';
import { ProductServiceInterface } from '@components/product/interfaces/product.service.interface';

@Controller('products')
export class ProductController {
  constructor(
    @Inject('ProductServiceInterface')
    private readonly productService: ProductServiceInterface,
  ) {}

  @Post()
  public async create(@Body() productDto: CreateProductDto): Promise<Product> {
    return this.productService.create(productDto);
  }

  @Get()
  public async getAll(): Promise<Product[] | null> {
    return this.productService.findAll();
  }

  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateProduct: any,
  ): Promise<Product> {
    return this.productService.update(id, updateProduct);
  }

  @Get('/search')
  public async search(@Query() query: any): Promise<any> {
    return this.productService.search(query.q);
  }
}
