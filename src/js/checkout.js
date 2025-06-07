import { loadHeaderFooter } from "../js/utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load header and footer dynamically
loadHeaderFooter();

// Initialize CheckoutProcess and handle order calculations
const checkout = new CheckoutProcess(
  "#checkout-form",
  "so-cart",
  ".order-summary",
);
checkout.init();
