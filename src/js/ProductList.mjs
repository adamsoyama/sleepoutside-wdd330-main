// ProductList.mjs

import renderListWithTemplate from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Fetch the product data
    const list = await this.dataSource.getData();

    // Render the list into the DOM
    this.renderList(list);
  }

  renderList(list) {
    this.listElement.innerHTML = ''; // clear the list first
    renderListWithTemplate(this.template, this.listElement, list);
  }

  template(product) {
    return `
      <li class="product-card">
        <a href="product_pages/${product.Id}.html">
          <img src="${product.Image}" alt="${product.Name}" />
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">$${product.ListPrice}</p>
        </a>
      </li>
    `;
  }
}
