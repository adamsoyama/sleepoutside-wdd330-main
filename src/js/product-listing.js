import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load header and footer templates dynamically
loadHeaderFooter();

// Retrieve the category from the URL using getParam()
const category = getParam("category") || "tents"; // Default to 'tents' if no category is provided

// Select the title element and update it
const titleElement = document.querySelector(".page-title"); // Ensure this selector matches your HTML
if (titleElement) {
  titleElement.textContent = `Top Products: ${category}`;
}

// Create an instance of the ProductData class (no category needed in constructor)
const dataSource = new ProductData();

// Select the HTML element where product cards will be displayed
const listElement = document.querySelector(".product-list");

// Create an instance of the ProductList class with the category, data source, and list element
const myList = new ProductList(category, dataSource, listElement);

// Initialize the product list
myList.init();
