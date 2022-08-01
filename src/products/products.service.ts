import { BadRequestException, Injectable } from '@nestjs/common';
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
    const products = await this.productModel.find({ versionKey: false }).exec();
    return products;
  }

  async getProductById(id: string) {
    const product = await this.productModel.findById(id).exec();
    return {
      id: product._id,
      title: product.title,
      image: product.img,
      location: product.location,
    };
  }

  async updateProduct(
    id: string,
    title: string,
    img: string,
    location: string,
  ) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('ID is invalid!');
    }
    const filter = { _id: id };
    const update = {
      title: title,
      img: img,
      location: location,
    };

    const result = await this.productModel.updateOne(filter, update, {
      rawResult: true,
    });

    if (result.matchedCount > 0) {
      return { message: 'Product updated successfully' };
    } else {
      throw new BadRequestException('Product updated failed!');
    }
  }

  async deleteProduct(id: string) {
    const result = await this.productModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!result) {
      throw new BadRequestException('Product not found!');
    }
    return { message: 'Product deleted successfully' };
  }
}
