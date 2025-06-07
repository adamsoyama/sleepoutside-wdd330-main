// 📌 Base URL for API requests, dynamically pulled from environment variables
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

// 📌 Updated class name to reflect extended functionality beyond products
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

      if (!response.ok) throw new Error("Failed to submit order");

      return response.json(); // Return order confirmation response
    } catch (error) {
      console.error("Order submission error:", error);
      return null; // Prevents app crashes and handles error properly
    }
  }
}
