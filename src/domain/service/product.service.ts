import type { Product } from "../entity/product"

export class ProductService {
  static increasePrices(products: Product[], percentage: number) {
    products.forEach((product) => {
      product.changePrice(product.price + ((product.price * percentage) / 100))
    })
  }
}