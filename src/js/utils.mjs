// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  const element = parent.querySelector(selector);
  if (!element) {
    console.warn(`No element found for selector: ${selector}`);
  }
  return element;
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || null;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  if (typeof data !== "string") {
    localStorage.setItem(key, JSON.stringify(data)); // Converts non-string data to JSON before storing
  } else {
    localStorage.setItem(key, data); // Allows direct storage of strings
  }
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) {
    console.warn(`No elements found for selector: ${selector}`);
    return;
  }

  elements.forEach((el) => {
    el.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback(event);
    });
    el.addEventListener("click", callback);
  });
}

/**
 * Renders a list using a provided template function and inserts it into the DOM.
 * @param {Function} templateFn - The function used to generate HTML for each item.
 * @param {HTMLElement} parentElement - The HTML element to insert content into.
 * @param {Array} list - The array of items to be rendered.
 * @param {string} position - Specifies where to insert content (default: "afterbegin").
 * @param {boolean} clear - Whether to clear existing content before inserting new elements (default: false).
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = ""; // Clears the target element if needed
  }

  const htmlStrings = list.map(templateFn).join(""); // Generates HTML strings
  parentElement.insertAdjacentHTML(position, htmlStrings); // Inserts generated HTML into the DOM
}

 export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
 parentElement.innerHTML = template;
 if (callback) {
   callback(data);
 }
}

/**
 * Asynchronously fetches the content of an HTML file and returns it as a string.
 * This is useful for dynamically loading HTML templates into the page.
 * 
 * @param {string} path - The file path to the HTML template.
 * @returns {Promise<string>} - A promise that resolves to the HTML content as a string.
 */
export async function loadTemplate(path) {
  try {
    // Fetch the HTML file from the provided path
    const response = await fetch(path);

    // Check if the response was successful (HTTP status in the range 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch template from ${path}: ${response.status} ${response.statusText}`);
    }

    // Convert the response body to text format and return it
    return await response.text();
  } catch (error) {
    // Log any errors encountered during the fetch process
    console.error(`Error loading template from '${path}':`, error);

    // Return an empty string to prevent breaking functionality when an error occurs
    return "";
  }
}

// STEP 9.
/**
 * Loads the header and footer templates from partials, retrieves the placeholder elements,
 * and renders them into the DOM using `renderWithTemplate`.
 */
export async function loadHeaderFooter() {
  try {
    // Fetch header and footer template content asynchronously
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");

    // Grab the header and footer placeholder elements from the DOM
    const headerElement = document.querySelector("#header");
    const footerElement = document.querySelector("#footer");

    // Ensure the elements exist before rendering
    if (!headerElement || !footerElement) {
      console.error("Header or footer Element not found in the DOM.");
      return;
    }

    // Render header and footer content into their respective placeholders
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  } catch (error) {
    console.error("Error loading header or footer:", error);
  }
}