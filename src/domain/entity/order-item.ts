export class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _productId: string;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }


  get price() {
    return this._price;
  }

  get quantity() {
    return this._quantity;
  }

  get productId() {
    return this._productId;
  }

  orderItemTotal() {
    return this._price * this._quantity;
  }
}
