let totalDana = 0; // Variabel untuk menyimpan total dana

function updateTotalDana() {
    const uangMasukInput = document.getElementById('uang-masuk').value.replace(/\./g, '') || '0'; // Menghapus titik atau set ke 0
    const uangKeluarInput = document.getElementById('uang-keluar').value.replace(/\./g, '') || '0'; // Menghapus titik atau set ke 0

    // Menghitung total dana
    const uangMasuk = parseInt(uangMasukInput) || 0; // Memastikan uang masuk adalah angka
    const uangKeluar = parseInt(uangKeluarInput) || 0; // Memastikan uang keluar adalah angka
    
    // Jika ada uang masuk, reset total dana ke nilai uang masuk
    if (uangMasuk > 0) {
        totalDana = uangMasuk; 
    }
    
    // Jika ada uang keluar, kurangi total dana
    if (uangKeluar > 0) {
        totalDana -= uangKeluar; 
    }
}

function addTransaction() {
    const keterangan = document.getElementById('keterangan').value;
    const uangMasukInput = document.getElementById('uang-masuk').value.replace(/\./g, ''); // Menghapus titik
    const uangKeluarInput = document.getElementById('uang-keluar').value.replace(/\./g, ''); // Menghapus titik

    const transactionBody = document.getElementById('transaction-body');
    const newRow = document.createElement('tr');
    const nomor = transactionBody.rows.length + 1; // Nomor berdasarkan jumlah baris

    newRow.innerHTML = `
        <td>${nomor}</td>
        <td>${keterangan}</td>
        <td>${formatRupiah(uangMasukInput)}</td>
        <td>${formatRupiah(uangKeluarInput)}</td>
        <td>${formatRupiah(totalDana.toString())}</td>
        <td><button onclick="deleteRow(this)">Hapus</button></td>
    `;

    transactionBody.appendChild(newRow);

    // Reset form
    document.getElementById('transaction-form').reset();
    updateTotalDana(); // Update total dana setelah transaksi
}

function deleteRow(button) {
    const row = button.parentNode.parentNode; // Mendapatkan baris yang akan dihapus
    const uangMasuk = row.cells[2].innerText.replace(/\./g, ''); // Mendapatkan Uang Masuk dari baris
    const uangKeluar = row.cells[3].innerText.replace(/\./g, ''); // Mendapatkan Uang Keluar dari baris

    totalDana -= parseInt(uangMasuk) || 0; // Kurangi total dana sesuai dengan uang masuk yang dihapus
    totalDana += parseInt(uangKeluar) || 0; // Tambahkan total dana sesuai dengan uang keluar yang dihapus

    row.parentNode.removeChild(row); // Menghapus baris dari tabel

    // Update nomor urut pada tabel
    updateTable();
}

function updateTable() {
    const transactionBody = document.getElementById('transaction-body');
    const rows = transactionBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].innerText = i + 1; // Update nomor urut
    }
}

function formatRupiah(angka) {
    return angka.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Format angka menjadi format Rupiah
}
