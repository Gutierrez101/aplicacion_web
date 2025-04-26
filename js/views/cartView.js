export class CartView {
    constructor() {
      this.cartContainer = document.getElementById('carritoM');
    }
    render(items) {
      this.cartContainer.innerHTML = items
        .map((p, i) => `<li>
           ${p.name} – $${p.price}
           <button data-index="${i}" class="eliminar-btn">✕</button>
         </li>`).join('');
    }
    bindRemove(handler) {
      this.cartContainer.addEventListener('click', e => {
        if (e.target.matches('.eliminar-btn')) {
          const index = +e.target.dataset.index;
          handler(index);
        }
      });
    }
  }
  