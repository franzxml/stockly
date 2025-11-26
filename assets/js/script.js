// --- 1. DATA DUMMY (State) ---
let productData = [
    { name: 'Kopi Susu', category: 'Minuman', price: '20000', stock: 100 },
    { name: 'Teh Hijau', category: 'Minuman', price: '15000', stock: 80 },
    { name: 'Gula Pasir', category: 'Bahan Makanan', price: '12000', stock: 50 },
    { name: 'Tepung Terigu', category: 'Bahan Makanan', price: '10000', stock: 60 },
    { name: 'Sabun Mandi', category: 'Perlengkapan', price: '18000', stock: 40 }
];

let categoryData = [
    { id: '089', name: 'Makanan', count: 112, quota: 150 },
    { id: '090', name: 'Minuman', count: 103, quota: 120 },
    { id: '091', name: 'Perlengkapan', count: 90, quota: 100 }
];

let adminData = [
    { name: 'Viona', email: 'viokeren123@gmail.com', role: 'Kelola Admin', status: 'Aktif', id: '1200' },
    { name: 'Nabila', email: 'bilakeren12@gmail.com', role: 'Kelola Produk', status: 'Aktif', id: '1300' },
    { name: 'Frans', email: 'franskeren@gmail.com', role: 'Kelola Pesanan', status: 'Aktif', id: '1400' }
];

let stockHistory = [
    { date: '2025-11-26', action: 'Tambah', product: 'Gula Pasir', qty: '+2', user: 'Admin' },
    { date: '2025-11-25', action: 'Kurang', product: 'Kopi Hitam', qty: '-5', user: 'Admin' }
];

let reportData = [
    { product: 'Gula Pasir', stock: 3, value: 'Rp30.000' },
    { product: 'Kopi Hitam', stock: 2, value: 'Rp7.000' },
    { product: 'Minyak Goreng', stock: 2, value: 'Rp69.000' }
];

// --- 2. LOGIKA UMUM & NAVIGASI ---

// Handle Login Form (index.html)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'dashboard.html';
    });
}

// Fungsi Pindah Halaman (dashboard.html)
function loadPage(pageName) {
    const contentDiv = document.getElementById('main-content');
    
    // Set Sidebar Active
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    const activeMenu = document.getElementById(`menu-${pageName}`);
    if (activeMenu) activeMenu.classList.add('active');

    // Routing
    if (pageName === 'produk') renderProduk(contentDiv);
    else if (pageName === 'kategori') renderKategori(contentDiv);
    else if (pageName === 'stok') renderStok(contentDiv);
    else if (pageName === 'admin') renderAdmin(contentDiv);
    else if (pageName === 'laporan') renderLaporan(contentDiv);
}

// --- 3. RENDER FUNCTIONS ---

