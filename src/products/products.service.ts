import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, img: string, location: string) {
    const newProduct = new this.productModel({
      title,
      img,
      location,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      img: product.img,
      location: product.location,
    }));
  }
}
