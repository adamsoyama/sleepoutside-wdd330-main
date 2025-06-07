import { loadHeaderFooter } from "../js/utils.mjs";
import { getLocalStorage } from "../js/utils.mjs";

// Load header and footer dynamically
loadHeaderFooter();

// Retrieve cart items for order summary
const cartItems = getLocalStorage("so-cart");

function calculateTotal() {
  if (!cartItems || cartItems.length === 0) {
    document.querySelector("#subtotal").textContent = "$0.00";
    document.querySelector("#tax").textContent = "$0.00";
    document.querySelector("#shipping").textContent = "$0.00";
    document.querySelector("#order-total").textContent = "$0.00";
    return;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  const tax = subtotal * 0.1; // Example: 10% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const orderTotal = subtotal + tax + shipping;

  // Update order summary
  document.querySelector("#subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector("#tax").textContent = `$${tax.toFixed(2)}`;
  document.querySelector("#shipping").textContent = `$${shipping.toFixed(2)}`;
  document.querySelector("#order-total").textContent = `$${orderTotal.toFixed(2)}`;
}

// Form validation before checkout
document.getElementById("checkout-form").addEventListener("submit", function (event) {
  const inputs = document.querySelectorAll("#checkout-form input");
  let valid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      valid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  if (!valid) {
    event.preventDefault();
    alert("Please fill out all required fields.");
  }
});

// Initialize calculations
calculateTotal();