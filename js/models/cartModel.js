export class CartModel {
    constructor() {
      this.items = JSON.parse(localStorage.getItem('carritoM')) || [];
    }
    addItem(product) {
      this.items.push(product);
      this._commit();
    }
    removeItem(index) {
      this.items.splice(index, 1);
      this._commit();
    }
    _commit() {
      localStorage.setItem('carritoM', JSON.stringify(this.items));
    }
  }
  