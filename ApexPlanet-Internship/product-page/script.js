const data = [
  { name: "Blue Shirt", price: 499 },
  { name: "Black Jeans", price: 899 },
  { name: "Sneakers", price: 1299 },
  { name: "Cap", price: 299 },
  { name: "Watch", price: 1999 },
];

const grid = document.getElementById('productGrid');
const search = document.getElementById('search');
const sort = document.getElementById('sort');

function render(products) {
  grid.innerHTML = products.map(p => `
    <div class="card">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
    </div>`).join('');
}

function applyFilters() {
  let filtered = data.filter(p => 
    p.name.toLowerCase().includes(search.value.toLowerCase())
  );
  if (sort.value === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort.value === "high") filtered.sort((a, b) => b.price - a.price);
  render(filtered);
}

search.addEventListener('input', applyFilters);
sort.addEventListener('change', applyFilters);

render(data);
