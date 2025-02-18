import { Product } from "../../domain/entity/product";
import type { ProductRepositoryInterface } from "../../domain/repository/product-repository.interface";
import { ProductModel } from "../db/sequelize/model/product.model";

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async findAll(): Promise<Product[]> {
    const productModel = await ProductModel.findAll();
    return productModel.map((product) => {
      return new Product(product.id, product.name, product.price);
    });
  }

  async findById(id: string): Promise<Product | null> {
    const productModel = await ProductModel.findOne({
      where: {
        id,
      },
    });

    if (productModel) {
      return new Product(
        productModel.id,
        productModel.name,
        productModel.price
      );
    }

    return null;
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
}
