// =============================
// DATA MENU PMBMW
// =============================

const menus = [
    {
        id: 1,
        nama: "Mie Ayam",
        harga: 11000,
        gambar: "mie-ayam.jpg",
        kategori: "makanan"
    },
    {
        id: 2,
        nama: "Mie Ayam Bakso",
        harga: 14000,
        gambar: "mie-ayam-bakso.jpg",
        kategori: "makanan"
    },
    {
        id: 3,
        nama: "Es Teh Manis",
        harga: 4000,
        gambar: "es-teh-manis.jpg",
        kategori: "minuman"
    },
    {
        id: 4,
        nama: "Es Teh Tawar",
        harga: 2000,
        gambar: "es-teh-tawar.jpg",
        kategori: "minuman"
    },
    {
        id: 5,
        nama: "Teh Hangat/Panas Manis",
        harga: 4000,
        gambar: "teh-panas-manis.jpg",
        kategori: "minuman"
    },
    {
        id: 6,
        nama: "Teh Hangat/Panas Tawar",
        harga: 1000,
        gambar: "teh-panas-tawar.jpg",
        kategori: "minuman"
    }
];

let keranjang = [];

// =============================
// MENAMPILKAN MENU
// =============================

function tampilkanMenu() {

    const makananContainer = document.getElementById("makanan-container");
    const minumanContainer = document.getElementById("minuman-container");

    if (!makananContainer || !minumanContainer) {
        console.error("Container menu tidak ditemukan!");
        return;
    }

    makananContainer.innerHTML = "";
    minumanContainer.innerHTML = "";

    menus.forEach(menu => {

        const kartu = `
            <div class="menu-card">

                <img src="${menu.gambar}" alt="${menu.nama}">

                <div class="menu-info">

                    <h3>${menu.nama}</h3>

                    <p>Rp${menu.harga.toLocaleString("id-ID")}</p>

                    <button class="btn-add"
                        onclick="tambahKeranjang(${menu.id})">
                        + TAMBAH
                    </button>

                </div>

            </div>
        `;

        if (menu.kategori === "makanan") {
            makananContainer.innerHTML += kartu;
        } else {
            minumanContainer.innerHTML += kartu;
        }

    });
}

// =============================
// TAMBAH KERANJANG
// =============================

function tambahKeranjang(id) {

    const menu = menus.find(item => item.id === id);

    const item = keranjang.find(item => item.id === id);

    if (item) {
        item.jumlah++;
    } else {
        keranjang.push({
            ...menu,
            jumlah: 1
        });
    }

    tampilkanKeranjang();
}

// =============================
// TAMPILKAN KERANJANG
// =============================

function tampilkanKeranjang() {

    const container = document.getElementById("cart-container");

    let total = 0;

    if (keranjang.length === 0) {

        container.innerHTML = "<p>Keranjang masih kosong.</p>";

    } else {

        container.innerHTML = "";

        keranjang.forEach(item => {

            const subtotal = item.harga * item.jumlah;

            total += subtotal;

            container.innerHTML += `
                <div class="cart-item">

                    <div>
                        <strong>${item.nama}</strong><br>
                        Rp${subtotal.toLocaleString("id-ID")}
                    </div>

                    <div>
                        <button onclick="ubahJumlah(${item.id}, -1)">−</button>

                        ${item.jumlah}

                        <button onclick="ubahJumlah(${item.id}, 1)">+</button>
                    </div>

                </div>
            `;

        });
    }

    document.getElementById("total-harga").textContent =
        "Rp" + total.toLocaleString("id-ID");
}

// =============================
// UBAH JUMLAH PESANAN
// =============================

function ubahJumlah(id, perubahan) {

    const item = keranjang.find(item => item.id === id);

    if (!item) return;

    item.jumlah += perubahan;

    if (item.jumlah <= 0) {
        keranjang = keranjang.filter(item => item.id !== id);
    }

    tampilkanKeranjang();
}

// =============================
// CHECKOUT SEMENTARA
// =============================

function checkout() {

    const nama = document.getElementById("nama-pelanggan").value.trim();

    const tipe = document.getElementById("tipe-pesanan").value;

    const nomorMeja = document.getElementById("nomor-meja").value.trim();

    const catatan = document.getElementById("catatan-pesanan").value.trim();

    if (keranjang.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }

    if (nama === "") {
        alert("Silakan masukkan nama Anda!");
        return;
    }

    if (tipe === "Makan di tempat" && nomorMeja === "") {
        alert("Silakan masukkan nomor meja!");
        return;
    }

    let total = 0;

    let pesan = `*PESANAN PONDOK MIE AYAM BAKSO MAS WIJI*\n\n`;

    pesan += `Nama Pelanggan: ${nama}\n`;
    pesan += `Jenis Pesanan: ${tipe}\n`;

    if (tipe === "Makan di tempat") {
        pesan += `Nomor Meja: ${nomorMeja}\n`;
    }

    pesan += `\n*DETAIL PESANAN*\n`;
    pesan += `--------------------------\n`;

    keranjang.forEach(item => {

        const subtotal = item.harga * item.jumlah;

        total += subtotal;

        pesan += `${item.nama}\n`;
        pesan += `${item.jumlah} x Rp${item.harga.toLocaleString("id-ID")}\n`;
        pesan += `Subtotal: Rp${subtotal.toLocaleString("id-ID")}\n\n`;

    });

    pesan += `--------------------------\n`;
    pesan += `*TOTAL PEMBAYARAN: Rp${total.toLocaleString("id-ID")}*\n`;

    if (catatan !== "") {
        pesan += `\nCatatan: ${catatan}\n`;
    }

    pesan += `\nTerima kasih telah memesan di PMBMW!`;

    const konfirmasi = confirm(
        "Apakah pesanan Anda sudah benar?\n\n" +
        "Nama: " + nama +
        "\nTotal: Rp" + total.toLocaleString("id-ID")
    );

    if (!konfirmasi) {
        return;
    }

    const nomorWhatsApp = "6285810908758";

    const url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");

}

// =============================
// JALANKAN WEBSITE
// =============================

tampilkanMenu();
tampilkanKeranjang();