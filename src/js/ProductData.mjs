// Base URL for API requests, dynamically pulled from environment variables
const baseURL = import.meta.env.VITE_SERVER_URL;

/**
 * Converts fetch response to JSON while handling errors.
 * @param {Response} res - The fetch response object.
 * @returns {Promise<Object>} - Parsed JSON data or throws an error.
 */
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

export default class ProductData {
  constructor() {} // Removed category and path

  /**
   * Fetches product data based on category using async/await.
   * @param {string} category - The product category for filtering.
   * @returns {Promise<Array>} - Array of products from API.
   */
  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);

      // Convert response to JSON safely
      const data = await convertToJson(response);

      return data.Result; // API response is structured under "Result"
    } catch (error) {
      console.error("Error fetching product data:", error);
      return []; // Prevents app crashes
    }
  }

  /**
   * Finds a product by its ID.
   * @param {string} id - The product ID to search for.
   * @returns {Promise<Object|null>} - The product object or null if not found.
   */
  async findProductById(id) {
    const products = await this.getData("all"); // Fetch all products
    return products ? products.find((item) => item.id === id) : null;
  }
}
