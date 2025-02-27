import type { EventHandlerInterface } from "../../@shared/event-handler.interface";

export class EnviaConsoleLog2Handler implements EventHandlerInterface {
  handle(): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
