import { CreateProductDto } from '@components/product/dto/create-product.dto';
import { Product } from '@prisma/client';

export interface ProductServiceInterface {
  findAll(): Promise<Product[] | null>;
  create(productDto: CreateProductDto): Promise<Product>;
  update(productId: any, updateProduct: any): Promise<Product>;
  remove(productId: any): Promise<any>;
  search(q: any): Promise<any>;
}
