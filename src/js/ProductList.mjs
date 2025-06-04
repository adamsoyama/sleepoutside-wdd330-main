// 📌 This module handles generating product cards dynamically using template literals.
import { renderListWithTemplate } from "./utils.mjs"; // Import the utility function
const baseURL = import.meta.env.VITE_SERVER_URL; // Base API URL from environment variables

/**
 * Generates an HTML string for a product card using template literals.
 * @param {Object} product - The product data object containing details of a single item.
 * @returns {string} - The HTML string representing the product card.
 */
function productCardTemplate(product) {
  return `<li class="product-card">
        <a href="product_pages/?product=${product.id}&category=${product.Category}"> <!-- Pass category in URL -->
            <img src="${fixImagePath(product.Image)}" alt="Image of ${product.Name}"> <!-- Ensures correct image path -->
            <h2 class="card__brand">${product.Brand.Name}</h2> <!-- Display product brand -->
            <h3 class="card__name">${product.Name}</h3> <!-- Display product name -->
            <p class="product-card__price">$${product.FinalPrice}</p> <!-- Display product price -->
        </a>
    </li>`;
}

/**
 * Fixes the product image path by appending baseURL if necessary.
 * @param {string} imagePath - The image URL or relative path from the API.
 * @returns {string} - The corrected image path.
 */
function fixImagePath(imagePath) {
  if (!imagePath.startsWith("http")) {
    return `${baseURL}/${imagePath}`; // Append baseURL if the path is relative
  }
  return imagePath;
}

// 📌 The ProductList class is responsible for rendering the list of product cards.
export default class ProductList {
  /**
   * Constructor initializes the product list with a category, data source, and output element.
   * @param {object} dataSource - The data source module to fetch product data.
   * @param {HTMLElement} listElement - The HTML element where product cards will be rendered.
   */
  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  /**
   * Initializes the product list by fetching data and rendering the product cards.
   * Uses async/await to ensure data is retrieved before rendering.
   * @param {string} category - The category of products to fetch.
   */
  async init(category) {
    console.log("Fetching category:", category); // Debugging statement

    const products = await this.dataSource.getData(category); // Pass category dynamically
    if (!products || products.length === 0) {
      console.warn("No products found for category:", category);
    }

    this.renderList(products); // Render products dynamically
  }

  /**
   * Uses the utility function to render product cards dynamically.
   * @param {Array} products - List of products retrieved from the API.
   */
  renderList(products) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      products,
      "afterbegin",
      true,
    ); // Clears old content before adding new
  }
}
