import { CartModel } from "../models/cartModel";
import { CartView } from "../views/cartView";

export class CartController {
  constructor() {
    this.model = new CartModel();
    this.view = new CartView();

    this.view.render(this.model.items);
    this.view.bindRemove(this.handleRemove.bind(this));
  }

  handleRemove(index) {
    this.model.removeItem(index);
    this.view.render(this.model.items);
  }
}