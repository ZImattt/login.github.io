/* ================================
LOGIN HANDLER + ANIMASI GEMBOK
================================= */
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");
const loginNote = document.getElementById("loginNote"); // ambil elemen chat admin

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // hilangkan note admin pas klik submit
    if (loginNote) loginNote.style.display = "none";

    const username = this.username.value.trim();
    const password = this.password.value.trim();
    const container = document.querySelector(".login-container");

    // hapus animasi lama kalo ada
    const oldElements = container.querySelectorAll("#loading-animation, .fail-box");
    oldElements.forEach(el => el.remove());

    if (errorMsg) errorMsg.style.display = "none";

    // ===== VALIDASI LOGIN =====
    if (username === "admin" && password === "12345") {
      // SUKSES: sembunyikan form
      this.style.display = "none";

      const loader = document.createElement("div");
      loader.id = "loading-animation";
      loader.innerHTML = `
        <i class="fas fa-lock lock-icon"></i>
        <p class="loader-text">Sedang memverifikasi...</p>
      `;
      container.appendChild(loader);

      const lockIcon = loader.querySelector(".lock-icon");

      // delay lalu buka gembok
      setTimeout(() => {
        lockIcon.classList.remove("fa-lock");
        lockIcon.classList.add("fa-lock-open", "unlock");
        loader.querySelector("p").textContent = "Berhasil login!";
      }, 1800);

      // redirect setelah animasi
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
      }, 3200);

    } else {
      // GAGAL: tampilkan gembok merah + shake + link WA
      const failBox = document.createElement("div");
      failBox.className = "fail-box";
      failBox.innerHTML = `
        <i class="fas fa-lock lock-icon lock-fail"></i>
        <p class="fail-text">Login gagal. Username atau password salah.</p>
        <a class="contact-admin" href="https://wa.me/6281585210732?text=usn%20sama%20pw%20nya%20apa%20min" target="_blank">
          <i class="fab fa-whatsapp"></i> Hubungi Admin
        </a>
      `;
      container.appendChild(failBox);

      // animasi shake sekali
      const failLock = failBox.querySelector(".lock-icon");
      failLock.classList.add("shake");
      setTimeout(() => failLock.classList.remove("shake"), 800);

      // kalau masih mau pakai errorMsg, aktifin ini:
      if (errorMsg) {
        errorMsg.style.display = "block";
        errorMsg.textContent = "Username / Password salah. Coba lagi atau hubungi admin.";
      }
    }
  });
}
