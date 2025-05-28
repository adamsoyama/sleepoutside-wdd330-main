// 📌 This script handles loading product data and rendering a list of product cards dynamically.

import ProductData from "./ProductData.mjs"; // Import the data source module
import ProductList from "./ProductList.mjs"; // Import the product list module

/**
 * Selects the HTML element where product cards should be displayed.
 * Ensures the product list is inserted into the correct container on the webpage.
 */
const listElement = document.querySelector(".product-list"); // Ensure correct class selection
/**
 * Creates an instance of the ProductData class.
 * Specifies the category ("tents") to load the relevant product data.
 */
const productData = new ProductData("tents");

/**
 * Creates an instance of the ProductList class.
 * Passes the product category, data source instance, and target HTML container.
 */
const productList = new ProductList("tents", productData, listElement);

/**
 * Initializes the product list.
 * Fetches product data and dynamically generates product cards.
 */
productList.init();
