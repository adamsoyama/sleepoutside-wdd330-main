import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "../js/utils.mjs";
import ProductData from "../js/ProductData.mjs";

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

// Load header and footer dynamically
loadHeaderFooter();
