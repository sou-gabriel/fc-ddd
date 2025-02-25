import type { EventHandlerInterface } from "../../@shared/event-handler.interface";
import type { EventInterface } from "../../@shared/event.interface";

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: EventInterface): void {
    console.log(`Sending email to ${event.eventData.email}`);
  }
}
