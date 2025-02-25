import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(
      eventDispatcher.eventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.eventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.eventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.eventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    eventDispatcher.notify(productCreatedEvent);

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle deve ser chamado
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
