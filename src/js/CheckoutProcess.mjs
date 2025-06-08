import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "../js/utils.mjs";
import { alertMessage } from "../js/utils.mjs"; // Importing custom alert system

export default class CheckoutProcess {
  constructor(formSelector, key, outputSelector) {
    this.form = document.querySelector(formSelector);
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.service = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
    this.form.addEventListener("submit", (event) => this.checkout(event));
  }

  calculateItemSubTotal() {
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
    this.tax = this.itemTotal * 0.06; // 6% sales tax
    this.shipping = 10 + (this.list.length - 1) * 2; // Base $10 + $2 per additional item
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
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

  prepareOrderItems() {
    return this.list.map((item) => ({
      id: item.id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1,
    }));
  }

  formDataToJSON() {
    const formData = new FormData(this.form);
    const convertedJSON = {};

    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });

    return convertedJSON;
  }

  async checkout(event) {
    event.preventDefault();

    const formData = this.formDataToJSON();
    const orderDetails = {
      orderDate: new Date().toISOString(),
      fname: formData.fname,
      lname: formData.lname,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      cardNumber: formData.cardNumber,
      expiration: formData.expiration,
      code: formData.code,
      items: this.prepareOrderItems(),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2),
    };

    try {
      const confirmation = await this.service.submitOrder(orderDetails);

      if (confirmation) {
        alertMessage("🎉 Order placed successfully! Redirecting...", "success");

        // 🛒 Clear cart items
        localStorage.removeItem(this.key);

        // 🔄 Redirect to success page after a delay
        setTimeout(() => {
          window.location.href = "/checkout/success.html";
        }, 2000);
      } else {
        alertMessage("⚠ Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);

      let errorMessage = "⚠ An error occurred during checkout.";
      if (error.message) {
        errorMessage =
          typeof error.message === "object"
            ? JSON.stringify(error.message)
            : error.message;
      }

      alertMessage(errorMessage);
    }
  }
}
