export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    // Calculate the total dollar amount of items in the cart
    if (!this.list || this.list.length === 0) {
      this.itemTotal = 0;
      document.querySelector(`${this.outputSelector} #subtotal`).innerText =
        "$0.00";
      return;
    }

    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector(`${this.outputSelector} #subtotal`).innerText =
      `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // Calculate tax and shipping
    this.tax = this.itemTotal * 0.06; // 6% sales tax
    this.shipping = 10 + (this.list.length - 1) * 2; // $10 + $2 per additional item
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // Display the totals
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #tax`).innerText =
      `$${this.tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #shipping`).innerText =
      `$${this.shipping.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #order-total`).innerText =
      `$${this.orderTotal.toFixed(2)}`;
  }
}