function renderProduk(container) {
    const rows = productData.map(prod => `
        <tr>
            <td>${prod.name}</td>
            <td>${prod.category}</td>
            <td>Rp ${parseInt(prod.price).toLocaleString('id-ID')}</td>
            <td>${prod.stock}</td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="page-header"><h2>Manajemen Produk</h2></div>
        <div class="toolbar">
            <div class="search-bar">
                <input type="text" placeholder="Cari Produk...">
                <i class="ph-bold ph-magnifying-glass"></i>
            </div>
            <button class="btn-add" onclick="openModal('modal-tambah-produk')">
                <i class="ph-bold ph-plus"></i> Tambah Produk
            </button>
        </div>
        <div class="data-card">
            <table class="data-table">
                <thead><tr><th>Nama Produk</th><th>Kategori</th><th>Harga</th><th>Stok</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

function renderKategori(container) {
    const rows = categoryData.map(cat => `
        <tr>
            <td><input type="checkbox" class="custom-checkbox"></td>
            <td>${cat.name}</td><td>${cat.count}</td><td>${cat.id}</td><td>${cat.quota}</td>
            <td class="action-icons">
                <button class="icon-btn"><i class="ph-bold ph-eye"></i></button>
                <button class="icon-btn"><i class="ph-bold ph-pencil-simple"></i></button>
                <button class="icon-btn"><i class="ph-bold ph-trash"></i></button>
            </td>
        </tr>
    `).join('');
    container.innerHTML = `
        <div class="page-header"><h2>Manajemen Kategori Produk</h2></div>
        <div class="toolbar">
            <div class="search-bar dark-theme"><input type="text" placeholder="Cari Kategori..."></div>
            <button class="btn-add dark-theme"><i class="ph-bold ph-plus-circle"></i> Tambah Kategori</button>
        </div>
        <div class="data-card"><table class="data-table"><thead><tr><th style="width:50px;"></th><th>Nama</th><th>Jumlah Produk</th><th>ID Kategori</th><th>Kuota</th><th>Aksi</th></tr></thead><tbody>${rows}</tbody></table></div>
    `;
}

function renderStok(container) {
    const historyRows = stockHistory.map(row => `
        <tr><td>${row.date}</td><td>${row.action}</td><td>${row.product}</td><td>${row.qty}</td><td>${row.user}</td></tr>
    `).join('');
    container.innerHTML = `
        <div class="page-header"><h2>Manajemen Stok dan Inventaris</h2></div>
        <div class="stock-dashboard-grid">
            <div class="card action-card">
                <div class="action-column"><h3>Tambah Stok</h3><div class="input-wrapper"><select class="form-select"><option>Pilih produk...</option></select></div><button class="btn-stok btn-green">Tambah</button></div>
                <div class="divider-vertical"></div>
                <div class="action-column"><h3>Kurangi Stok</h3><div class="input-wrapper"><select class="form-select"><option>Pilih produk...</option></select></div><button class="btn-stok btn-dark-green">Kurangi</button></div>
            </div>
            <div class="card notification-card"><h3>Notifikasi Stok Rendah</h3><ul style="list-style:none; padding:0; font-weight:600; color:#0f3923;"><li>• Gula Pasir - 3 pcs</li><li>• Kopi Hitam - 2pcs</li><li>• Minyak Goreng - 1pcs</li></ul></div>
        </div>
        <h3 class="section-title">Riwayat Perubahan Stok</h3>
        <div class="data-card"><table class="data-table"><thead><tr><th>Tanggal</th><th>Aksi</th><th>Nama Produk</th><th>Jumlah</th><th>Oleh</th></tr></thead><tbody>${historyRows}</tbody></table></div>
    `;
}

function renderAdmin(container) {
    const rows = adminData.map(adm => `
        <tr>
            <td><input type="checkbox" class="custom-checkbox"></td>
            <td>${adm.name}</td><td>${adm.email}</td><td>${adm.role}</td>
            <td><span class="status-badge status-aktif">${adm.status}</span></td>
            <td>${adm.id}</td>
            <td class="action-icons"><button class="icon-btn"><i class="ph-bold ph-pencil-simple"></i></button></td>
        </tr>
    `).join('');
    container.innerHTML = `
        <div class="page-header"><h2>Manajemen Akun Admin</h2></div>
        <div class="toolbar">
            <div class="search-bar dark-theme"><input type="text" placeholder="Cari Admin..."></div>
            <button class="btn-add dark-theme"><i class="ph-bold ph-plus-circle"></i> Tambah Admin</button>
        </div>
        <div class="data-card"><table class="data-table"><thead><tr><th style="width:50px;"></th><th>Nama</th><th>Email</th><th>Hak Akses</th><th>Status</th><th>Nomor ID</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
    `;
}

function renderLaporan(container) {
    const rows = reportData.map(d => `
        <tr><td>${d.product}</td><td style="text-align:center;">${d.stock}</td><td>${d.value}</td></tr>
    `).join('');
    
    container.innerHTML = `
        <div class="page-header"><h2>Laporan Produk dan Inventaris</h2></div>
        <div style="text-align:right; margin-bottom:20px;">
            <button class="btn-add dark-theme" style="display:inline-flex;">Ekspor Laporan</button>
        </div>
        <div class="data-card report-grid">
            <div>
                <h3 style="margin-bottom:15px; color:#0f3923;">Laporan Produk dan Inventaris</h3>
                <table class="data-table"><thead><tr><th>Produk</th><th>Jumlah Stok</th><th>Total Nilai</th></tr></thead><tbody>${rows}</tbody></table>
            </div>
            <div>
                <h3 style="margin-bottom:15px; color:#0f3923;">Grafik Ringkasan Stok</h3>
                <div class="chart-container"><canvas id="stockChart"></canvas></div>
            </div>
        </div>
    `;
    
    // Init Chart
    setTimeout(() => {
        const ctx = document.getElementById('stockChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Gula Pasir', 'Kopi Hitam', 'Minyak Goreng'],
                datasets: [{
                    label: 'Stok',
                    data: [3, 2, 2],
                    backgroundColor: '#064e3b',
                    borderRadius: 5,
                    barThickness: 30
                }]
            },
            options: {
                scales: { y: { beginAtZero: true, max: 5 } },
                plugins: { legend: { display: false } }
            }
        });
    }, 100);
}

// --- 4. MODAL LOGIC (Tambah Produk & Logout) ---

function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function handleTambahProduk(event) {
    event.preventDefault();
    const nama = document.getElementById('input-nama').value;
    const kategori = document.getElementById('input-kategori').value;
    const harga = document.getElementById('input-harga').value;
    const stok = document.getElementById('input-stok').value;

    productData.unshift({ name: nama, category: kategori, price: harga, stock: stok });
    
    document.getElementById('form-tambah-produk').reset();
    closeModal('modal-tambah-produk');
    renderProduk(document.getElementById('main-content'));
    alert(`Berhasil menambahkan produk: ${nama}`);
}

function showLogoutModal() {
    document.getElementById('modal-confirm').classList.remove('hidden');
}

function processLogout() {
    closeModal('modal-confirm');
    document.getElementById('modal-success').classList.remove('hidden');
}

function redirectToLogin() {
    window.location.href = 'index.html';
}

// Init Load (Only in dashboard)
if(document.getElementById('main-content')) {
    document.addEventListener('DOMContentLoaded', () => loadPage('produk'));
}