let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let editTransactionId = null;  // Untuk menyimpan ID transaksi yang sedang diedit

// Fungsi untuk memformat angka dengan pemisah ribuan
function formatAmount() {
    const amountInput = document.getElementById('amount');
    let amount = amountInput.value;

    // Hapus semua karakter selain angka
    amount = amount.replace(/[^,\d]/g, '');

    // Tambahkan titik setiap tiga digit
    const formattedAmount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    amountInput.value = formattedAmount;
}

// Fungsi untuk menghapus titik dari format saat menyimpan data
function parseAmount(value) {
    return parseFloat(value.replace(/\./g, ''));
}

// Fungsi untuk menambahkan atau mengedit transaksi
function addTransaction() {
    const description = document.getElementById('description').value;
    let amount = document.getElementById('amount').value;

    // Parsing amount untuk menghapus titik
    amount = parseAmount(amount);

    if (description === '' || isNaN(amount)) {
        alert('Masukkan deskripsi dan jumlah yang valid');
        return;
    }

    if (editTransactionId !== null) {
        // Edit transaksi yang ada
        transactions = transactions.map(transaction => {
            if (transaction.id === editTransactionId) {
                return { id: editTransactionId, description, amount };
            }
            return transaction;
        });
        editTransactionId = null;
        document.getElementById('submit-btn').textContent = 'Tambahkan Transaksi';
    } else {
        // Tambahkan transaksi baru
        const transaction = {
            id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
            description,
            amount
        };
        transactions.push(transaction);
    }

    updateLocalStorage();
    updateTransactionTable();
    updateTotalBalance();

    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

// Fungsi untuk memperbarui tabel transaksi (horizontal)
function updateTransactionTable() {
    const headerRow = document.getElementById('header-row');
    const noRow = document.getElementById('no-row');
    const descriptionRow = document.getElementById('description-row');
    const amountRow = document.getElementById('amount-row');
    const actionRow = document.getElementById('action-row');

    // Kosongkan baris
    noRow.innerHTML = '<td>No</td>';
    descriptionRow.innerHTML = '<td>Deskripsi</td>';
    amountRow.innerHTML = '<td>Jumlah</td>';
    actionRow.innerHTML = '<td>Aksi</td>';

    transactions.forEach((transaction, index) => {
        noRow.innerHTML += `<td>${index + 1}</td>`;
        descriptionRow.innerHTML += `<td>${transaction.description}</td>`;
        amountRow.innerHTML += `<td>Rp${Math.abs(transaction.amount).toLocaleString('id-ID')}</td>`;
        actionRow.innerHTML += `
            <td>
                <button class="edit" onclick="editTransaction(${transaction.id})">Edit</button>
                <button onclick="deleteTransaction(${transaction.id})">Hapus</button>
            </td>
        `;
    });
}

// Fungsi untuk menghitung total saldo
function updateTotalBalance() {
    const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    document.getElementById('total-balance').textContent = `Rp${totalBalance.toLocaleString('id-ID')}`;
}

// Fungsi untuk menyimpan data ke localStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Fungsi untuk menghapus transaksi
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    updateTransactionTable();
    updateTotalBalance();
}

// Fungsi untuk mengedit transaksi
function editTransaction(id) {
    const transaction = transactions.find(transaction => transaction.id === id);
    if (transaction) {
        document.getElementById('description').value = transaction.description;
        document.getElementById('amount').value = transaction.amount.toLocaleString('id-ID').replace(/,/g, '.');
        editTransactionId = id;
        document.getElementById('submit-btn').textContent = 'Update Transaksi';
    }
}

// Inisialisasi tampilan awal
updateTransactionTable();
updateTotalBalance();
