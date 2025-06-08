// 📌 Base URL for API requests, dynamically pulled from environment variables
const baseURL = import.meta.env.VITE_SERVER_URL;

/**
 * Converts fetch response to JSON while handling errors.
 * @param {Response} res - The fetch response object.
 * @returns {Promise<Object>} - Parsed JSON data or throws an error.
 */
async function convertToJson(res) {
  const jsonResponse = await res.json(); // Convert response first

  if (res.ok) {
    return jsonResponse; // Return data if response is OK
  } else {
    throw { name: "servicesError", message: jsonResponse }; // Pass full error object
  }
}

// 📌 ExternalServices class handles API interactions
export default class ExternalServices {
  constructor() {}

  /**
   * Fetches product data based on category using async/await.
   * @param {string} category - The product category for filtering.
   * @returns {Promise<Array>} - Array of products from API.
   */
  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);
      return await convertToJson(response);
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
    try {
      const response = await fetch(`${baseURL}products/${id}`);
      return await convertToJson(response);
    } catch (error) {
      console.error(`Error finding product with ID ${id}:`, error);
      return null;
    }
  }

  /**
   * Submits an order to the checkout endpoint using a POST request.
   * @param {Object} orderDetails - The order details including customer info, payment, and cart items.
   * @returns {Promise<Object>} - Confirmation response from the server.
   */
  async submitOrder(orderDetails) {
    try {
      const response = await fetch(`${baseURL}checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails), // Convert order data to JSON format
      });

      return await convertToJson(response);
    } catch (error) {
      console.error("Order submission error:", error);
      return null; // Prevents app crashes and handles error properly
    }
  }
}
