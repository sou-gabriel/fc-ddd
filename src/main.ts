import { Address } from "./domain/entity/address";
import { Customer } from "./domain/entity/customer";
import { Order } from "./domain/entity/order";
import { OrderItem } from "./domain/entity/order-item";

let customer = new Customer("123", "Gabriel Ramos");
const address = new Address("Rua 1", 123, "28390000", "Porciúncula");

customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "1", 2);
const item2 = new OrderItem("2", "Item 2", 15, "1", 2);

const order = new Order("1", customer.id, [item1, item2]);