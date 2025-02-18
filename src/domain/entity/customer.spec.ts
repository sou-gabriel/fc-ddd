import { Address } from "./address";
import { Customer } from "./customer";

// Arrange
// Act
// Assert

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "John Doe")).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer("123", "")).toThrow("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John Doe");
    customer.changeName("Jane Doe");
    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street 1", 123, "0000000", "City");
    customer.address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "John Doe");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when activating customer without address", () => {
    const customer = new Customer("123", "John Doe");
    expect(() => customer.activate()).toThrow(
      "Address is mandatory to activate a customer"
    );
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
