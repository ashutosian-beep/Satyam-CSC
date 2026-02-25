/*
 * Grahak Seva Kendra - Main App
 * Developer: Ashutosh Saini
 */

let currentCat = 'all';
let isWishView = false;
let payMethod = 'cash';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    DataManager.init();
    applyTheme();
    renderApp();
    updateBadges();
});

// ===== THEME =====
function applyTheme() {
    const d = DataManager.getData();
    const t = d.theme;
    const r = document.documentElement;
    r.style.setProperty('--p', t.primary);
    r.style.setProperty('--s', t.secondary);
    r.style.setProperty('--a', t.accent);
    r.style.setProperty('--bg', t.bg);
    r.style.setProperty('--bg2', t.cardBg);
    r.style.setProperty('--t', t.textColor);
}

// ===== RENDER APP =====
function renderApp() {
    const d = DataManager.getData();

    // Logo & Name (Developer locked)
    document.getElementById('logoEmoji').textContent = d.logoEmoji;
    document.getElementById('centerTitle').textContent = d.centerName;
    document.getElementById('centerSub').textContent = d.centerSubtitle;
    document.title = d.shopName || d.centerName;

    // Welcome
    document.getElementById('welcomeMsg').innerHTML =
        '<strong>' + d.welcomeMessage.split('.')[0] + '.</strong> ' +
        d.welcomeMessage.split('.').slice(1).join('.');

    // Banners
    const activeBanners = d.banners.filter(b => b.active);
    document.getElementById('marqueeText').textContent =
        activeBanners.map(b => b.text).join('    ?    ');

    // Developer watermark
    document.getElementById('devMark').innerHTML =
        'Developed by <a href="#">' + d.developerName + '</a> | v' + d.appVersion;

    renderStats(d);
    renderCategories(d);
    renderFeatured(d);
    renderServices(d);
    updateBadges();
}

// ===== STATS =====
function renderStats(d) {
    const total = d.products.filter(p => p.active).length;
    const cats = d.categories.filter(c => c.active).length;
    const orders = d.orders.length;

    document.getElementById('quickStats').innerHTML = `
        <div class="qc"><div class="qi">??</div><div class="qv">${total}</div><div class="ql">Services</div></div>
        <div class="qc"><div class="qi">??</div><div class="qv">${cats}</div><div class="ql">Categories</div></div>
        <div class="qc"><div class="qi">??</div><div class="qv">${orders}+</div><div class="ql">Applied</div></div>
        <div class="qc"><div class="qi">?</div><div class="qv">4.8</div><div class="ql">Rating</div></div>`;
}

// ===== CATEGORIES =====
function renderCategories(d) {
    const el = document.getElementById('catsContainer');
    const cats = d.categories.filter(c => c.active);

    let html = `<div class="cc ${currentCat === 'all' ? 'on' : ''}" onclick="filterCat('all')">
        <span class="ci">${d.logoEmoji}</span><span class="cn">All</span></div>`;

    cats.forEach(c => {
        html += `<div class="cc ${currentCat === c.id ? 'on' : ''}" onclick="filterCat(${c.id})">
            <span class="ci">${c.icon}</span>
            <span class="cn">${c.name.replace(c.icon, '').trim()}</span></div>`;
    });

    el.innerHTML = html;
}

// ===== FEATURED =====
function renderFeatured(d) {
    const el = document.getElementById('featuredContainer');
    const featured = d.products.filter(p => p.featured && p.active);

    if (!featured.length) {
        document.getElementById('featuredSection').style.display = 'none';
        return;
    }
    document.getElementById('featuredSection').style.display = 'block';

    el.innerHTML = featured.slice(0, 10).map(p => {
        const disc = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
        return `<div class="fc" onclick="showDetail(${p.id})">
            <div class="sim" style="height:75px;font-size:2.2em">
                ${disc > 0 ? `<span class="sb">${disc}% OFF</span>` : ''}
                <span class="sp">?? Popular</span>
                ${p.image}
            </div>
            <div class="sif" style="padding:7px 9px">
                <div class="sn" style="font-size:.68em">${p.name}</div>
                <div class="spr">
                    <span class="sprc" style="font-size:.82em">${p.price === 0 ? '??FREE' : d.currency + p.price}</span>
                    ${p.mrp > p.price ? `<span class="smrp">${d.currency + p.mrp}</span>` : ''}
                </div>
            </div></div>`;
    }).join('');
}

