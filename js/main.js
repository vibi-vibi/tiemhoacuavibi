(function () {
  // Mobile menu toggle
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector("nav.primary");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Dynamic copyright year
  var y = document.getElementById("y");
  if (y) y.textContent = String(new Date().getFullYear());

  // Setup Auth Modal
  function setupAuthModal() {
    if (document.getElementById("auth-modal")) return;

    var modalHtml = `
      <div class="auth-modal-overlay" id="auth-modal" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="auth-modal-card">
          <button type="button" class="auth-modal-close" aria-label="Đóng cửa sổ">&times;</button>
          
          <div class="auth-modal-header">
            <div class="auth-modal-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5 10 5 10-5-5-2.5-5 2.5z"/></svg>
              <span>Thành viên Casino Guide</span>
            </div>
            <h2 class="auth-modal-title" id="auth-modal-heading">Tài khoản thành viên</h2>
            <p class="auth-modal-desc">Theo dõi bài viết chuyên sâu, lưu cẩm nang kèo và nhận bản tin nhận định định kỳ.</p>
          </div>

          <div class="auth-tabs" role="tablist">
            <button type="button" class="auth-tab-btn active" data-tab="login" role="tab" aria-selected="true">Đăng nhập</button>
            <button type="button" class="auth-tab-btn" data-tab="register" role="tab" aria-selected="false">Đăng ký</button>
          </div>

          <div class="auth-toast" id="auth-toast" role="alert"></div>

          <!-- Login Form -->
          <form class="auth-form active" id="auth-login-form">
            <div class="auth-field">
              <label for="login-username">Tên đăng nhập hoặc Email</label>
              <input type="text" id="login-username" name="username" placeholder="nguyenvana hoặc name@domain.com" required autocomplete="username">
            </div>
            <div class="auth-field">
              <label for="login-password">Mật khẩu</label>
              <input type="password" id="login-password" name="password" placeholder="Nhập mật khẩu" required autocomplete="current-password">
            </div>
            <div class="auth-row-between">
              <label class="auth-checkbox-label">
                <input type="checkbox" name="remember" checked>
                <span>Ghi nhớ tôi</span>
              </label>
              <a href="javascript:void(0)" class="auth-link" id="btn-forgot-pw">Quên mật khẩu?</a>
            </div>
            <button type="submit" class="btn btn-gold auth-submit-btn">Đăng nhập</button>
            <p class="auth-disclaimer">Nội dung thông tin giáo dục dành cho độc giả <strong>18+</strong>. Không nhận tiền cược.</p>
          </form>

          <!-- Register Form -->
          <form class="auth-form" id="auth-register-form">
            <div class="auth-field">
              <label for="reg-username">Tên đăng nhập</label>
              <input type="text" id="reg-username" name="username" placeholder="Chọn tên hiển thị (viết liền không dấu)" required autocomplete="username">
            </div>
            <div class="auth-field">
              <label for="reg-email">Địa chỉ Email</label>
              <input type="email" id="reg-email" name="email" placeholder="name@domain.com" required autocomplete="email">
            </div>
            <div class="auth-field">
              <label for="reg-password">Mật khẩu</label>
              <input type="password" id="reg-password" name="password" placeholder="Tối thiểu 8 ký tự" required autocomplete="new-password">
            </div>
            <div class="auth-field">
              <label for="reg-password-confirm">Xác nhận mật khẩu</label>
              <input type="password" id="reg-password-confirm" name="password_confirm" placeholder="Nhập lại mật khẩu" required autocomplete="new-password">
            </div>
            <label class="auth-checkbox-label" style="margin: 2px 0;">
              <input type="checkbox" required checked>
              <span>Tôi xác nhận đã đủ <strong>18 tuổi</strong> và chấp thuận Điều khoản.</span>
            </label>
            <button type="submit" class="btn btn-gold auth-submit-btn">Tạo tài khoản</button>
            <p class="auth-disclaimer">Bảo mật thông tin độc giả theo chính sách bảo vệ dữ liệu độc lập của Casino Guide.</p>
          </form>
        </div>
      </div>
    `;

    var temp = document.createElement("div");
    temp.innerHTML = modalHtml.trim();
    var modalOverlay = temp.firstElementChild;
    document.body.appendChild(modalOverlay);

    var closeBtn = modalOverlay.querySelector(".auth-modal-close");
    var tabBtns = modalOverlay.querySelectorAll(".auth-tab-btn");
    var loginForm = document.getElementById("auth-login-form");
    var registerForm = document.getElementById("auth-register-form");
    var toast = document.getElementById("auth-toast");
    var forgotPwBtn = document.getElementById("btn-forgot-pw");

    function showTab(tabName) {
      tabBtns.forEach(function (tab) {
        var isTarget = tab.getAttribute("data-tab") === tabName;
        tab.classList.toggle("active", isTarget);
        tab.setAttribute("aria-selected", isTarget ? "true" : "false");
      });
      if (tabName === "login") {
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
      } else {
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
      }
      if (toast) toast.style.display = "none";
    }

    function openModal(tabName) {
      showTab(tabName || "login");
      modalOverlay.classList.add("active");
      modalOverlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var firstInput = modalOverlay.querySelector(tabName === "register" ? "#reg-username" : "#login-username");
      if (firstInput) {
        setTimeout(function () {
          firstInput.focus();
        }, 120);
      }
    }

    function closeModal() {
      modalOverlay.classList.remove("active");
      modalOverlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (toast) toast.style.display = "none";
    }

    tabBtns.forEach(function (tab) {
      tab.addEventListener("click", function () {
        showTab(tab.getAttribute("data-tab"));
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
      }
    });

    // Delegate clicks for any button with data-auth="login" or data-auth="register"
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-auth]");
      if (trigger) {
        e.preventDefault();
        var targetTab = trigger.getAttribute("data-auth");
        openModal(targetTab);
      }
    });

    // Form submit simulated actions
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var user = document.getElementById("login-username").value;
        if (toast) {
          toast.style.display = "block";
          toast.style.borderColor = "var(--ok)";
          toast.style.color = "var(--ok)";
          toast.textContent = "Chào mừng " + (user || "thành viên") + "! Đăng nhập thành công.";
          setTimeout(function () {
            closeModal();
            loginForm.reset();
          }, 1400);
        }
      });
    }

    if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var p1 = document.getElementById("reg-password").value;
        var p2 = document.getElementById("reg-password-confirm").value;
        if (p1 !== p2) {
          if (toast) {
            toast.style.display = "block";
            toast.style.borderColor = "var(--danger)";
            toast.style.color = "var(--danger)";
            toast.textContent = "Mật khẩu xác nhận không khớp. Vui lòng nhập lại!";
          }
          return;
        }

        var user = document.getElementById("reg-username").value;
        if (toast) {
          toast.style.display = "block";
          toast.style.borderColor = "var(--ok)";
          toast.style.color = "var(--ok)";
          toast.textContent = "Đăng ký thành công tài khoản " + user + "! Chào mừng bạn.";
          setTimeout(function () {
            closeModal();
            registerForm.reset();
          }, 1400);
        }
      });
    }

    if (forgotPwBtn) {
      forgotPwBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (toast) {
          toast.style.display = "block";
          toast.style.borderColor = "var(--gold)";
          toast.style.color = "var(--gold-2)";
          toast.textContent = "Vui lòng nhập email tài khoản của bạn để nhận liên kết khôi phục mật khẩu.";
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupAuthModal);
  } else {
    setupAuthModal();
  }
})();
