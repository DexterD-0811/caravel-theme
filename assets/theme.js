async function addToCart(variantId, quantity = 1) {
  const res = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: Number(variantId), quantity })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.js-add-to-cart');
  if (!btn) return;

  e.preventDefault();
  const variantId = btn.dataset.variantId;
  if (!variantId) return;

  const old = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Adding...';

  try {
    await addToCart(variantId, 1);
    btn.textContent = 'Added ✓';
    setTimeout(() => (btn.textContent = old), 900);
  } catch (err) {
    console.error(err);
    btn.textContent = 'Error';
    setTimeout(() => (btn.textContent = old), 1200);
    alert('Could not add to cart.');
  } finally {
    btn.disabled = false;
  }
});
