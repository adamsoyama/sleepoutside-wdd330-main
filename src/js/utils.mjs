
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}


export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}


export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}



/**
 * Renders a list using a template function and inserts the results into a DOM element.
 * @param {Function} template - function that returns an HTML string for a product
 * @param {HTMLElement} parentElement - the container to render the list into
 * @param {Array} list - the array of items to render
 */
export function renderListWithTemplate(template, parentElement, list) {
  list.forEach(item => {
    const html = template(item);
    parentElement.insertAdjacentHTML("beforeend", html);
  });
}
