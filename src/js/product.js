<<<<<<< HEAD
import { getLocalStorage, setLocalStorage } from "../js/utils.mjs";
import ProductData from "./ProductData.mjs";
=======
import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "../js/utils.mjs";
import ProductData from "../js/ProductData.mjs";
>>>>>>> ao--individual3

const dataSource = new ProductData();

// Function to add a product to the cart
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || []; // Get cart items from local storage (or default to empty array)
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems); // Save updated cart back to local storage
}

// Function to handle "Add to Cart" button click
async function addToCartHandler(e) {
  try {
    const productId = e.target.dataset.id; // Retrieve product ID from button's dataset
    const product = await dataSource.findProductById(productId); // Fetch product details from API
    if (product) {
      addProductToCart(product);
    } else {
      console.error(`Product with ID ${productId} not found.`);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}

// Add event listener to "Add to Cart" button
document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);

<<<<<<< HEAD
// Import necessary modules
import { loadHeaderFooter } from "../js/utils.mjs";

// Load header and footer dynamically into product pages
=======
// Load header and footer dynamically
>>>>>>> ao--individual3
loadHeaderFooter();
