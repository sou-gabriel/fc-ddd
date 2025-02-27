import type { Customer } from "../../entity/customer";
import type { EventInterface } from "../@shared/event.interface";

export class ChangingCustomerAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
