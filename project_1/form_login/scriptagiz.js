function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validasi email dengan domain @gmail.com
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // Validasi password: minimal 6 karakter, 1 huruf kapital, 1 angka
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/; 

    // Cek email
    if (!emailPattern.test(email)) {
        alert("Email harus menggunakan domain @gmail.com.");
        return;
    }

    // Cek password
    if (!passwordPattern.test(password)) {
        alert("Password harus memiliki minimal 1 huruf kapital dan 1 angka.");
        return;
    }

    // Simpan email jika 'Remember Me' dipilih
    if (rememberMe) {
        localStorage.setItem('email', email);
    } else {
        localStorage.removeItem('email');
    }

    // Berhasil login
    alert("Login berhasil!");
    window.location.href = '../form_umur/index.html'; 
}

window.onload = function() {
    // Ambil email yang tersimpan jika ada
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('rememberMe').checked = true;
    }
};