// ===== SERVICES GRID =====
function renderServices(d, filtered = null) {
    const grid = document.getElementById('serviceGrid');
    let items = filtered || d.products.filter(p => p.active);

    if (currentCat !== 'all' && !filtered) {
        items = items.filter(p => p.catId === currentCat);
    }

    const cart = CartManager.getCart();
    document.getElementById('serviceCount').textContent = items.length + ' services';

    if (!items.length) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:35px;color:var(--td)">
            <div style="font-size:2.5em;margin-bottom:8px">??</div><p>No services found</p></div>`;
        return;
    }

    grid.innerHTML = items.map((p, idx) => {
        const disc = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
        const inCart = cart.find(x => x.id === p.id);

        return `<div class="sc" style="animation-delay:${idx * 0.03}s">
            <div class="sim" onclick="showDetail(${p.id})">
                ${disc > 0 ? `<span class="sb">-${disc}%</span>` : ''}
                ${p.featured ? '<span class="sp">??</span>' : ''}
                <span class="sgv">??? Govt</span>
                ${p.image}
            </div>
            <div class="sif">
                <div class="sn">${p.name}</div>
                <div class="sd">${p.description}</div>
                <div class="sm">
                    ${p.time ? `<span class="stm">?${p.time}</span>` : ''}
                    ${p.docs ? `<span class="sdc">??Docs</span>` : ''}
                </div>
                <div class="spr">
                    <span class="sprc">${p.price === 0 ? '??FREE' : d.currency + p.price}</span>
                    ${p.mrp > p.price ? `<span class="smrp">${d.currency + p.mrp}</span>` : ''}
                    ${disc > 0 ? `<span class="stg">-${disc}%</span>` : ''}
                </div>
                ${inCart ?
                    `<div class="qctr">
                        <button class="qb" onclick="event.stopPropagation();doQty(${p.id},${inCart.qty - 1})">-</button>
                        <span class="qvl">${inCart.qty}</span>
                        <button class="qb" onclick="event.stopPropagation();doQty(${p.id},${inCart.qty + 1})">+</button>
                    </div>` :
                    `<button class="abtn" onclick="event.stopPropagation();doAdd(${p.id})">?? Apply Now</button>`
                }
            </div></div>`;
    }).join('');
}

// ===== FILTER & SEARCH =====
function filterCat(id) {
    currentCat = id;
    isWishView = false;
    const d = DataManager.getData();
    document.getElementById('gridTitle').textContent =
        id === 'all' ? '??? All Government Services' :
        d.categories.find(c => c.id === id)?.name || 'Services';
    renderCategories(d);
    renderServices(d);
}

function showAllServices() {
    filterCat('all');
    document.getElementById('serviceGrid').scrollIntoView({ behavior: 'smooth' });
}

function doSearch() {
    const q = document.getElementById('searchInput').value.toLowerCase().trim();
    const d = DataManager.getData();
    if (!q) {
        document.getElementById('gridTitle').textContent = '??? All Government Services';
        renderServices(d);
        return;
    }
    const filtered = d.products.filter(p =>
        p.active && (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
    document.getElementById('gridTitle').textContent = `?? "${q}"`;
    renderServices(d, filtered);
}

// ===== CART ACTIONS =====
function doAdd(id) {
    const d = DataManager.getData();
    const p = d.products.find(x => x.id === id);
    if (!p) return;
    CartManager.addItem(p);
    updateBadges();
    renderServices(d);
    showToast(p.image + ' ' + p.name + ' added!', 'ok');
}

function doQty(id, qty) {
    CartManager.updateQty(id, qty);
    const d = DataManager.getData();
    updateBadges();
    renderServices(d);
    renderCartItems();
}

function doRemove(id) {
    CartManager.removeItem(id);
    const d = DataManager.getData();
    updateBadges();
    renderServices(d);
    renderCartItems();
    showToast('Removed', 'inf');
}

function openCart() {
    document.getElementById('overlay').classList.add('on');
    document.getElementById('cartDrawer').classList.add('on');
    renderCartItems();
}

function closeCart() {
    document.getElementById('overlay').classList.remove('on');
    document.getElementById('cartDrawer').classList.remove('on');
}

function renderCartItems() {
    const cart = CartManager.getCart();
    const d = DataManager.getData();
    const body = document.getElementById('cartBody');
    const foot = document.getElementById('cartFoot');

    if (!cart.length) {
        body.innerHTML = `<div class="ce"><div class="cei">??</div>
            <h3>No applications yet</h3>
            <p style="margin-top:5px;font-size:.82em">Select a government service</p></div>`;
        foot.style.display = 'none';
        return;
    }

    foot.style.display = 'block';

    body.innerHTML = cart.map(i => `
        <div class="cit">
            <div class="citc">${i.image}</div>
            <div class="citi">
                <div class="citn">${i.name}</div>
                <div class="citp">${i.price === 0 ? 'FREE' : d.currency + i.price + ' × ' + i.qty + ' = ' + d.currency + (i.price * i.qty)}</div>
                <div class="citl">
                    <button class="qb" onclick="doQty(${i.id},${i.qty - 1})">-</button>
                    <span class="qvl">${i.qty}</span>
                    <button class="qb" onclick="doQty(${i.id},${i.qty + 1})">+</button>
                    <button class="citd" onclick="doRemove(${i.id})">???</button>
                </div>
            </div>
        </div>`).join('');

    const t = CartManager.getTotal();
    document.getElementById('cartSummary').innerHTML = `
        <div class="sr"><span>Service Fee</span><span>${d.currency}${t.subtotal}</span></div>
        ${d.serviceCharge > 0 ? `<div class="sr"><span>Processing</span><span>${d.currency}${d.serviceCharge}</span></div>` : ''}
        <div class="sr tot"><span>Total</span><span>${d.currency}${t.total}</span></div>`;
}

// ===== SERVICE DETAIL =====
function showDetail(id) {
    const d = DataManager.getData();
    const p = d.products.find(x => x.id === id);
    if (!p) return;

    const disc = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
    const cart = CartManager.getCart();
    const inCart = cart.find(x => x.id === p.id);
    const stars = '?'.repeat(Math.min(Math.floor(p.rating), 5));

    document.getElementById('modalContent').innerHTML = `
        <div class="sim" style="height:160px;font-size:4.5em;border-radius:22px 22px 0 0">
            <button class="mcl" onclick="closeModal()">?</button>
            ${p.image}
        </div>
        <div style="padding:16px">
            <div style="display:flex;align-items:center;gap:4px;margin-bottom:5px;font-size:.75em">
                <span>${stars}</span><span>${p.rating}</span>
                <span style="color:var(--td)">(${p.reviews} reviews)</span>
            </div>
            <h2 style="font-size:1.12em;margin-bottom:5px">${p.name}</h2>
            <p style="color:var(--td);font-size:.82em;line-height:1.5;margin-bottom:10px">${p.description}</p>

            ${p.time ? `<div style="display:flex;gap:10px;margin-bottom:8px;font-size:.75em">
                <span style="color:var(--inf)">? ${p.time}</span>
                ${p.docs ? '<span style="color:var(--w)">?? Documents needed</span>' : ''}
            </div>` : ''}

            ${p.docs ? `<div style="background:var(--g2);border:1px solid var(--gb);border-radius:10px;padding:10px;margin-bottom:10px;font-size:.75em">
                <strong style="color:var(--a)">?? Required Documents:</strong><br>
                <span style="color:var(--td)">${p.docs}</span>
            </div>` : ''}

            <div class="spr" style="margin-bottom:12px">
                <span class="sprc" style="font-size:1.3em">${p.price === 0 ? '?? FREE' : d.currency + p.price}</span>
                ${p.mrp > p.price ? `<span class="smrp" style="font-size:.95em">${d.currency + p.mrp}</span>` : ''}
                ${disc > 0 ? `<span class="stg" style="font-size:.8em">Save ${disc}%</span>` : ''}
            </div>

            <div style="display:flex;gap:7px">
                ${inCart ?
                    `<div class="qctr" style="flex:1">
                        <button class="qb" onclick="doQty(${p.id},${inCart.qty - 1});showDetail(${p.id})">-</button>
                        <span class="qvl">${inCart.qty}</span>
                        <button class="qb" onclick="doQty(${p.id},${inCart.qty + 1});showDetail(${p.id})">+</button>
                    </div>` :
                    `<button class="abtn" style="flex:1;padding:10px;font-size:.85em" onclick="doAdd(${p.id});showDetail(${p.id})">?? Apply Now</button>`
                }
            </div>

            <div style="margin-top:14px;padding:10px;background:var(--g2);border-radius:10px;border:1px solid var(--gb)">
                <p style="font-size:.72em;color:var(--td);margin-bottom:4px">?? Helpline:</p>
                <p style="font-weight:700;font-size:.9em">${d.phone}</p>
                <a href="https://wa.me/${d.whatsapp}?text=${encodeURIComponent('Namaste! Mujhe ' + p.name + ' ki jankari chahiye.')}"
                   target="_blank" style="display:inline-block;margin-top:5px;color:#25D366;font-weight:600;text-decoration:none;font-size:.82em">
                    ?? WhatsApp pe puche
                </a>
            </div>

            <div class="dev-mark" style="margin-top:14px">
                Developed by <a href="#">${d.developerName}</a>
            </div>
        </div>`;

    document.getElementById('modal').classList.add('on');
}

function closeModal() {
    document.getElementById('modal').classList.remove('on');
}

// ===== CHECKOUT =====
function goCheckout() {
    closeCart();
    if (!CartManager.getCart().length) {
        showToast('Select a service first!', 'no');
        return;
    }
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('checkoutPage').classList.add('on');
    document.getElementById('checkoutForm').style.display = 'block';
    document.getElementById('orderDone').classList.remove('on');
    renderCheckoutItems();
    window.scrollTo(0, 0);
}

function renderCheckoutItems() {
    const cart = CartManager.getCart();
    const d = DataManager.getData();
    const t = CartManager.getTotal();

    document.getElementById('checkoutItems').innerHTML = cart.map(i => `
        <div style="display:flex;align-items:center;gap:7px;padding:6px 0;border-bottom:1px solid var(--gb)">
            <span style="font-size:1.2em">${i.image}</span>
            <div style="flex:1">
                <div style="font-size:.75em;font-weight:600">${i.name}</div>
                <div style="font-size:.63em;color:var(--td)">${i.price === 0 ? 'FREE' : d.currency + i.price + ' × ' + i.qty}</div>
            </div>
            <div style="font-weight:700;color:var(--ok);font-size:.82em">${i.price === 0 ? 'FREE' : d.currency + (i.price * i.qty)}</div>
        </div>`).join('');

    document.getElementById('checkoutSummary').innerHTML = `
        <div class="sr" style="margin-top:7px"><span>Service Fee</span><span>${d.currency}${t.subtotal}</span></div>
        <div class="sr tot"><span>Total</span><span>${d.currency}${t.total}</span></div>`;
}

function selectPayment(el, method) {
    document.querySelectorAll('.pt').forEach(o => o.classList.remove('sel'));
    el.classList.add('sel');
    payMethod = method;
}

function placeOrder() {
    const nm = document.getElementById('custName').value.trim();
    const ph = document.getElementById('custPhone').value.trim();
    const aa = document.getElementById('custAadhaar').value.trim();
    const fa = document.getElementById('custFather').value.trim();
    const ad = document.getElementById('custAddress').value.trim();
    const no = document.getElementById('custNotes').value.trim();

    if (!nm || !ph) {
        showToast('Name aur Phone zaroori hai!', 'no');
        return;
    }
    if (ph.length < 10) {
        showToast('Valid phone number daalein!', 'no');
        return;
    }

    const cart = CartManager.getCart();
    const d = DataManager.getData();
    const t = CartManager.getTotal();
    const pNames = { cash: 'Cash', upi: 'UPI/GPay', bank: 'Bank Transfer' };

    // Build WhatsApp Message
    let msg = `??? *${d.shopName || d.centerName}*\n`;
    msg += `?? *New Application*\n`;
    msg += `???????????????\n`;
    msg += `?? *Ref:* #${Date.now()}\n`;
    msg += `?? *Name:* ${nm}\n`;
    msg += `?? *Phone:* ${ph}\n`;
    if (fa) msg += `?? *Father:* ${fa}\n`;
    if (aa) msg += `?? *Aadhaar:* ${aa}\n`;
    if (ad) msg += `?? *Address:* ${ad}\n`;
    if (no) msg += `?? *Note:* ${no}\n`;
    msg += `???????????????\n`;
    msg += `?? *Services:*\n`;
    cart.forEach((i, n) => {
        msg += `${n + 1}. ${i.image} ${i.name}\n`;
        msg += `   ${i.price === 0 ? 'FREE' : d.currency + i.price + ' × ' + i.qty + ' = ' + d.currency + (i.price * i.qty)}\n`;
    });
    msg += `???????????????\n`;
    msg += `*?? Total: ${d.currency}${t.total}*\n`;
    msg += `?? Payment: ${pNames[payMethod]}\n`;
    msg += `???????????????\n`;
    msg += d.footerText + '\n';
    msg += `\n_Developed by ${d.developerName}_`;

    const orderId = DataManager.addOrder({
        customer: { name: nm, phone: ph, aadhaar: aa, father: fa, address: ad, notes: no },
        items: cart,
        totals: t,
        payment: payMethod
    });

    window.open(`https://wa.me/${d.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');

    CartManager.clear();
    updateBadges();
    document.getElementById('checkoutForm').style.display = 'none';
    document.getElementById('orderDone').classList.add('on');
    document.getElementById('orderIdDisplay').textContent = 'Reference: #' + orderId;
    showToast('?? Application submitted!', 'ok');
}

function goHome() {
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('checkoutPage').classList.remove('on');
    renderApp();
    window.scrollTo(0, 0);
}

// ===== CONTACT =====
function showContact() {
    const d = DataManager.getData();
    document.getElementById('modalContent').innerHTML = `
        <div style="padding:22px 16px;text-align:center">
            <button class="mcl" onclick="closeModal()" style="position:absolute;top:10px;right:10px">?</button>
            <div style="font-size:3.2em;margin-bottom:10px;animation:float 3s infinite">${d.logoEmoji}</div>
            <h2 style="margin-bottom:14px;background:linear-gradient(135deg,var(--p),var(--a));-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:1.1em">
                Contact Us
            </h2>
            <div style="text-align:left">
                <div class="bx" style="margin-bottom:8px;padding:12px">
                    <div style="display:flex;align-items:center;gap:8px">
                        <span style="font-size:1.2em">${d.logoEmoji}</span>
                        <div>
                            <div style="font-weight:700;font-size:.85em">${d.centerName}</div>
                            <div style="font-size:.63em;color:var(--td)">${d.ownerName} | ${d.centerCode}</div>
                        </div>
                    </div>
                </div>
                <a href="tel:${d.phone}" style="text-decoration:none">
                    <div class="bx" style="margin-bottom:6px;padding:10px;display:flex;align-items:center;gap:8px">
                        <span style="font-size:1.1em">??</span>
                        <div><div style="font-size:.58em;color:var(--td)">Phone</div>
                        <div style="color:var(--p);font-weight:600;font-size:.85em">${d.phone}</div></div>
                    </div>
                </a>
                ${d.altPhone ? `
                <a href="tel:${d.altPhone}" style="text-decoration:none">
                    <div class="bx" style="margin-bottom:6px;padding:10px;display:flex;align-items:center;gap:8px">
                        <span style="font-size:1.1em">??</span>
                        <div><div style="font-size:.58em;color:var(--td)">Alt Phone</div>
                        <div style="color:var(--p);font-weight:600;font-size:.85em">${d.altPhone}</div></div>
                    </div>
                </a>` : ''}
                <a href="https://wa.me/${d.whatsapp}" target="_blank" style="text-decoration:none">
                    <div class="bx" style="margin-bottom:6px;padding:10px;display:flex;align-items:center;gap:8px">
                        <span style="font-size:1.1em">??</span>
                        <div><div style="font-size:.58em;color:var(--td)">WhatsApp</div>
                        <div style="color:#25D366;font-weight:600;font-size:.85em">Chat Now</div></div>
                    </div>
                </a>
                <a href="mailto:${d.email}" style="text-decoration:none">
                    <div class="bx" style="margin-bottom:6px;padding:10px;display:flex;align-items:center;gap:8px">
                        <span style="font-size:1.1em">??</span>
                        <div><div style="font-size:.58em;color:var(--td)">Email</div>
                        <div style="color:var(--p);font-weight:600;font-size:.85em">${d.email}</div></div>
                    </div>
                </a>
                <div class="bx" style="padding:10px;display:flex;align-items:center;gap:8px">
                    <span style="font-size:1.1em">??</span>
                    <div><div style="font-size:.58em;color:var(--td)">Address</div>
                    <div style="font-weight:600;font-size:.73em;line-height:1.4">${d.address}</div></div>
                </div>
            </div>
            <div class="dev-mark" style="margin-top:14px">
                Developed by <a href="#">${d.developerName}</a> | v${d.appVersion}
            </div>
        </div>`;
    document.getElementById('modal').classList.add('on');
}

// ===== WISHLIST =====
function showWishlist() {
    isWishView = !isWishView;
    const d = DataManager.getData();
    if (isWishView) {
        const ids = WishlistManager.getList();
        const items = d.products.filter(p => ids.includes(p.id) && p.active);
        document.getElementById('gridTitle').textContent = '?? Saved Services';
        renderServices(d, items);
    } else {
        document.getElementById('gridTitle').textContent = '??? All Government Services';
        currentCat = 'all';
        renderServices(d);
    }
}

// ===== BADGES =====
function updateBadges() {
    const cart = CartManager.getCart();
    const wish = WishlistManager.getList();
    const cb = document.getElementById('cartBadge');
    const wb = document.getElementById('wishBadge');
    const total = cart.reduce((s, i) => s + i.qty, 0);

    cb.style.display = total > 0 ? 'flex' : 'none';
    cb.textContent = total;
    wb.style.display = wish.length > 0 ? 'flex' : 'none';
    wb.textContent = wish.length;
}

// ===== NAV =====
function setNav(el) {
    document.querySelectorAll('.ni').forEach(n => n.classList.remove('on'));
    el.classList.add('on');
}

// ===== TOAST =====
function showToast(msg, type) {
    type = type || 'inf';
    const container = document.getElementById('toastWrap');
    const toast = document.createElement('div');
    toast.className = 'ts ' + type;
    const icons = { ok: '?', no: '?', inf: '??' };
    toast.innerHTML = '<span>' + (icons[type] || '??') + '</span><span>' + msg + '</span>';
    container.appendChild(toast);
    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s';
        setTimeout(function () { toast.remove(); }, 300);
    }, 2500);
}

// Modal close on overlay
document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'modal') closeModal();
});
