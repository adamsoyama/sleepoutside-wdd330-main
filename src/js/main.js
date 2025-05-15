// main.js
import ProductList from './ProductList.mjs';
import ProductData from './ProductData.mjs';


const productListElement = document.querySelector('#product-list');


const dataSource = new ProductData('tents');


const productList = new ProductList('tents', dataSource, productListElement);


productList.init();
