document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "leptop", price: 10000 },
    { id: 2, name: "mobile", price: 15000 },
    { id: 3, name: "pc", price: 20000 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Render products
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span> ${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });

  // Add product to cart
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Render Cart with Remove Button
  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotal.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)}
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotal.classList.add("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  // Remove item from cart
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      cart.splice(index, 1); // remove the item at that index
      saveCart();
      renderCart();
    }
  });

  // Checkout
  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    saveCart();
    renderCart();
    alert("Thank you for your purchase!");
  });

  // Render cart on page load
  renderCart();
});
