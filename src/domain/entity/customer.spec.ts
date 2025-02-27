import { EventDispatcher } from "../event/@shared/event-dispatcher";
import { ChangingCustomerAddressEvent } from "../event/customer/changing-customer-address.event";
import { CustomerCreatedEvent } from "../event/customer/customer-created.event";
import { EnviaConsoleLog1Handler } from "../event/customer/handler/EnviaConsoleLog1Handler";
import { EnviaConsoleLog2Handler } from "../event/customer/handler/EnviaConsoleLog2Handler";
import { EnviaConsoleLogHandler } from "../event/customer/handler/EnviaConsoleLogHandler";
import { Address } from "./address";
import { Customer } from "./customer";

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

  it("should notify EnviaConsoleLog1Handler and EnviaConsoleLog2Handler when CustomerCreatedEvent is trigged", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();

    const spyEnviaConsoleLog1Handler = jest.spyOn(
      enviaConsoleLog1Handler,
      "handle"
    );
    const spyEnviaConsoleLog2Handler = jest.spyOn(
      enviaConsoleLog2Handler,
      "handle"
    );

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);

    const customer = new Customer("1", "Customer 1");

    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled();
    expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled();
  });

  it("should notify EnviaConsoleLogHandler when ChangingCustomerAddressEvent is triggered", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();
    const spyEnviaConsoleLogHandler = jest.spyOn(
      enviaConsoleLogHandler,
      "handle"
    );

    eventDispatcher.register(
      "ChangingCustomerAddressEvent",
      enviaConsoleLogHandler
    );

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "0000000", "City");
    customer.address = address;

    const newAddress = new Address("Street 2", 456, "1111111", "City 2");
    customer.changeAddress(newAddress);

    const changingCustomerAddressEvent = new ChangingCustomerAddressEvent(
      customer
    );

    eventDispatcher.notify(changingCustomerAddressEvent);

    expect(spyEnviaConsoleLogHandler).toHaveBeenCalledWith(
      changingCustomerAddressEvent
    );
  });
});
