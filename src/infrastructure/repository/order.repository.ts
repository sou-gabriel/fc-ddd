import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import { OrderRepositoryInterface } from "../../domain/repository/order-repository.interface";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async update(entity: Order): Promise<void> {
    const t = await OrderModel.sequelize!.transaction();
    try {
      await OrderModel.update(
        {
          customer_id: entity.id,
          total: entity.total(),
        },
        {
          transaction: t,
          where: {
            id: entity.id,
          },
        }
      );

      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t,
      });

      const orderItems = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));

      await OrderItemModel.bulkCreate(orderItems, { transaction: t });
      await t.commit();
    } catch {
      t.rollback();
    }
  }

  async findById(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: {
        id,
      },
      include: [{ model: OrderItemModel, as: "items" }],
    });

    return new Order(
      orderModel!.id,
      orderModel!.customer_id,
      orderModel!.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )
    );
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({
      include: [{ model: OrderItemModel, as: "items" }],
    });
    return ordersModel.map(
      (orderModel) =>
        new Order(
          orderModel.id,
          orderModel.customer_id,
          orderModel.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
              )
          )
        )
    );
  }
}
