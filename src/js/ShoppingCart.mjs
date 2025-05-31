import { renderListWithTemplate } from "./utils.mjs"; // Import utility function for rendering

/**
 * Generates an HTML string for a shopping cart item using a template.
 * @param {Object} item - The product data object containing details of a cart item.
 * @returns {string} - The HTML string representing the cart item.
 */
function cartItemTemplate(item) {
  return `<li class="cart-item">
        <img src="${item.Image}" alt="${item.Name}" class="cart-item__image">
        <div class="cart-item__details">
            <h3 class="cart-item__name">${item.Name}</h3>
            <p class="cart-item__price">$${item.FinalPrice} x ${item.Quantity}</p>
        </div>
        <button class="remove-item" data-id="${item.id}">Remove</button>
    </li>`;
}

/**
 * Class representing the shopping cart and its behavior.
 */
export default class ShoppingCart {
  /**
   * Initializes the shopping cart with a data source and target list element.
   * @param {object} dataSource - The data source module to fetch cart data.
   * @param {HTMLElement} listElement - The HTML element where cart items will be rendered.
   */
  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  /**
   * Initializes the cart by fetching stored data and rendering the cart items.
   */
  async init() {
    const cartItems = await this.dataSource.getCartData(); // Fetch cart data
    this.renderCart(cartItems); // Render cart items dynamically
  }

  /**
   * Uses a template to render shopping cart items dynamically.
   * @param {Array} cartItems - List of items in the shopping cart.
   */
  renderCart(cartItems) {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      cartItems,
      "afterbegin",
      true,
    );
  }
}
