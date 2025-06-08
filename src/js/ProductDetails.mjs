import { getParam, loadHeaderFooter, alertMessage } from "../js/utils.mjs";
import ExternalServices from "../js/ExternalServices.mjs";
import { getLocalStorage, setLocalStorage } from "../js/utils.mjs";

const dataSource = new ExternalServices();
const productId = getParam("product"); // Get product ID from URL parameter
const productElement = document.querySelector(".product-detail");

/**
 * Fetches product details and renders them dynamically.
 */
async function renderProductDetail() {
  try {
    if (!productId) {
      console.error("No product ID found in URL.");
      productElement.innerHTML = "<p>Error: No product selected.</p>";
      return;
    }

    const product = await dataSource.findProductById(productId);

    if (!product) {
      console.error(`Product with ID ${productId} not found.`);
      productElement.innerHTML = "<p>Product not found.</p>";
      return;
    }

    // Fix image path using PrimaryLarge for high-quality product images
    const productImage = fixImagePath(product.PrimaryLarge);

    // Render product details dynamically
    productElement.innerHTML = `
      <div class="product-detail__container">
        <img src="${productImage}" alt="Image of ${product.Name}">
        <h2>${product.Name}</h2>
        <h3>${product.Brand.Name}</h3>
        <p>Price: $${product.FinalPrice}</p>
        <button id="addToCart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;

    // Attach event listener to "Add to Cart" button after rendering
    document
      .getElementById("addToCart")
      ?.addEventListener("click", () => addToCart(product));
  } catch (error) {
    console.error("Error rendering product details:", error);
    productElement.innerHTML = "<p>Error loading product details.</p>";
  }
}

/**
 * Fixes broken image paths by ensuring they are correctly formatted.
 * @param {string} imagePath - The image URL or relative path from the API.
 * @returns {string} - The corrected image path.
 */
function fixImagePath(imagePath) {
  if (!imagePath || imagePath.trim() === "") {
    return `${import.meta.env.VITE_SERVER_URL}/default-image.jpg`; // Provide a fallback image
  }
  if (!imagePath.startsWith("http")) {
    return `${import.meta.env.VITE_SERVER_URL}/${imagePath}`; // Append baseURL if the path is relative
  }
  return imagePath;
}

/**
 * Adds a product to the cart and provides user feedback.
 * @param {Object} product - The product object to add.
 */
function addToCart(product) {
  let cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);

  // 🚀 Show success alert
  alertMessage(`🎉 ${product.Name} added to cart!`, "success");
}

// Load product details dynamically
renderProductDetail();

// Load header and footer dynamically
loadHeaderFooter();
