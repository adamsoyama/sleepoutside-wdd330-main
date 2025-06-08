// 📌 Wrapper for querySelector (returns matching element)
export function qs(selector, parent = document) {
  const element = parent.querySelector(selector);
  if (!element) console.warn(`No element found for selector: ${selector}`);
  return element;
}

//  Retrieve data from localStorage
export function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || null;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
}

//  Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(
    key,
    typeof data !== "string" ? JSON.stringify(data) : data,
  );
}

//  Set event listener for both touchend and click
export function setClick(selector, callback) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length)
    return console.warn(`No elements found for selector: ${selector}`);

  elements.forEach((el) => {
    el.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback(event);
    });
    el.addEventListener("click", callback);
  });
}

/**
 *  Renders a list using a provided template function and inserts it into the DOM.
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, list.map(templateFn).join(""));
}

/**
 *  Renders content with an optional callback.
 */
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

/**
 *  Fetches an HTML file asynchronously.
 */
export async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (!response.ok)
      throw new Error(
        `Failed to fetch template from ${path}: ${response.status} ${response.statusText}`,
      );
    return await response.text();
  } catch (error) {
    console.error(`Error loading template from '${path}':`, error);
    return "";
  }
}

/**
 *  Loads header and footer templates into placeholders.
 */
export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");

    const headerElement = qs("#main-header");
    const footerElement = qs("#main-footer");

    if (!headerElement || !footerElement)
      return console.error("Header or footer element not found in the DOM.");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  } catch (error) {
    console.error("Error loading header or footer:", error);
  }
}

/**
 *  Displays a custom, non-intrusive alert message at the top of the main element.
 * @param {string} message - Alert message to display.
 * @param {string} type - Type of alert ("error" or "success").
 * @param {string} fieldSelector - Selector for the field triggering the error (default: null).
 * @param {boolean} scroll - Whether to scroll to the top (default: true).
 */
export function alertMessage(
  message,
  type = "error",
  fieldSelector = null,
  scroll = true,
) {
  // Remove any existing alert
  const existingAlert = document.querySelector(".custom-alert");
  if (existingAlert) existingAlert.remove();

  // Create the alert container
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("custom-alert", `alert-${type}`);
  alertDiv.innerHTML = `
    <div class="alert-content">
      <p>${message}</p>
      <button class="close-alert">✖</button>
    </div>
  `;

  // Insert the alert at the top of the main element
  const mainElement = document.querySelector("main");
  mainElement.prepend(alertDiv);

  // Scroll to the top if required
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });

  // Highlight incorrect field if provided
  if (fieldSelector) {
    const field = document.querySelector(fieldSelector);
    if (field) {
      field.classList.add("error-highlight");
      field.focus();
    }
  }

  // Close the alert when clicking the button
  document.querySelector(".close-alert").addEventListener("click", () => {
    alertDiv.remove();
    if (fieldSelector)
      document
        .querySelector(fieldSelector)
        ?.classList.remove("error-highlight");
  });
}
