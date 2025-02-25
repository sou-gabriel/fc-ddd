import { Sequelize } from "sequelize-typescript";
import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import { Product } from "../../domain/entity/product";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";
import { ProductModel } from "../db/sequelize/model/product.model";
import { CustomerRepository } from "./customer.repository";
import { OrderRepository } from "./order.repository";
import { ProductRepository } from "./product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      CustomerModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street 1", 1, "12345", "City 1");
    customer.address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFromDb = await orderRepository.findById(order.id);

    expect(orderFromDb).toStrictEqual(order);
  });

  it("should upate an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street 1", 1, "12345", "City 1");
    customer.address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 150);

    await Promise.all([
      productRepository.create(product1),
      productRepository.create(product2),
    ]);

    const orderRepository = new OrderRepository();
    const orderItem1 = new OrderItem("1", product1.name, 100, product1.id, 1);
    const order = new Order("1", customer.id, [orderItem1]);
    await orderRepository.create(order);

    const foundOrder = await orderRepository.findById(order.id);
    expect(foundOrder?.items.length).toBe(1);

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      1
    );

    order.addItem(orderItem2);
    await orderRepository.update(order);

    const orderFromDb = await orderRepository.findById(order.id);
    expect(orderFromDb?.items.length).toBe(2);
  });

  it("should find an order by id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street 1", 1, "12345", "City 1");
    customer.address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 150);
    await Promise.all([
      productRepository.create(product1),
      productRepository.create(product2),
    ]);

    const orderItem = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      1
    );

    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderFromDb = await orderRepository.findById(order.id);
    expect(orderFromDb).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street 1", 1, "12345", "City 1");
    customer.address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 100);
    await Promise.all([
      productRepository.create(product1),
      productRepository.create(product2),
    ]);

    const orderRepository = new OrderRepository();
    const orderItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      1
    );
    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      2
    );
    const orderItem3 = new OrderItem(
      "3",
      product1.name,
      product1.price,
      product1.id,
      1
    );
    const order1 = new Order("1", customer.id, [orderItem1]);
    const order2 = new Order("2", customer.id, [orderItem2, orderItem3]);
    await Promise.all([
      orderRepository.create(order1),
      orderRepository.create(order2),
    ]);

    const ordersFromDb = await orderRepository.findAll();
    expect(ordersFromDb).toStrictEqual([order1, order2]);
  });
});
