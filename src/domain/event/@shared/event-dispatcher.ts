import type { EventDispatcherInterface } from "./event-dispatcher.interface";
import type { EventHandlerInterface } from "./event-handler.interface";
import type { EventInterface } from "./event.interface";

// {
//   "ProductCreatedEvent": []
// }

export class EventDispatcher implements EventDispatcherInterface {
  private _eventHandlers: {
    [eventName: string]: EventHandlerInterface[];
  } = {};

  get eventHandlers() {
    return this._eventHandlers;
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    const eventHandlers = this._eventHandlers[eventName];

    if (eventHandlers) {
      eventHandlers.forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }

    this._eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    const registeredEventHandler = this._eventHandlers[eventName];

    if (registeredEventHandler) {
      const indexOfRegisteredEventHandler =
        registeredEventHandler.indexOf(eventHandler);

      if (indexOfRegisteredEventHandler > -1) {
        registeredEventHandler.splice(indexOfRegisteredEventHandler, 1);
      }
    }
  }

  unregisterAll(): void {
    this._eventHandlers = {};
  }
}
