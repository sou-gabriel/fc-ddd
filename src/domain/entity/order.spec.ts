import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrow("CustomerId is required");
  });

  it("should throw error when items amount is equal 0", () => {
    expect(() => {
      new Order("123", "1", []);
    }).toThrow("Items amount must be greater than 0");
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "Product", 10, "1", 2);
    const order = new Order("2", "1", [item]);

    const total = order.total();

    const item2 = new OrderItem("2", "Product", 20, "1", 2);
    const order2 = new Order("2", "1", [item, item2]);

    const total2 = order2.total();

    expect(total).toBe(20);
    expect(total2).toBe(60);
  });

  it("should throw error when item quantity is less or equal 0", () => {
    expect(() => {
      const item = new OrderItem("1", "Product", 10, "1", 0);
      new Order("2", "1", [item]);
    }).toThrow("Quantity must be greater than 0");
  });
});
