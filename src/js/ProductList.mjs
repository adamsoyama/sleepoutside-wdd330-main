// 📌 This module handles generating product cards dynamically using template literal strings.

import { renderListWithTemplate } from "./utils.mjs"; // Import the utility function

/**
 * Generates an HTML string for a product card using template literals.
 * @param {Object} product - The product data object containing details of a single item.
 * @returns {string} - The HTML string representing the product card.
 */
function productCardTemplate(product) {
  return `<li class="product-card">
        <a href="product_pages/?product=${product.id}"> <!-- Dynamically link to product page -->
            <img src="${product.Image}" alt="Image of ${product.Name}"> <!-- Display product image -->
            <h2 class="card__brand">${product.Brand.Name}</h2> <!-- Display product brand -->
            <h3 class="card__name">${product.Name}</h3> <!-- Display product name -->
            <p class="product-card__price">$${product.FinalPrice}</p> <!-- Display product price -->
        </a>
    </li>`;
}

// 📌 The ProductList class is responsible for rendering the list of product cards.
export default class ProductList {
  /**
   * Constructor initializes the product list with a category, data source, and output element.
   * @param {string} category - The category of products to display (e.g., "tents").
   * @param {object} dataSource - The data source module to fetch product data.
   * @param {HTMLElement} listElement - The HTML element where product cards will be rendered.
   */
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  /**
   * Initializes the product list by fetching data and rendering the product cards.
   * Uses async/await to ensure data is retrieved before rendering.
   */
  async init() {
    const products = await this.dataSource.getData(); // Fetch product data
    this.renderList(products); // Render products dynamically
  }

  /**
   * Uses the utility function to render product cards dynamically.
   * @param {Array} products - List of products retrieved from JSON data.
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
