// 📌 This script handles loading product data and rendering a list of product cards dynamically.

// Import necessary modules
import ProductData from "./ProductData.mjs"; // Handles data retrieval for products
import ProductList from "./ProductList.mjs"; // Manages product list rendering
import { loadHeaderFooter } from "./utils.mjs"; // Loads header and footer dynamically

/**
 * Load the header and footer dynamically into the webpage.
 * Ensures consistent navigation and branding across all pages.
 */
loadHeaderFooter();

/**
 * Select the HTML element where product cards should be displayed.
 * Ensures the product list is inserted into the correct container.
 */
const listElement = document.querySelector(".product-list");

/**
 * Create an instance of the ProductData class.
 * Specifies the category ("tents") to load the relevant product data.
 */
const productData = new ProductData("tents");

/**
 * Create an instance of the ProductList class.
 * Passes the product category, data source instance, and target HTML container.
 */
const productList = new ProductList("tents", productData, listElement);

/**
 * Initialize the product list.
 * Fetch product data and dynamically generate product cards.
 */
productList.init();
