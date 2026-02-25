/*
 * Admin Panel - Grahak Seva Kendra
 * Developer: Ashutosh Saini
 * Note: Admin CANNOT change Center Name, Logo, Shop Name
 */

// ===== LOGIN =====
function adminLogin() {
    const pass = document.getElementById('adminPass').value;
    if (DataManager.verifyAdmin(pass)) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDash').style.display = 'block';
        sessionStorage.setItem('gsk_admin', '1');
        loadDashboard();
        showToast('Welcome Admin! ??', 'ok');
    } else {
        showToast('Wrong password!', 'no');
    }
}

function adminLogout() {
    sessionStorage.removeItem('gsk_admin');
    location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    DataManager.init();
    if (sessionStorage.getItem('gsk_admin') === '1') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDash').style.display = 'block';
        loadDashboard();
    }
});

// ===== TABS =====
function switchTab(name, btn) {
    document.querySelectorAll('.atab').forEach(t => t.classList.remove('on'));
    document.querySelectorAll('.apanel').forEach(p => p.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('panel-' + name).classList.add('on');

    switch (name) {
        case 'dash': loadDashboard(); break;
        case 'info': loadInfo(); break;
        case 'services': loadServices(); break;
        case 'cats': loadCategories(); break;
        case 'orders': loadOrders(); break;
        case 'banners': loadBanners(); break;
        case 'theme': loadTheme(); break;
        case 'settings': break;
    }
}

// ===== DASHBOARD =====
function loadDashboard() {
    const d = DataManager.getData();
    const ts = d.products.filter(p => p.active).length;
    const to = d.orders.length;
    const tr = d.orders.reduce((s, o) => s + (o.totals ? o.totals.total : 0), 0);
    const po = d.orders.filter(o => o.status === 'pending').length;

    document.getElementById('statsGrid').innerHTML = `
        <div class="stat-card"><div class="stat-ico">??</div><div class="stat-val">${ts}</div><div class="stat-lbl">Services</div></div>
        <div class="stat-card"><div class="stat-ico">??</div><div class="stat-val">${to}</div><div class="stat-lbl">Applications</div></div>
        <div class="stat-card"><div class="stat-ico">??</div><div class="stat-val">${d.currency}${tr}</div><div class="stat-lbl">Revenue</div></div>
        <div class="stat-card"><div class="stat-ico">?</div><div class="stat-val" style="color:var(--w)">${po}</div><div class="stat-lbl">Pending</div></div>`;

    // Developer info display
    document.getElementById('devInfoDisplay').innerHTML = `
        <div style="font-size:0.72em;color:var(--td);text-align:center;margin-top:10px">
            App by: <strong style="color:var(--p)">${d.developerName}</strong> | v${d.appVersion}
        </div>`;

    const recent = d.orders.slice(0, 5);
    document.getElementById('recentOrders').innerHTML = recent.length === 0 ?
        '<p style="text-align:center;color:var(--td);padding:18px">No applications yet</p>' :
        recent.map(o => `
            <div style="background:var(--g2);border:1px solid var(--gb);border-radius:var(--rs);padding:10px;margin-bottom:6px">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                    <span style="font-weight:700;color:var(--p);font-size:.82em">#${o.id}</span>
                    <span style="font-size:.68em;color:var(--td)">${o.date}</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <span style="font-size:.82em">${o.customer?.name || 'N/A'}</span>
                    <span class="ord-sts ${o.status}">${o.status.toUpperCase()}</span>
                </div>
                <div style="font-weight:700;color:var(--ok);font-size:.85em;margin-top:3px">${d.currency}${o.totals?.total || 0}</div>
            </div>`).join('');
}

// ===== CENTER INFO (Admin Limited) =====
function loadInfo() {
    const d = DataManager.getData();

    // Show locked notice
    document.getElementById('lockNotice').innerHTML = `
        <div class="lock-notice">
            ?? Center Name, Logo aur Shop Name sirf Developer (${d.developerName}) hi change kar sakta hai.
            Contact: ${d.developerContact || 'Developer se sampark kare'}
        </div>`;

    // Locked fields (read only)
    document.getElementById('infoName').value = d.centerName;
    document.getElementById('infoName').disabled = true;
    document.getElementById('infoSub').value = d.centerSubtitle;
    document.getElementById('infoSub').disabled = true;
    document.getElementById('infoLogo').value = d.logoEmoji;
    document.getElementById('infoLogo').disabled = true;

    // Admin editable fields
    document.getElementById('infoOwner').value = d.ownerName;
    document.getElementById('infoCode').value = d.centerCode;
    document.getElementById('infoPhone').value = d.phone;
    document.getElementById('infoAltPhone').value = d.altPhone;
    document.getElementById('infoEmail').value = d.email;
    document.getElementById('infoWhatsapp').value = d.whatsapp;
    document.getElementById('infoUpi').value = d.upiId;
    document.getElementById('infoAddress').value = d.address;
    document.getElementById('infoWelcome').value = d.welcomeMessage;
    document.getElementById('infoFooter').value = d.footerText;
    document.getElementById('infoCurrency').value = d.currency;
    document.getElementById('infoSC').value = d.serviceCharge || 0;
}

function saveInfo() {
    const d = DataManager.getData();
    // Only save admin-allowed fields
    d.ownerName = document.getElementById('infoOwner').value;
    d.centerCode = document.getElementById('infoCode').value;
    d.phone = document.getElementById('infoPhone').value;
    d.altPhone = document.getElementById('infoAltPhone').value;
    d.email = document.getElementById('infoEmail').value;
    d.whatsapp = document.getElementById('infoWhatsapp').value;
    d.upiId = document.getElementById('infoUpi').value;
    d.address = document.getElementById('infoAddress').value;
    d.welcomeMessage = document.getElementById('infoWelcome').value;
    d.footerText = document.getElementById('infoFooter').value;
    d.currency = document.getElementById('infoCurrency').value;
    d.serviceCharge = parseInt(document.getElementById('infoSC').value) || 0;
    // centerName, logo, shopName NOT saved - locked by developer
    DataManager.saveData(d);
    showToast('Saved! ?', 'ok');
}

// ===== SERVICES =====
function loadServices() {
    const d = DataManager.getData();
    const sel = document.getElementById('svcCatSelect');
    sel.innerHTML = d.categories.filter(c => c.active).map(c =>
        '<option value="' + c.id + '">' + c.icon + ' ' + c.name + '</option>'
    ).join('');

    document.getElementById('totalSvcCount').textContent = d.products.length;

    document.getElementById('svcList').innerHTML = d.products.map(p => {
        const cat = d.categories.find(c => c.id === p.catId);
        return `<div class="aitem" style="opacity:${p.active ? 1 : 0.5}">
            <div class="ai-ico">${p.image}</div>
            <div class="ai-info">
                <h4>${p.name} ${p.featured ? '?' : ''}</h4>
                <p>${p.price === 0 ? 'FREE' : d.currency + p.price} | ${cat?.icon || ''} ${cat?.name?.replace(cat?.icon, '').trim() || ''}</p>
            </div>
            <div class="ai-acts">
                <button class="bbtn ${p.active ? 'w' : 'ok'}" onclick="toggleService(${p.id})">${p.active ? '??' : '??'}</button>
                <button class="bbtn pr" onclick="editService(${p.id})">??</button>
                <button class="bbtn no" onclick="deleteService(${p.id})">???</button>
            </div>
        </div>`;
    }).join('');
}

function addService() {
    const catId = parseInt(document.getElementById('svcCatSelect').value);
    const name = document.getElementById('svcName').value.trim();
    const icon = document.getElementById('svcIcon').value || '??';
    const price = parseInt(document.getElementById('svcPrice').value) || 0;
    const mrp = parseInt(document.getElementById('svcMrp').value) || price;
    const desc = document.getElementById('svcDesc').value.trim();
    const time = document.getElementById('svcTime').value.trim();
    const docs = document.getElementById('svcDocs').value.trim();
    const feat = document.getElementById('svcFeatured').checked;

    if (!name) { showToast('Name required!', 'no'); return; }

    DataManager.addProduct({
        catId, name, image: icon, price, mrp, stock: 999,
        description: desc || name, time: time, docs: docs,
        rating: 4.5, reviews: 0, featured: feat, active: true
    });

    // Clear form
    ['svcName', 'svcIcon', 'svcPrice', 'svcMrp', 'svcDesc', 'svcTime', 'svcDocs'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('svcFeatured').checked = false;

    loadServices();
    showToast('Service added! ?', 'ok');
}

function toggleService(id) {
    const d = DataManager.getData();
    const p = d.products.find(x => x.id === id);
    if (p) { p.active = !p.active; DataManager.saveData(d); loadServices(); }
}

function editService(id) {
    const d = DataManager.getData();
    const p = d.products.find(x => x.id === id);
    if (!p) return;

    const n = prompt('Service Name:', p.name); if (n === null) return;
    const pr = prompt('Price:', p.price);
    const mr = prompt('MRP:', p.mrp);
    const ds = prompt('Description:', p.description);
    const tm = prompt('Time:', p.time || '');
    const dc = prompt('Documents:', p.docs || '');
    const ic = prompt('Emoji:', p.image);

    DataManager.updateProduct(id, {
        name: n || p.name, price: parseInt(pr) || p.price,
        mrp: parseInt(mr) || p.mrp, description: ds || p.description,
        time: tm !== null ? tm : p.time, docs: dc !== null ? dc : p.docs,
        image: ic || p.image
    });
    loadServices();
    showToast('Updated! ?', 'ok');
}

function deleteService(id) {
    if (confirm('Delete this service?')) {
        DataManager.deleteProduct(id);
        loadServices();
        showToast('Deleted!', 'inf');
    }
}

// ===== CATEGORIES =====
function loadCategories() {
    const d = DataManager.getData();
    document.getElementById('catList').innerHTML = d.categories.map(c => `
        <div class="aitem" style="opacity:${c.active ? 1 : 0.5}">
            <div class="ai-ico">${c.icon}</div>
            <div class="ai-info">
                <h4>${c.name}</h4>
                <p>${d.products.filter(p => p.catId === c.id).length} services</p>
            </div>
            <div class="ai-acts">
                <button class="bbtn ${c.active ? 'w' : 'ok'}" onclick="toggleCat(${c.id})">${c.active ? '??' : '??'}</button>
                <button class="bbtn pr" onclick="editCat(${c.id})">??</button>
                <button class="bbtn no" onclick="deleteCat(${c.id})">???</button>
            </div>
        </div>`).join('');
}

function addCat() {
    const icon = document.getElementById('newCatIcon').value || '??';
    const name = document.getElementById('newCatName').value.trim();
    if (!name) { showToast('Enter name!', 'no'); return; }
    const d = DataManager.getData();
    d.categories.push({ id: Date.now(), name: icon + ' ' + name, icon, active: true });
    DataManager.saveData(d);
    document.getElementById('newCatIcon').value = '';
    document.getElementById('newCatName').value = '';
    loadCategories();
    showToast('Added! ?', 'ok');
}

function toggleCat(id) {
    const d = DataManager.getData();
    const c = d.categories.find(x => x.id === id);
    if (c) { c.active = !c.active; DataManager.saveData(d); loadCategories(); }
}

function editCat(id) {
    const d = DataManager.getData();
    const c = d.categories.find(x => x.id === id);
    if (!c) return;
    const ni = prompt('Icon:', c.icon);
    const nn = prompt('Name:', c.name);
    if (nn === null) return;
    c.icon = ni || c.icon;
    c.name = nn || c.name;
    DataManager.saveData(d);
    loadCategories();
    showToast('Updated!', 'ok');
}

function deleteCat(id) {
    if (confirm('Delete?')) {
        const d = DataManager.getData();
        d.categories = d.categories.filter(c => c.id !== id);
        DataManager.saveData(d);
        loadCategories();
    }
}

// ===== ORDERS =====
function loadOrders() {
    const d = DataManager.getData();
    const el = document.getElementById('allOrdersList');
    if (!d.orders.length) {
        el.innerHTML = '<p style="text-align:center;color:var(--td);padding:18px">No applications</p>';
        return;
    }
    el.innerHTML = d.orders.map(o => `
        <div style="background:var(--g2);border:1px solid var(--gb);border-radius:var(--rs);padding:10px;margin-bottom:6px">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-weight:700;color:var(--p);font-size:.82em">#${o.id}</span>
                <span style="font-size:.68em;color:var(--td)">${o.date}</span>
            </div>
            <div style="margin:5px 0;font-size:.78em">
                <strong>?? ${o.customer?.name || 'N/A'}</strong><br>
                <span style="color:var(--td);font-size:.9em">?? ${o.customer?.phone || ''} ${o.customer?.aadhaar ? '| Aadhaar: ' + o.customer.aadhaar : ''}</span>
            </div>
            <div style="font-size:.72em;margin:4px 0;color:var(--td)">
                ${o.items ? o.items.map(i => i.image + ' ' + i.name).join(', ') : ''}
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:5px">
                <span style="font-weight:700;color:var(--ok);font-size:.85em">${d.currency}${o.totals?.total || 0}</span>
                <div style="display:flex;gap:4px;align-items:center">
                    <span class="ord-sts ${o.status}">${o.status.toUpperCase()}</span>
                    <select onchange="updateOrderStatus(${o.id},this.value)"
                        style="background:var(--g2);border:1px solid var(--gb);color:var(--t);padding:3px 5px;border-radius:5px;font-size:.68em">
                        <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="confirmed" ${o.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="completed" ${o.status === 'completed' ? 'selected' : ''}>Completed</option>
                        <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </div>
            </div>
        </div>`).join('');
}

function updateOrderStatus(id, status) {
    const d = DataManager.getData();
    const o = d.orders.find(x => x.id === id);
    if (o) {
        o.status = status;
        DataManager.saveData(d);
        loadOrders();
        showToast('#' + id + ' ? ' + status.toUpperCase(), 'ok');
    }
}

// ===== BANNERS =====
function loadBanners() {
    const d = DataManager.getData();
    document.getElementById('bannerList').innerHTML = d.banners.map(b => `
        <div class="aitem" style="opacity:${b.active ? 1 : 0.5}">
            <div style="width:5px;height:32px;border-radius:3px;background:var(--p);flex-shrink:0"></div>
            <div class="ai-info"><h4 style="font-size:.75em">${b.text}</h4></div>
            <div class="ai-acts">
                <button class="bbtn ${b.active ? 'w' : 'ok'}" onclick="toggleBanner(${b.id})">${b.active ? '??' : '??'}</button>
                <button class="bbtn no" onclick="deleteBanner(${b.id})">???</button>
            </div>
        </div>`).join('');
}

function addBanner() {
    const text = document.getElementById('newBannerText').value.trim();
    if (!text) { showToast('Enter text!', 'no'); return; }
    const d = DataManager.getData();
    d.banners.push({ id: Date.now(), text, active: true });
    DataManager.saveData(d);
    document.getElementById('newBannerText').value = '';
    loadBanners();
    showToast('Added!', 'ok');
}

function toggleBanner(id) {
    const d = DataManager.getData();
    const b = d.banners.find(x => x.id === id);
    if (b) { b.active = !b.active; DataManager.saveData(d); loadBanners(); }
}

function deleteBanner(id) {
    const d = DataManager.getData();
    d.banners = d.banners.filter(b => b.id !== id);
    DataManager.saveData(d);
    loadBanners();
}

// ===== THEME =====
function loadTheme() {
    const d = DataManager.getData();
    document.getElementById('thP').value = d.theme.primary;
    document.getElementById('thS').value = d.theme.secondary;
    document.getElementById('thA').value = d.theme.accent;
    document.getElementById('thB').value = d.theme.bg;
    document.getElementById('thC').value = d.theme.cardBg;
    document.getElementById('thT').value = d.theme.textColor;
}

function saveTheme() {
    const d = DataManager.getData();
    d.theme = {
        primary: document.getElementById('thP').value,
        secondary: document.getElementById('thS').value,
        accent: document.getElementById('thA').value,
        bg: document.getElementById('thB').value,
        cardBg: document.getElementById('thC').value,
        textColor: document.getElementById('thT').value
    };
    DataManager.saveData(d);
    showToast('Theme saved! ??', 'ok');
}

function quickTheme(name) {
    const themes = {
        saffron: { primary: '#ff6b35', secondary: '#e8530e', accent: '#f7c948', bg: '#0a1628', cardBg: '#142240', textColor: '#ffffff' },
        navy: { primary: '#1e3a5f', secondary: '#0d2137', accent: '#4fc3f7', bg: '#0a0e1a', cardBg: '#0f1a2e', textColor: '#ffffff' },
        emerald: { primary: '#138808', secondary: '#0d6b06', accent: '#66bb6a', bg: '#0a1a0e', cardBg: '#0f2a14', textColor: '#ffffff' },
        royal: { primary: '#6a1b9a', secondary: '#4a148c', accent: '#ce93d8', bg: '#12001a', cardBg: '#1a0028', textColor: '#ffffff' },
        tricolor: { primary: '#FF9933', secondary: '#138808', accent: '#000080', bg: '#0a1628', cardBg: '#142240', textColor: '#ffffff' },
        gold: { primary: '#b8860b', secondary: '#8b6914', accent: '#ffd700', bg: '#1a1a2e', cardBg: '#16213e', textColor: '#ffffff' }
    };
    const t = themes[name];
    if (!t) return;
    const d = DataManager.getData();
    d.theme = t;
    DataManager.saveData(d);
    loadTheme();
    showToast(name + ' theme applied!', 'ok');
}

// ===== ADMIN PASSWORD =====
function changeAdminPass() {
    const d = DataManager.getData();
    const old = document.getElementById('oldAdminPass').value;
    const np = document.getElementById('newAdminPass').value;
    const cp = document.getElementById('confirmAdminPass').value;

    if (old !== d.adminPassword) { showToast('Wrong current password!', 'no'); return; }
    if (!np || np.length < 4) { showToast('Min 4 characters!', 'no'); return; }
    if (np !== cp) { showToast('Passwords dont match!', 'no'); return; }

    d.adminPassword = np;
    DataManager.saveData(d);
    ['oldAdminPass', 'newAdminPass', 'confirmAdminPass'].forEach(id => document.getElementById(id).value = '');
    showToast('Password changed! ??', 'ok');
}

// ===== TOAST =====
function showToast(msg, type) {
    type = type || 'inf';
    const c = document.getElementById('toastWrap');
    const t = document.createElement('div');
    t.className = 'ts ' + type;
    const icons = { ok: '?', no: '?', inf: '??' };
    t.innerHTML = '<span>' + (icons[type] || '??') + '</span><span>' + msg + '</span>';
    c.appendChild(t);
    setTimeout(function () {
        t.style.opacity = '0'; t.style.transform = 'translateX(100%)';
        t.style.transition = 'all .3s';
        setTimeout(function () { t.remove(); }, 300);
    }, 2500);
}
