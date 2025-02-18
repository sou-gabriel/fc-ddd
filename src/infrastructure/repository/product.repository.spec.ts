import { Sequelize } from "sequelize-typescript";
import { Product } from "../../domain/entity/product";
import { ProductModel } from "../db/sequelize/model/product.model";
import { ProductRepository } from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {
        force: true,
      },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");
    product.changePrice(100);

    await productRepository.update(product);

    const productModelUpdated = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productModelUpdated?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 100,
    });
  });

  it('should find a product', async () => {
    // Arrange
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    // Act
    const productModel = await ProductModel.findOne({
      where: {
        id: "1"
      }
    })
    const productFound = await productRepository.findById("1");

    // Assertion
    expect(productModel?.toJSON()).toStrictEqual({
      id: productFound?.id,
      name: productFound?.name,
      price: productFound?.price  
    });
  })

  it('should find all products', async () => {
    // Arrange
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    await productRepository.create(product1);
    
    const product2 = new Product("2", "Product 2", 100);
    await productRepository.create(product2);

    // Act
    const productsFound = await productRepository.findAll();
    const products = [product1, product2]

    // Assertion
    expect(products).toEqual(productsFound);
  })
});
