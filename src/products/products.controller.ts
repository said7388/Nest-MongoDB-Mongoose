import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateProductDto } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('img') image: string,
    @Body('location') location: string,
  ) {
    const generatedId = await this.productsService.insertProduct(
      title,
      image,
      location,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts(@Query() query) {
    const { name, age } = query;
    console.log(name, age);
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    const product = await this.productsService.getProductById(id);
    return product;
  }

  @Put('update')
  async updateProduct(@Body() body: UpdateProductDto) {
    const { id, title, image, location } = body;
    const result = await this.productsService.updateProduct(
      id,
      title,
      image,
      location,
    );
    return result;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const result = await this.productsService.deleteProduct(id);
    return result;
  }
}
