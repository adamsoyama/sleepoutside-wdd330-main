import { loadHeaderFooter } from "../js/utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { alertMessage } from "../js/utils.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess(
  "#checkout-form",
  "so-cart",
  ".order-summary",
);
checkout.init();

// 📌 Listen for form submission
document
  .getElementById("checkout-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default submission behavior

    const form = event.target;
    let hasErrors = false; // Tracks validation status

    // 📌 Validate required fields
    const requiredFields = [
      "fname",
      "lname",
      "street",
      "city",
      "state",
      "zip",
      "cardNumber",
      "expiration",
      "code",
    ];
    requiredFields.forEach((field) => {
      const input = form.querySelector(`[name="${field}"]`);
      if (!input.value.trim()) {
        alertMessage(
          `⚠ ${field.replace(/([A-Z])/g, " $1")} is required.`,
          `[name='${field}']`,
        );
        hasErrors = true;
      }
    });

    // 📌 Validate credit card format (16 digits)
    const cardNumber = form.querySelector("[name='cardNumber']");
    if (!/^\d{16}$/.test(cardNumber.value.trim())) {
      alertMessage(
        "⚠ Card number must be **16 digits**.",
        "[name='cardNumber']",
      );
      hasErrors = true;
    }

    // 📌 Validate expiration date (MM/YY format)
    const expiration = form.querySelector("[name='expiration']");
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiration.value.trim())) {
      alertMessage(
        "⚠ Expiration date must be **MM/YY format**.",
        "[name='expiration']",
      );
      hasErrors = true;
    }

    // 📌 Validate security code (3 digits)
    const securityCode = form.querySelector("[name='code']");
    if (!/^\d{3}$/.test(securityCode.value.trim())) {
      alertMessage("⚠ Security code must be **3 digits**.", "[name='code']");
      hasErrors = true;
    }

    // 📌 Validate zip code (5 digits)
    const zip = form.querySelector("[name='zip']");
    if (!/^\d{5}$/.test(zip.value.trim())) {
      alertMessage("⚠ Zip code must be **5 digits**.", "[name='zip']");
      hasErrors = true;
    }

    // 📌 Check built-in browser validation first
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // 🚀 Proceed to checkout if no errors
    if (!hasErrors) {
      checkout.checkout(event);
    }
  });
