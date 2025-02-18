/*
Um Value Object é apenas um conjunto de propriedades que representa algo para o 
nosso sistema. Ele não tem uma identidade própria, e é imutável

Manipular o meu objeto, mas que não pode ser alterado
*/

export class Address {
  _street: string;
  _number: number;
  _zip: string;
  _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zip = zip;

    this.validate();
  }

  validate() {
    if (!this._street || this._street.length === 0) {
      throw new Error("Street is required");
    }

    if (!this._number || this._number <= 0) {
      throw new Error("Number must be greater than zero");
    }

    if (!this._zip || this._zip.length === 0) {
      throw new Error("Zip is required");
    }

    if (!this._city || this._city.length === 0) {
      throw new Error("City is required");
    }
  }

  toString() {
    return `${this._street}, ${this._number} - ${this._zip} - ${this._city}`;
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get zipcode() {
    return this._zip;
  }

  get city() {
    return this._city;
  }
}
