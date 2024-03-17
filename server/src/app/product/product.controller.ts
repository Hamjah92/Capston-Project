import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductDTO } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("/create")
  @HttpCode(201)
  createProduct(@Body() createProductDto: AddProductDTO) {
    return this.productService.create(createProductDto);
  }

  @Get('all')
  getAllProducts() {
    return this.productService.getAll();
  }

  @Get(':productId')
  getProductById(@Param('productId') productId: string) {
    return this.productService.getById(productId);
  }

  @Put('edit/:productId')
  editProduct(@Param('productId') productId: string, @Body() productDto: AddProductDTO) {
    return this.productService.editProduct(productId, productDto);
  }

  @Delete('delete/:productId')
  deleteProductById(@Param('productId') productId: string) {
    return this.productService.deleteProductById(productId);
  }

  @Delete('deleteMany')
  deleteManyProducts(@Body('productIds') productIds: string[]) {
    return this.productService.deleteManyProducts(productIds);
  }
}
