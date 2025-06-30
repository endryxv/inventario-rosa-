let inv = JSON.parse(localStorage.getItem('inv')) || [];
let fiados = JSON.parse(localStorage.getItem('fiados')) || [];

function save() {
  localStorage.setItem('inv', JSON.stringify(inv));
  localStorage.setItem('fiados', JSON.stringify(fiados));
}

function render() {
  const pl = document.getElementById('productsList');
  pl.innerHTML = '';
  let tot = 0;
  inv.forEach((p,i) => {
    tot += p.qty * p.price;
    const li = document.createElement('li');
    li.textContent = `${p.name} – ${p.qty} × $${p.price.toFixed(2)} = $${(p.qty*p.price).toFixed(2)}`;
    const btn = document.createElement('button');
    btn.textContent = '❌';
    btn.onclick = () => { inv.splice(i,1); save(); render(); };
    li.appendChild(btn);
    pl.appendChild(li);
  });
  document.getElementById('invTotal').textContent = tot.toFixed(2);

  const fl = document.getElementById('fiadosList');
  fl.innerHTML = '';
  let totF = 0;
  fiados.forEach((f,i) => {
    totF += f.balance;
    const li = document.createElement('li');
    li.innerHTML = `<div>${f.name} – ${f.prod}</div>
                    <div>Debe: $${f.balance.toFixed(2)}</div>`;
    const payBtn = document.createElement('button');
    payBtn.textContent = '💵 Abonar';
    payBtn.onclick = () => {
      const a = parseFloat(prompt('Monto a abonar:'));
      if (!isNaN(a)) {
        f.balance -= a;
        if (f.balance <= 0) fiados.splice(i,1);
        save();
        render();
      }
    };
    li.appendChild(payBtn);
    fl.appendChild(li);
  });
  document.getElementById('fiadoTotalSum').textContent = totF.toFixed(2);
}

function addProduct() {
  const n = document.getElementById('prodName').value.trim();
  const q = parseInt(document.getElementById('prodQty').value);
  const p = parseFloat(document.getElementById('prodPrice').value);
  if (!n || isNaN(q) || isNaN(p)) return alert('Completa los campos del inventario');
  inv.push({name:n, qty:q, price:p});
  save(); render();
  ['prodName','prodQty','prodPrice'].forEach(id => document.getElementById(id).value = '');
}

function addFiado() {
  const n = document.getElementById('fiadoName').value.trim();
  const pr = document.getElementById('fiadoProd').value.trim();
  const t = parseFloat(document.getElementById('fiadoTotal').value);
  if (!n || !pr || isNaN(t)) return alert('Completa los campos de fiado');
  fiados.push({name:n, prod:pr, balance:t});
  save(); render();
  ['fiadoName','fiadoProd','fiadoTotal'].forEach(id => document.getElementById(id).value = '');
}

render();
