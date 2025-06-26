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

let cart = [];

cartBtn.addEventListener("click", () => {
  updateCartModal();
  cartModal.style.display = "flex";
});

cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal || e.target === closeModalBtn) {
    cartModal.style.display = "none";
  }
});

menu.addEventListener("click", (e) => {
  let parentButton = e.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    addToCart(name, price);
  }
});

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCartModal();
}

function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "border",
      "p-3",
      "rounded-lg"
    );
    cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">${item.name}</p>
            <p>Qtd: ${item.quantity}</p>
            <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
          </div>
        </div>


          <button class="remove-btn" data-name="${item.name}">Remover</button>

        `;

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  cartCounter.textContent = cart.length;
}

cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const name = e.target.getAttribute("data-name");
    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity--;
      updateCartModal();
      return;
    }
    cart.splice(index, 1);
    updateCartModal();
  }
}

addressInput.addEventListener("input", (e) => {
  let inputValue = e.target.value;

  if (inputValue !== "") {
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;

  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }
});
