/*
 * DEVELOPER PANEL - Ashutosh Saini
 * This panel has FULL control over the app
 * Admin CANNOT access these settings
 */

// ===== DEV LOGIN =====
function devLogin() {
    const pass = document.getElementById('devPass').value;
    if (DataManager.verifyDev(pass)) {
        document.getElementById('devLoginScreen').style.display = 'none';
        document.getElementById('devDashboard').style.display = 'block';
        sessionStorage.setItem('gsk_dev', '1');
        loadDevDash();
        showToast('Welcome Developer! ??', 'ok');
    } else {
        showToast('Wrong developer password!', 'no');
    }
}

function devLogout() {
    sessionStorage.removeItem('gsk_dev');
    location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    DataManager.init();
    if (sessionStorage.getItem('gsk_dev') === '1') {
        document.getElementById('devLoginScreen').style.display = 'none';
        document.getElementById('devDashboard').style.display = 'block';
        loadDevDash();
    }
});

// ===== DEV TABS =====
function devTab(name, btn) {
    document.querySelectorAll('.atab').forEach(t => t.classList.remove('on'));
    document.querySelectorAll('.apanel').forEach(p => p.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('dev-' + name).classList.add('on');

    switch (name) {
        case 'overview': loadDevDash(); break;
        case 'branding': loadBranding(); break;
        case 'controls': loadControls(); break;
        case 'data': loadDataPanel(); break;
        case 'security': break;
    }
}

// ===== OVERVIEW =====
function loadDevDash() {
    const d = DataManager.getData();
    const dev = DataManager.getDevData();

    document.getElementById('devOverview').innerHTML = `
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-ico">??</div><div class="stat-val">${d.products.filter(p => p.active).length}</div><div class="stat-lbl">Services</div></div>
            <div class="stat-card"><div class="stat-ico">??</div><div class="stat-val">${d.orders.length}</div><div class="stat-lbl">Orders</div></div>
            <div class="stat-card"><div class="stat-ico">??</div><div class="stat-val">${d.currency}${d.orders.reduce((s, o) => s + (o.totals?.total || 0), 0)}</div><div class="stat-lbl">Revenue</div></div>
            <div class="stat-card"><div class="stat-ico">??</div><div class="stat-val">${d.categories.filter(c => c.active).length}</div><div class="stat-lbl">Categories</div></div>
        </div>

        <div class="bx">
            <h3>?? Developer Info</h3>
            <div style="font-size:.82em;color:var(--td);line-height:1.8">
                <strong style="color:var(--t)">Developer:</strong> ${dev.developerName}<br>
                <strong style="color:var(--t)">App Version:</strong> ${dev.appVersion}<br>
                <strong style="color:var(--t)">Center Name:</strong> ${dev.centerName}<br>
                <strong style="color:var(--t)">Shop Name:</strong> ${dev.shopName}<br>
                <strong style="color:var(--t)">Logo:</strong> ${dev.logoEmoji}<br>
                <strong style="color:var(--t)">Admin Password:</strong> ${d.adminPassword}<br>
                <strong style="color:var(--t)">Admin Can Change Name:</strong> ${dev.adminCanChangeName ? '? Yes' : '? No'}<br>
                <strong style="color:var(--t)">Google Drive URL:</strong> ${dev.googleDriveDataUrl || 'Not set'}
            </div>
        </div>`;
}

// ===== BRANDING (Dev Only) =====
function loadBranding() {
    const dev = DataManager.getDevData();
    document.getElementById('devCenterName').value = dev.centerName;
    document.getElementById('devSubtitle').value = dev.centerSubtitle;
    document.getElementById('devShopName').value = dev.shopName;
    document.getElementById('devLogo').value = dev.logoEmoji;
    document.getElementById('devName').value = dev.developerName;
    document.getElementById('devContact').value = dev.developerContact;
    document.getElementById('devVersion').value = dev.appVersion;
}

function saveBranding() {
    const dev = DataManager.getDevData();
    dev.centerName = document.getElementById('devCenterName').value;
    dev.centerSubtitle = document.getElementById('devSubtitle').value;
    dev.shopName = document.getElementById('devShopName').value;
    dev.logoEmoji = document.getElementById('devLogo').value;
    dev.developerName = document.getElementById('devName').value;
    dev.developerContact = document.getElementById('devContact').value;
    dev.appVersion = document.getElementById('devVersion').value;
    DataManager.saveDevData(dev);
    showToast('Branding saved! ?', 'ok');
}

// ===== CONTROLS =====
function loadControls() {
    const dev = DataManager.getDevData();
    const d = DataManager.getData();

    document.getElementById('ctrlAdminPass').value = d.adminPassword;
    document.getElementById('ctrlAdminName').checked = dev.adminCanChangeName;
    document.getElementById('ctrlAdminLogo').checked = dev.adminCanChangeLogo;
}

function saveControls() {
    const dev = DataManager.getDevData();
    const d = DataManager.getData();

    d.adminPassword = document.getElementById('ctrlAdminPass').value;
    dev.adminCanChangeName = document.getElementById('ctrlAdminName').checked;
    dev.adminCanChangeLogo = document.getElementById('ctrlAdminLogo').checked;

    DataManager.saveData(d);
    DataManager.saveDevData(dev);
    showToast('Controls saved! ?', 'ok');
}

// ===== DATA MANAGEMENT =====
function loadDataPanel() {
    const dev = DataManager.getDevData();
    document.getElementById('driveUrl').value = dev.googleDriveDataUrl || '';
}

function saveDriveUrl() {
    const dev = DataManager.getDevData();
    dev.googleDriveDataUrl = document.getElementById('driveUrl').value.trim();
    DataManager.saveDevData(dev);
    showToast('Drive URL saved!', 'ok');
}

function exportDataJSON() {
    DataManager.exportJSON();
    showToast('Data exported! ??', 'ok');
}

function importDataJSON() {
    const file = document.getElementById('importFile').files[0];
    if (!file) { showToast('Select a file!', 'no'); return; }
    const reader = new FileReader();
    reader.onload = function (e) {
        if (DataManager.importJSON(e.target.result)) {
            showToast('Data imported! ?', 'ok');
            loadDevDash();
        } else {
            showToast('Invalid file!', 'no');
        }
    };
    reader.readAsText(file);
}

async function loadFromDrive() {
    const url = document.getElementById('driveUrl').value.trim();
    if (!url) { showToast('Enter Drive URL!', 'no'); return; }
    showToast('Loading from Drive...', 'inf');
    const result = await DataManager.loadFromDrive(url);
    if (result) {
        showToast('Data loaded from Drive! ?', 'ok');
        loadDevDash();
    } else {
        showToast('Failed to load!', 'no');
    }
}

function resetAllData() {
    if (confirm('?? RESET ALL DATA? This cannot be undone!')) {
        if (confirm('Are you REALLY sure? Everything will be deleted!')) {
            DataManager.resetAll();
            showToast('All data reset!', 'inf');
            loadDevDash();
        }
    }
}

// ===== DEV PASSWORD CHANGE =====
function changeDevPass() {
    const old = document.getElementById('oldDevPass').value;
    const np = document.getElementById('newDevPass').value;
    const cp = document.getElementById('confirmDevPass').value;

    if (!DataManager.verifyDev(old)) { showToast('Wrong current password!', 'no'); return; }
    if (!np || np.length < 6) { showToast('Min 6 characters!', 'no'); return; }
    if (np !== cp) { showToast('Passwords dont match!', 'no'); return; }

    const dev = DataManager.getDevData();
    dev.developerPassword = np;
    DataManager.saveDevData(dev);
    ['oldDevPass', 'newDevPass', 'confirmDevPass'].forEach(id => document.getElementById(id).value = '');
    showToast('Developer password changed! ??', 'ok');
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
