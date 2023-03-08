import {
  Body,
  Controller,
  Delete,
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
import { UpdateProductDto } from '@components/product/dto/update-product.dto';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

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

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProduct);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<any> {
    return this.productService.remove(Number(id));
  }

  @Get('/search')
  @ApiImplicitQuery({
    name: 'q',
    required: true,
    type: String,
  })
  public async search(@Query() query: any): Promise<any> {
    return this.productService.search(query.q);
  }
}
