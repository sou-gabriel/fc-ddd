import { OrderItem } from "./order-item";

export class Order {
  // Relação pelo ID se a relação é entre múltiplos objetos de diferentes agregados
  private _id: string;
  private _customerId: string;
  // Relação pela classe se o objeto pertence ao mesmo agregado
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }

    if (this._items.length === 0) {
      throw new Error("Items amount must be greater than 0");
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than 0");
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }

  addItem(item: OrderItem) {
    this._items.push(item);
    this._total = this.total();
  }

  get id() {
    return this._id;
  }

  get items() {
    return this._items;
  }

  get customerId() {
    return this._customerId;
  }
}
