// 📌 Handles rendering product listings dynamically

import ProductData from "../js/ProductData.mjs";
import ProductList from "../js/ProductList.mjs";

// Retrieve the category from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category") || "tents"; // Default to 'tents' if no category is provided

// Select the HTML element where product cards will be displayed
const listElement = document.querySelector(".product-list");

// Create an instance of the ProductData class to fetch product details dynamically
const productData = new ProductData(category);

// Create an instance of the ProductList class for rendering products dynamically
const productList = new ProductList(category, productData, listElement);

// Initialize the product list
productList.init();