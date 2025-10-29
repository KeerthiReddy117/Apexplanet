// ---------- Product Data ----------
const products = [
  { id: 1, name: "Blue Shirt", price: 499, img: "https://via.placeholder.com/200x150?text=Blue+Shirt" },
  { id: 2, name: "Sneakers", price: 1199, img: "https://via.placeholder.com/200x150?text=Sneakers" },
  { id: 3, name: "Jeans", price: 899, img: "https://via.placeholder.com/200x150?text=Jeans" },
  { id: 4, name: "Cap", price: 299, img: "https://via.placeholder.com/200x150?text=Cap" },
  { id: 5, name: "Watch", price: 1599, img: "https://via.placeholder.com/200x150?text=Watch" }
];

const cartKey = "shopeasy_cart";
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

// ---------- Render Product Grid ----------
const productGrid = document.getElementById("productGrid");
if (productGrid) {
  function renderProducts(list) {
    productGrid.innerHTML = list
      .map(
        (p) => `
        <div class="card">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`
      )
      .join("");
  }

  renderProducts(products);

  // Search + Sort
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");

  function filterProducts() {
    let list = products.filter((p) =>
      p.name.toLowerCase().includes(search.value.toLowerCase())
    );
    if (sort.value === "low") list.sort((a, b) => a.price - b.price);
    if (sort.value === "high") list.sort((a, b) => b.price - a.price);
    renderProducts(list);
  }

  search.addEventListener("input", filterProducts);
  sort.addEventListener("change", filterProducts);
}

// ---------- Add to Cart ----------
function addToCart(id) {
  const item = products.find((p) => p.id === id);
  cart.push(item);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
  alert(`${item.name} added to cart!`);
}

// ---------- Update Cart Count ----------
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = cart.length;
}
updateCartCount();

// ---------- Cart Page ----------
const cartList = document.getElementById("cartList");
if (cartList) {
  function renderCart() {
    const totalBox = document.getElementById("totalBox");
    const emptyCart = document.getElementById("emptyCart");

    if (cart.length === 0) {
      cartList.innerHTML = "";
      totalBox.style.display = "none";
      emptyCart.style.display = "block";
      return;
    }

    emptyCart.style.display = "none";
    totalBox.style.display = "block";

    cartList.innerHTML = cart
      .map(
        (item, i) => `
        <li>
          <span>${item.name} - ₹${item.price}</span>
          <button onclick="removeItem(${i})">❌</button>
        </li>`
      )
      .join("");

    const total = cart.reduce((sum, i) => sum + i.price, 0);
    document.getElementById("total").textContent = total;
  }

  renderCart();

  // Remove item
  window.removeItem = function (i) {
    cart.splice(i, 1);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    renderCart();
    updateCartCount();
  };

  // Clear cart
  document.getElementById("clearCart").addEventListener("click", () => {
    cart = [];
    localStorage.removeItem(cartKey);
    renderCart();
    updateCartCount();
  });
}
