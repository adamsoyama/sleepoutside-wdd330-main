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
