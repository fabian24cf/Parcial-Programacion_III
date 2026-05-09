import "../../../styles/global.css";
import {
  getCart,
  getCartTotal,
  getCartCount,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../../utils/cartStorage";

const cartContainer = document.getElementById("cart-container") as HTMLDivElement;
const cartCountEl = document.getElementById("cart-count") as HTMLSpanElement;

function renderCart(): void {
  const items = getCart();

  if (items.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-state">
        <h3>Tu carrito está vacío</h3>
        <p>Agregá productos desde el catálogo para empezar.</p>
        <p style="margin-top: 1rem;">
          <a href="../home/home.html" style="color: var(--accent); text-decoration: underline;">
            Volver al catálogo
          </a>
        </p>
      </div>
    `;
    cartCountEl.textContent = "0";
    return;
  }

  const listHtml = `
    <div class="cart-list">
      ${items.map((item) => `
        <div class="cart-item" data-id="${item.id}">
          <div class="thumb"><img src="../../../assets/${item.imagen}" alt="${item.nombre}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" onerror="this.style.display='none'"></div>
          <div>
            <div class="ci-name">${item.nombre}</div>
            <div class="ci-price">
              $${item.precio.toLocaleString("es-AR")} c/u
              <br>Subtotal: <strong>$${(item.precio * item.cantidad).toLocaleString("es-AR")}</strong>
            </div>
            <button class="remove-btn" data-action="remove" data-id="${item.id}">Eliminar</button>
          </div>
          <div class="qty-controls">
            <button data-action="dec" data-id="${item.id}">−</button>
            <span>${item.cantidad}</span>
            <button data-action="inc" data-id="${item.id}">+</button>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="cart-summary-box">
      <h3>Resumen</h3>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>$${getCartTotal().toLocaleString("es-AR")}</span>
      </div>
      <div class="summary-total" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <span>Total</span>
        <span>$${getCartTotal().toLocaleString("es-AR")}</span>
      </div>
      
      <button disabled style="width: 100%; padding: 1rem; background: #fcfcfc; border: 1px solid #eee; border-radius: 6px; color: #a0dddb; font-weight: bold; cursor: not-allowed; margin-top: 2rem;">Finalizar compra</button>
      <p style="font-size: 0.8rem; color: #f1c40f; text-align: center; margin-top: 0.5rem;">⚠️ El checkout no está disponible en esta versión.</p>
      
      <button class="btn-clear" id="clear-cart" style="width: 100%; padding: 1rem; border: 1px solid #ccc; border-radius: 6px; background: transparent; cursor: pointer; color: #888; font-weight: bold; margin-top: 1rem;">Vaciar carrito</button>
    </div>
  `;

  cartContainer.innerHTML = listHtml;
  cartCountEl.textContent = String(getCartCount());
}

cartContainer.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const action = target.dataset.action;
  const id = Number(target.dataset.id);

  if (action === "inc") {
    const current = getCart().find((i) => i.id === id);
    if (current) updateQuantity(id, current.cantidad + 1);
    renderCart();
  }

  if (action === "dec") {
    const current = getCart().find((i) => i.id === id);
    if (current) updateQuantity(id, current.cantidad - 1);
    renderCart();
  }

  if (action === "remove") {
    removeFromCart(id);
    renderCart();
  }

  if (target.id === "clear-cart") {
    if (confirm("¿Vaciar el carrito por completo?")) {
      clearCart();
      renderCart();
    }
  }
});

renderCart();