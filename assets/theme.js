async function addToCart(variantId, quantity = 1) {
  const res = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: Number(variantId), quantity })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function getCart() {
  const res = await fetch('/cart.js', { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function updateCartCount(cart) {
  // Optional: update badge if you have one in header
  const badge = document.querySelector('[data-cart-count]');
  if (badge) badge.textContent = String(cart.item_count);
}

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.js-add-to-cart');
  if (!btn) return;

  e.preventDefault();

  const variantId = btn.dataset.variantId;
  if (!variantId) return;

  const originalText = btn.dataset.originalText || btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Adding...';

  try {
    await addToCart(variantId, 1);

    btn.textContent = 'Added ✓';
    const cart = await getCart();
    updateCartCount(cart);

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 900);
  } catch (err) {
    console.error(err);
    btn.textContent = 'Error';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 1200);
    alert('Could not add to cart.');
  }
});
