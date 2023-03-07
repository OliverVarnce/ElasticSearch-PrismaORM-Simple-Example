import { CreateProductDto } from '@components/product/dto/create-product.dto';
import { Product } from '@prisma/client';

export interface ProductServiceInterface {
  create(productDto: CreateProductDto): Promise<Product>;

  findAll(): Promise<Product[] | null>;

  update(productId: any, updateProduct: any): Promise<Product>;

  search(q: any): Promise<any>;
}
