import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import type { EventInterface } from "../../@shared/event.interface";

export class EnviaConsoleLogHandler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    const customer = event.eventData;
    const address = customer.address.toString();

    console.log(
      `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${address}`
    );
  }
}
