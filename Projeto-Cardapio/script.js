const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-counter");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
});

cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal || e.target === closeModalBtn) {
    cartModal.style.display = "none";
  }
});
