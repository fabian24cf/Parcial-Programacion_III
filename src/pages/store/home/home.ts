import { PRODUCTS, getCategories } from "../../../data/data";
import type { IProduct } from "../../../types/product";
import type { ICategory } from "../../../types/category";
import { addToCart, getCartCount } from "../../../utils/cartStorage";
import "../../../styles/global.css";

let selectedCategoryId: number | null = null;
let searchTerm = "";


const productsContainer = document.getElementById("products-container") as HTMLDivElement;
const categoryList = document.getElementById("category-list") as HTMLUListElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const cartCountEl = document.getElementById("cart-count") as HTMLSpanElement;
const toastEl = document.getElementById("toast") as HTMLDivElement;

function getFilteredProducts(): IProduct[] {
  return PRODUCTS
    .filter((p) => !p.eliminado)
    .filter((p) => {
      if (selectedCategoryId === null) return true;
      return p.categorias.some((c) => c.id === selectedCategoryId);
    })
    .filter((p) => {
      if (searchTerm.trim() === "") return true;
      return p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });
}

function renderProducts(): void {
  const list = getFilteredProducts();

  if (list.length === 0) {
    productsContainer.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <h3>Sin resultados</h3>
        <p>No encontramos productos que coincidan con tu búsqueda.</p>
      </div>
    `;
    return;
  }

  productsContainer.innerHTML = list
    .map(
      (p) => `
      <article class="product-card" data-id="${p.id}">
        <div class="image">
          <img src="../../../assets/${p.imagen}" alt="${p.nombre}" onerror="this.style.display='none'">
        </div>
        <div class="info">
          <span class="name">${p.nombre}</span>
          <span class="desc">${p.descripcion}</span>
          <span class="price">$${p.precio.toLocaleString("es-AR")}</span>
          <button class="add-btn" data-action="add" data-id="${p.id}"
            ${!p.disponible ? "disabled" : ""}>
            ${p.disponible ? "Agregar al carrito" : "Sin stock"}
          </button>
        </div>
      </article>
    `
    )
    .join("");
}

function renderCategories(): void {
  const cats: ICategory[] = getCategories();
  const itemsHtml = [
    `<li><button data-cat-id="all" class="${
      selectedCategoryId === null ? "active" : ""
    }">Todas</button></li>`,
    ...cats.map(
      (c) => `
        <li>
          <button data-cat-id="${c.id}" class="${
        selectedCategoryId === c.id ? "active" : ""
      }">${c.nombre}</button>
        </li>`
    ),
  ];
  categoryList.innerHTML = itemsHtml.join("");
}
function refreshCartBadge(): void {
  cartCountEl.textContent = String(getCartCount());
}
let toastTimer: number | undefined;
function showToast(message: string): void {
  toastEl.textContent = message;
  toastEl.classList.add("visible");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastEl.classList.remove("visible");
  }, 1800);
}
searchInput.addEventListener("input", (e) => {
  searchTerm = (e.target as HTMLInputElement).value;
  renderProducts();
});

categoryList.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName !== "BUTTON") return;

  const catId = target.dataset.catId;
  selectedCategoryId = catId === "all" ? null : Number(catId);

  renderCategories();
  renderProducts();
});

productsContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.dataset.action !== "add") return;

  const productId = Number(target.dataset.id);
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  addToCart(product);
  refreshCartBadge();
  showToast(`✓ ${product.nombre} agregado al carrito`);
});

renderCategories();
renderProducts();
refreshCartBadge();