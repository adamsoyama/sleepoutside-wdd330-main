import { getLocalStorage } from "../js/utils.mjs";

// Function to render cart contents
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".cart-total").textContent = "Total: $0.00"; // Handle empty cart
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Calculate Total Price
  const subtotal = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  const tax = subtotal * 0.1; // Example 10% tax calculation
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping for orders over $50
  const orderTotal = subtotal + tax + shipping;

  // Update total values dynamically
  document.querySelector("#subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector("#tax").textContent = `$${tax.toFixed(2)}`;
  document.querySelector("#shipping").textContent = `$${shipping.toFixed(2)}`;
  document.querySelector("#order-total").textContent =
    `$${orderTotal.toFixed(2)}`;
}

// Function to generate HTML for a cart item
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

// Render cart contents and calculate total
renderCartContents();

// Load header and footer dynamically
import { loadHeaderFooter } from "../js/utils.mjs";
loadHeaderFooter();
