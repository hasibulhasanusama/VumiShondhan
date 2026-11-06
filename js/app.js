/* ==========================================================================
   TABLE OF CONTENTS:
   1. Core Utilities & DOM Selectors
   2. Intro Loader & Site Initialization
   3. Navigation & Mobile Menu Controllers
   4. Language Settings & Toast Notification System
   5. Smooth Scrolling & Navigation Anchors
   6. Service Information Database & Card Listeners
   7. Land Search Form Submission Controller
   8. FAQ Accordion Logic Manager
   9. Modal Engine, Dynamic Fields & Auth Controllers
   10. AI Virtual Assistant Chatbot Engine & Handlers
   11. Live Clock Controller (Added)
   ========================================================================== */
/* ==========================================================================
   1. Core Utilities & DOM Selectors
   ========================================================================== */
const $ = (selector, root = document) => root.querySelector(selector); const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const intro = $('#intro');
const site = $('#site');

/* ==========================================================================
   2. Intro Loader & Site Initialization
   ========================================================================== */
function enterSite() {
  intro.classList.add('hidden');
  site.classList.add('ready');
}

window.addEventListener('load', () => {
  setTimeout(enterSite, 1800);
});

$('#skipIntro')?.addEventListener('click', () => {
  enterSite();
});

/* ==========================================================================
   3. Navigation & Mobile Menu Controllers
   ========================================================================== */
$('#mobileMenu').addEventListener('click', () => {
  $('#nav').classList.toggle('open'); });  $$('#nav a').forEach(anchor => {
  anchor.addEventListener('click', () => {
    $('#nav').classList.remove('open');
  });
});

/* ==========================================================================
   4. Language Settings & Toast Notification System
   ========================================================================== */

/* ==========================================================================
   Toast Notification Function
   ========================================================================== */
function showToast(message, type = "success") {
  const toastElement = document.getElementById("toast");

  if (!toastElement) {
    console.warn("Toast element not found in HTML.");
    return;
  }

  toastElement.textContent = message;

  toastElement.classList.remove("show", "toast-success", "toast-error");

  toastElement.classList.add(
    type === "error" ? "toast-error" : "toast-success"
  );

  // Show notification
  toastElement.classList.add("show");

  // Clear previous timer
  clearTimeout(showToast.timer);

  // Hide notification after 3 seconds
  showToast.timer = setTimeout(() => {
    toastElement.classList.remove("show");
  }, 3000);
}

const languageBtn = document.getElementById("languageBtn");

function syncLanguageButton() {
  if (!languageBtn) return;

  const isEnglish = document.documentElement.lang
    .toLowerCase()
    .startsWith("en");

  languageBtn.textContent = isEnglish ? "English" : "বাংলা";
}

syncLanguageButton();

const languageObserver = new MutationObserver(syncLanguageButton);

languageObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang"]
});

/* ==========================================================================
   5. Smooth Scrolling & Navigation Anchors
   ========================================================================== */

$$('[data-goto]').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.goto;
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ==========================================================================
   6. Service Information Database & Card Listeners
   ========================================================================== */

const serviceInfo = {
  'land-search': [
    'জমি অনুসন্ধান',
    'জেলার নাম, উপজেলা, মৌজা, খতিয়ান ও দাগ নম্বর দিয়ে জমির তথ্য অনুসন্ধান করুন।',
    'এই Frontend Demo-তে প্রকৃত সরকারি রেকর্ড অনুসন্ধান করা হয় না।'
  ],

  ownership: [
    'মালিকানা যাচাই',
    'জমির মালিকানা-সংক্রান্ত তথ্য যাচাইয়ের জন্য প্রয়োজনীয় তথ্য দিন।',
    'প্রকৃত মালিকানা নিশ্চিত করতে দলিল, খতিয়ান, নামজারি ও সরকারি রেকর্ড যাচাই করতে হবে।'
  ],

  mutation: [
    'নামজারি ও ইতিহাস',
    'নামজারি আবেদন এবং জমির রেকর্ড-সংক্রান্ত তথ্য দিন।',
    'প্রকৃত নামজারি ও ইতিহাসের ফলাফলের জন্য Backend এবং অনুমোদিত রেকর্ড সংযোগ প্রয়োজন।'
  ],

  case: [
    'মামলা-সংক্রান্ত তথ্য',
    'জমি ও মামলা-সংক্রান্ত প্রাথমিক তথ্য দিন।',
    'এই Demo-তে আদালতের লাইভ মামলা-সংক্রান্ত তথ্য নেই। সংশ্লিষ্ট কর্তৃপক্ষের মাধ্যমে নিশ্চিত করুন।'
  ],

  document: [
    'দলিল তুলনা',
    'দলিলের নম্বর, সাল ও জমির তথ্য দিন।',
    'বর্তমানে দলিল আপলোড, OCR এবং স্বয়ংক্রিয় তুলনা চালু নেই।'
  ],

  map: [
    'ভূমি রেকর্ড ও ম্যাপ',
    'জেলা, উপজেলা, মৌজা এবং জরিপের ধরন নির্বাচন করে শুরু করুন।',
    'প্রকৃত মৌজা ম্যাপ ও সরকারি রেকর্ড দেখানোর জন্য উপযুক্ত ডেটা সংযোগ প্রয়োজন।'
  ],

  khas: [
    'খাস জমির অবস্থা',
    'জমির অবস্থান ও দাগ-সংক্রান্ত তথ্য দিন।',
    'এই Demo-তে খাস জমির সরকারি ডেটা সংযুক্ত নেই।'
  ],

  acquisition: [
    'অধিগ্রহণের অবস্থা',
    'জমির অবস্থান ও দাগ-সংক্রান্ত তথ্য দিন।',
    'অধিগ্রহণের প্রকৃত অবস্থা জানতে সংশ্লিষ্ট কর্তৃপক্ষের রেকর্ড প্রয়োজন।'
  ],

  inheritance: [
    'উত্তরাধিকার অনুসন্ধান',
    'উত্তরাধিকার-সংক্রান্ত নথি ও জমির তথ্য দিন।',
    'প্রকৃত উত্তরাধিকার নির্ধারণে প্রযোজ্য আইন ও যাচাইকৃত নথি বিবেচনা করতে হবে।'
  ],

  division: [
    'জমি ভাগের হিসাব',
    'জমির পরিমাণ, একক এবং অংশীদারের তথ্য দিন।',
    'এখানে দেওয়া হিসাব প্রাথমিক গণনা; এটি চূড়ান্ত আইনি সিদ্ধান্ত নয়।'
  ],

  law: [
    'ভূমি আইন ও গাইড',
    'ভূমি আইন বা নিয়ম সম্পর্কে আপনার প্রশ্ন লিখুন।',
    'সরকারি তথ্যের জন্য বাংলাদেশ ভূমি তথ্য বাতায়ন দেখুন: https://land.gov.bd/'
  ],

  report: [
    'যাচাইয়ের রিপোর্ট',
    'যাচাইয়ের রিপোর্ট তৈরির জন্য জমির প্রয়োজনীয় তথ্য দিন।',
    'রিপোর্ট তৈরি ও ডাউনলোডের পূর্ণ সুবিধা Backend যুক্ত হওয়ার পর চালু হবে।'
  ]
};

/* Protect every service: Login required */
$$('[data-service]').forEach(card => {
  card.addEventListener('click', () => {
    const serviceId = card.dataset.service;

    if (!serviceInfo[serviceId]) {
      showToast('এই Service এখন উপলভ্য নয়।', 'error');
      return;
    }



const currentUser = window.VumiAuth?.getCurrentUser();

if (!currentUser) {
  showToast('এই Feature ব্যবহার করতে আগে Login করুন।', 'error');
  return;
}



    // Login করা থাকলে সংশ্লিষ্ট Feature Form খুলবে
    if (typeof window.openVumiFeature === 'function') {
      window.openVumiFeature(serviceId);
    } else {
      showToast(
        'Feature system লোড হয়নি। পেজ Refresh করুন।',
        'error'
      );
    }
  });
});

/* ==========================================================================
   7. Land Search Form Submission Controller
   ========================================================================== */

$('#landSearchForm').addEventListener('submit', e => {
  e.preventDefault();

  const message = $('#searchMessage');
  message.textContent = '';

  const currentUser = window.VumiAuth?.getCurrentUser?.();

  // Login না থাকলে শুধু মেসেজ দেখাবে
  if (!currentUser) {
    const notice =
      'এই ফর্মটি আপনাকে তথ্য পূরণ শেখানোর জন্য রাখা হয়েছে। অনুসন্ধান চালিয়ে যেতে আগে Login করুন।';

    message.textContent = notice;
    toast(notice);
    return;
  }

  // Login থাকলে ডেমো সারাংশ দেখাবে
  const district = $('#district').value;
  const upazila = document.querySelector(
    '#landSearchForm input[placeholder="উপজেলার নাম লিখুন"]'
  )?.value || '';

  const mouza = document.querySelector(
    '#landSearchForm input[placeholder="মৌজার নাম লিখুন"]'
  )?.value || '';

  const dag = document.querySelector(
    '#landSearchForm input[placeholder="দাগ নম্বর লিখুন"]'
  )?.value || '';

  message.textContent =
    `ডেমো অনুসন্ধান সম্পন্ন। জেলা: ${district}, উপজেলা: ${upazila}, মৌজা: ${mouza}, দাগ নম্বর: ${dag}। এটি সরকারি রেকর্ড যাচাই নয়।`;

  toast('ডেমো অনুসন্ধানের সারাংশ তৈরি হয়েছে।');
});


/* ==========================================================================
   8. FAQ Accordion Logic Manager
   ========================================================================== */
$$('.faq-list details').forEach(detailsEl => { detailsEl.addEventListener('toggle', () => { if (detailsEl.open) { $$
('.faq-list details')
        .filter(otherEl => otherEl !== detailsEl)
        .forEach(otherEl => {
          otherEl.open = false;
        });
    }
  });
});

/* ==========================================================================
   9. Modal Engine, Dynamic Fields & Auth Controllers
   ========================================================================== */
   
/* =========================================================
   9. VumiShondhan Authentication & Facebook-Style Profile
   Registration does NOT automatically log the user in.
========================================================= */

(() => {
  "use strict";

  const USERS_KEY = "vumiShondhanDemoUsers";
  const SESSION_KEY = "vumiShondhanCurrentUser";

  const $ = (selector, parent = document) => parent.querySelector(selector);

  const modalBackdrop = $("#modalBackdrop");
  const modalTitle = $("#modalTitle");
  const modalDesc = $("#modalDesc");
  const modalForm = $("#modalForm");
  const modalFields = $("#modalFields");
  const modalConsent = $("#modalConsent");
  const modalSubmit = $("#modalSubmit");
  const modalSwitch = $("#modalSwitch");
  const modalMessage = $("#modalMessage");
  const modalClose = $("#modalClose");

  const navLogin = $("#navLogin");
  const navSignup = $("#navSignup");

  if (!modalBackdrop || !modalForm || !modalFields) {
    console.error(
      "VumiShondhan: Authentication modal elements are missing from index.html."
    );
    return;
  }

  let currentMode = "login";

  function getUsers() {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      return Array.isArray(users) ? users : [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getSession() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  }

  function setSession(user) {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        createdAt: user.createdAt,
        photo: user.photo || ""
      })
    );
  }

  function getCurrentUser() {
    const session = getSession();
    if (!session) return null;

    return getUsers().find(user => user.id === session.id) || session;
  }

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function initials(name = "User") {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part[0] || "")
      .join("")
      .toUpperCase() || "U";
  }

  function showMessage(message, type = "error") {
    if (!modalMessage) return;

    modalMessage.textContent = message;
    modalMessage.style.color =
      type === "success" ? "#16743b" : "#c0392b";
  }

  function closeModal() {
    modalBackdrop.classList.remove("open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function field(label, name, type = "text", placeholder = "", value = "") {
    return `
      <label class="modal-field">
        <span>${escapeHTML(label)}</span>
        <input
          name="${escapeHTML(name)}"
          type="${escapeHTML(type)}"
          placeholder="${escapeHTML(placeholder)}"
          value="${escapeHTML(value)}"
          autocomplete="${type === "password" ? "current-password" : "on"}"
          required
        >
      </label>
    `;
  }

  function openModal(mode, message = "") {
    currentMode = mode;
    modalFields.innerHTML = "";
    modalForm.onsubmit = handleSubmit;

    if (modalConsent) modalConsent.hidden = true;
    if (modalSwitch) modalSwitch.innerHTML = "";
    if (modalMessage) modalMessage.textContent = "";

    const user = getCurrentUser();

    if (mode === "signup") {
      modalTitle.textContent = "Create Your Account";
      modalDesc.textContent =
        "Register with VumiShondhan to access your account.";
      modalFields.innerHTML =
        field("Full Name", "name", "text", "Enter your full name") +
        field("Email Address", "email", "email", "you@example.com") +
        field("Phone Number", "phone", "tel", "01XXXXXXXXX") +
        field("Password", "password", "password", "At least 6 characters") +
        field("Confirm Password", "confirmPassword", "password", "Re-enter password");

      modalSubmit.innerHTML = "<span>Create Account</span><span>→</span>";

      if (modalSwitch) {
        modalSwitch.innerHTML =
          `Already registered? <button type="button" data-auth-switch="login">Log in</button>`;
      }
    } else if (mode === "login") {
      modalTitle.textContent = "Welcome Back";
      modalDesc.textContent = "Log in to your VumiShondhan account.";
      modalFields.innerHTML =
        field("Email Address", "email", "email", "you@example.com") +
        field("Password", "password", "password", "Enter your password");

      modalSubmit.innerHTML = "<span>Log In</span><span>→</span>";

      if (modalSwitch) {
        modalSwitch.innerHTML =
          `Don't have an account? <button type="button" data-auth-switch="signup">Create account</button>`;
      }
    } else if (mode === "profile") {
      if (!user) return openModal("login");

      modalTitle.textContent = "My Profile";
      modalDesc.textContent = "Your VumiShondhan account information.";

      modalFields.innerHTML = `
        <div class="vumi-profile-summary">
          <div class="vumi-avatar vumi-avatar-large">
            ${user.photo
              ? `<img src="${escapeHTML(user.photo)}" alt="Profile photo">`
              : escapeHTML(initials(user.name))}
          </div>
          <h3>${escapeHTML(user.name)}</h3>
          <p>${escapeHTML(user.email)}</p>
        </div>
        <div class="vumi-profile-detail">
          <span>Full Name</span><strong>${escapeHTML(user.name)}</strong>
        </div>
        <div class="vumi-profile-detail">
          <span>Email Address</span><strong>${escapeHTML(user.email)}</strong>
        </div>
        <div class="vumi-profile-detail">
          <span>Phone Number</span><strong>${escapeHTML(user.phone || "Not added")}</strong>
        </div>
        <div class="vumi-profile-detail">
          <span>Account Created</span><strong>${
            user.createdAt
              ? escapeHTML(new Date(user.createdAt).toLocaleDateString())
              : "Not available"
          }</strong>
        </div>
      `;

      modalSubmit.innerHTML = "<span>Edit Profile</span><span>→</span>";
      modalForm.onsubmit = event => {
        event.preventDefault();
        openModal("edit-profile");
      };
    } else if (mode === "edit-profile") {
      if (!user) return openModal("login");

      modalTitle.textContent = "Edit Profile";
      modalDesc.textContent = "Update your personal information.";
      modalFields.innerHTML =
        field("Full Name", "name", "text", "Your name", user.name) +
        field("Phone Number", "phone", "tel", "01XXXXXXXXX", user.phone || "") +
        field("Profile Photo URL (optional)", "photo", "url", "https://example.com/photo.jpg", user.photo || "");

      modalSubmit.innerHTML = "<span>Save Changes</span><span>→</span>";
    } else if (mode === "change-password") {
      if (!user) return openModal("login");

      modalTitle.textContent = "Change Password";
      modalDesc.textContent = "Enter your current password and choose a new one.";
      modalFields.innerHTML =
        field("Current Password", "currentPassword", "password", "Current password") +
        field("New Password", "newPassword", "password", "At least 6 characters") +
        field("Confirm New Password", "confirmPassword", "password", "Repeat new password");

      modalSubmit.innerHTML = "<span>Update Password</span><span>→</span>";
    } else if (mode === "searches") {
      if (!user) return openModal("login");

      modalTitle.textContent = "My Land Searches";
      modalDesc.textContent = "Your recent searches on this device.";
      const searches = JSON.parse(
        localStorage.getItem("vumiShondhanSearchHistory") || "[]"
      );

      modalFields.innerHTML = searches.length
        ? searches.map(item => `
            <div class="vumi-profile-detail">
              <span>${escapeHTML(item.date || "")}</span>
              <strong>${escapeHTML(item.query || item.district || "Land search")}</strong>
            </div>
          `).join("")
        : `<p class="vumi-empty-state">No saved searches yet. Your future searches can appear here.</p>`;

      modalSubmit.innerHTML = "<span>Close</span>";
      modalForm.onsubmit = event => {
        event.preventDefault();
        closeModal();
      };
    }

    if (modalBackdrop) {
      modalBackdrop.classList.add("open");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    if (message) showMessage(message, "success");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(modalForm);
    const data = Object.fromEntries(formData.entries());
    const users = getUsers();

    if (currentMode === "signup") {
      const name = String(data.name || "").trim();
      const email = String(data.email || "").trim().toLowerCase();
      const phone = String(data.phone || "").trim();
      const password = String(data.password || "");
      const confirmPassword = String(data.confirmPassword || "");

      if (!name || !email || !phone || !password) {
        return showMessage("Please complete all required fields.");
      }

      if (password.length < 6) {
        return showMessage("Password must contain at least 6 characters.");
      }

      if (password !== confirmPassword) {
        return showMessage("Passwords do not match.");
      }

      if (users.some(user => user.email.toLowerCase() === email)) {
        return showMessage("This email is already registered. Please log in.");
      }

      const newUser = {
        id: (crypto.randomUUID
          ? crypto.randomUUID()
          : "user-" + Date.now()),
        name,
        email,
        phone,
        password,
        photo: "",
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      saveUsers(users);

      // IMPORTANT: Registration creates the account only.
      // Do not set a session here; the user must log in separately.
      sessionStorage.removeItem(SESSION_KEY);

      renderAuthNavigation();
      openModal(
        "login",
        "Registration successful! Please log in with your new account."
      );

      const emailInput = modalForm.querySelector('[name="email"]');
      if (emailInput) emailInput.value = email;

      return;
    }

    if (currentMode === "login") {
      const email = String(data.email || "").trim().toLowerCase();
      const password = String(data.password || "");

      // Demo login remains available.
      if (
        email === "demo@vumishondhan.com" &&
        (password === "demo" || password === "demo123")
      ) {
        let demoUser = users.find(user => user.email === email);

        if (!demoUser) {
          demoUser = {
            id: "vumi-demo-user",
            name: "Demo User",
            email,
            phone: "",
            password,
            photo: "",
            createdAt: new Date().toISOString()
          };
          users.push(demoUser);
          saveUsers(users);
        }

        setSession(demoUser);
        closeModal();
        renderAuthNavigation();
        return;
      }

      const foundUser = users.find(
        user => user.email.toLowerCase() === email &&
                user.password === password
      );

      if (!foundUser) {
        return showMessage("Incorrect email or password.");
      }

      setSession(foundUser);
      closeModal();
      renderAuthNavigation();
      return;
    }

    if (currentMode === "edit-profile") {
      const user = getCurrentUser();
      if (!user) return openModal("login");

      const name = String(data.name || "").trim();
      const phone = String(data.phone || "").trim();
      const photo = String(data.photo || "").trim();

      if (!name) return showMessage("Please enter your name.");

      if (photo && !/^https?:\/\//i.test(photo)) {
        return showMessage("Please enter a valid photo URL beginning with http:// or https://.");
      }

      const updatedUsers = getUsers().map(item =>
        item.id === user.id
          ? { ...item, name, phone, photo }
          : item
      );

      saveUsers(updatedUsers);
      setSession(updatedUsers.find(item => item.id === user.id));
      renderAuthNavigation();
      openModal("profile");
      showMessage("Profile updated successfully.", "success");
      return;
    }

    if (currentMode === "change-password") {
      const user = getCurrentUser();
      if (!user) return openModal("login");

      if (data.currentPassword !== user.password) {
        return showMessage("Your current password is incorrect.");
      }

      if (String(data.newPassword || "").length < 6) {
        return showMessage("New password must contain at least 6 characters.");
      }

      if (data.newPassword !== data.confirmPassword) {
        return showMessage("New passwords do not match.");
      }

      const updatedUsers = getUsers().map(item =>
        item.id === user.id
          ? { ...item, password: data.newPassword }
          : item
      );

      saveUsers(updatedUsers);
      setSession(updatedUsers.find(item => item.id === user.id));
      openModal("profile");
      showMessage("Password changed successfully.", "success");
    }
  }

  /* Create a profile dropdown beside the existing navbar buttons. */
  function createProfileMenu() {
    let wrapper = $("#vumiProfileMenu");
    if (wrapper) return wrapper;

    wrapper = document.createElement("div");
    wrapper.id = "vumiProfileMenu";
    wrapper.className = "vumi-profile-menu";
    wrapper.innerHTML = `
      <button type="button" class="vumi-profile-trigger"
              id="vumiProfileTrigger" aria-expanded="false"
              aria-label="Open profile menu">
        <span class="vumi-avatar" id="vumiNavAvatar">U</span>
        <span class="vumi-nav-name" id="vumiNavName">My Account</span>
        <span class="vumi-chevron">▾</span>
      </button>

      <div class="vumi-profile-dropdown" id="vumiProfileDropdown" hidden>
        <div class="vumi-dropdown-heading">
          <strong id="vumiDropdownName">User</strong>
          <span id="vumiDropdownEmail"></span>
        </div>
        <button type="button" data-profile-action="profile">My Profile</button>
        <button type="button" data-profile-action="edit-profile">Edit Profile</button>
        <button type="button" data-profile-action="change-password">Change Password</button>
        <button type="button" data-profile-action="searches">My Land Searches</button>
        <button type="button" data-profile-action="logout" class="vumi-logout-button">Log Out</button>
      </div>
    `;

    const anchor = navSignup || navLogin;
    if (anchor && anchor.parentElement) {
      anchor.insertAdjacentElement("afterend", wrapper);
    } else {
      const nav = $("nav");
      if (nav) nav.appendChild(wrapper);
    }

    return wrapper;
  }

  function renderAuthNavigation() {
    const wrapper = createProfileMenu();
    const user = getCurrentUser();

    if (navLogin) navLogin.hidden = Boolean(user);
    if (navSignup) navSignup.hidden = Boolean(user);
    wrapper.hidden = !user;

    if (!user) return;

    const avatar = $("#vumiNavAvatar");
    const navName = $("#vumiNavName");
    const dropdownName = $("#vumiDropdownName");
    const dropdownEmail = $("#vumiDropdownEmail");

    if (avatar) {
      avatar.innerHTML = user.photo
        ? `<img src="${escapeHTML(user.photo)}" alt="">`
        : escapeHTML(initials(user.name));
    }

    if (navName) navName.textContent = user.name.split(/\s+/)[0];
    if (dropdownName) dropdownName.textContent = user.name;
    if (dropdownEmail) dropdownEmail.textContent = user.email;
  }

  document.addEventListener("click", event => {
    const switchButton = event.target.closest("[data-auth-switch]");
    if (switchButton) {
      openModal(switchButton.dataset.authSwitch);
      return;
    }

    const trigger = event.target.closest("#vumiProfileTrigger");
    const dropdown = $("#vumiProfileDropdown");

    if (trigger && dropdown) {
      const isOpening = dropdown.hidden;
      dropdown.hidden = !isOpening;
      trigger.setAttribute("aria-expanded", String(isOpening));
      return;
    }

    const action = event.target.closest("[data-profile-action]");
    if (action) {
      const selectedAction = action.dataset.profileAction;
      if (dropdown) dropdown.hidden = true;

      if (selectedAction === "logout") {
        sessionStorage.removeItem(SESSION_KEY);
        renderAuthNavigation();
        closeModal();
        showToast("You have been logged out.");
        return;
      }

      openModal(selectedAction);
      return;
    }

    if (dropdown && !event.target.closest("#vumiProfileMenu")) {
      dropdown.hidden = true;
      const triggerButton = $("#vumiProfileTrigger");
      if (triggerButton) triggerButton.setAttribute("aria-expanded", "false");
    }

    const modalButton = event.target.closest("[data-modal]");
    if (modalButton) {
      const mode = modalButton.dataset.modal;
      if (mode === "login" || mode === "signup") openModal(mode);
    }
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);

  modalBackdrop.addEventListener("click", event => {
    if (event.target === modalBackdrop) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });

  // Expose functions for other parts of the site if needed.
  window.VumiAuth = {
    openModal,
    closeModal,
    getCurrentUser,
    renderAuthNavigation,
    logout() {
      sessionStorage.removeItem(SESSION_KEY);
      renderAuthNavigation();
      closeModal();
    }
  };

  renderAuthNavigation();
})();
/* ==========================================================================
   10. AI Virtual Assistant Chatbot Engine & Handlers
   ========================================================================== */
const assistantPanel = $('#assistantPanel');

$('#assistantFab').addEventListener('click', () => {
  assistantPanel.classList.toggle('open');
});

$('#closeAssistant').addEventListener('click', () => {
  assistantPanel.classList.remove('open');
});

const answers = [
  [/খতিয়ান/i, 'খতিয়ান হলো নির্দিষ্ট জমির রেকর্ড, যেখানে জমির বিবরণ ও রেকর্ডভেদে সংশ্লিষ্ট মালিক/দখল সংক্রান্ত তথ্য থাকতে পারে। খতিয়ান একা চূড়ান্ত মালিকানার প্রমাণ নয়—দলিল ও অন্যান্য রেকর্ড মিলিয়ে দেখুন।'],
  [/নামজারি|মিউটেশন/i, 'নামজারি বা মিউটেশন হলো জমির রেকর্ডে নতুন মালিকের নাম অন্তর্ভুক্ত বা হালনাগাদ করার প্রশাসনিক প্রক্রিয়া। সর্বশেষ নিয়ম ও আবেদন পদ্ধতির জন্য সরকারি ভূমি পোর্টাল দেখুন।'],
  [/দলিল/i, 'দলিল যাচাইয়ের সময় দলিল নম্বর, তারিখ, পক্ষগুলোর তথ্য, জমির তফসিল, দাগ-খতিয়ান ও সংশ্লিষ্ট রেকর্ড মিলিয়ে দেখা গুরুত্বপূর্ণ। মূল নথি ও সরকারি রেকর্ড দিয়ে নিশ্চিত করুন; প্রয়োজনে আইনজীবীর পরামর্শ নিন।'],
  [/দাগ/i, 'দাগ নম্বর হলো জমির নির্দিষ্ট প্লট চিহ্নিত করার নম্বর। মৌজা ও জরিপের ধরন অনুযায়ী নম্বর ভিন্ন হতে পারে।'],
  [/মালিকানা|মালিক/i, 'শুধু অনলাইন সারাংশ দেখে জমির মালিকানা নিশ্চিত করবেন না। মূল দলিল, খতিয়ান, নামজারি, পূর্ববর্তী হস্তান্তর এবং প্রাসঙ্গিক সরকারি রেকর্ড যাচাই করুন।'],
  [/সরকারি|land.gov/i, 'সরকারি ভূমি তথ্য বাতায়ন: https://land.gov.bd/ । এই ওয়েবসাইটে সরাসরি সরকারি রেকর্ড সংযুক্ত নেই।'],
  [/উত্তরাধিকার|ওয়ারিশ/i, 'উত্তরাধিকার নির্ধারণে প্রযোজ্য আইন, পরিবার-সংক্রান্ত তথ্য, দলিল ও সরকারি নথি গুরুত্বপূর্ণ। সাধারণ হিসাবকে চূড়ান্ত আইনি ভাগ ধরে নেবেন না; সংশ্লিষ্ট কর্তৃপক্ষ বা যোগ্য আইনজীবীর সহায়তা নিন.']
];

function addMessage(text, kind) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'assistant-msg ' + (kind === 'user' ? 'user-msg' : 'bot-msg');
  messageDiv.textContent = text;
  
  const assistantBody = $('#assistantBody');
  assistantBody.appendChild(messageDiv);
  assistantBody.scrollTop = assistantBody.scrollHeight;
}

function askAssistant(queryText) {
  if (!queryText.trim()) return;
  
  addMessage(queryText, 'user');
  
  let finalAnswer = 'আমি এই প্রশ্নের নিশ্চিত উত্তর দিতে পারছি না। সরকারি ভূমি পোর্টাল বা সংশ্লিষ্ট ভূমি অফিস থেকে তথ্য নিশ্চিত করুন। AI সহকারীর উত্তর চূড়ান্ত আইনি পরামর্শ নয়।';
  
  for (const [regexPattern, responseText] of answers) {
    if (regexPattern.test(queryText)) {
      finalAnswer = responseText;
      break;
    }
  }
  
  setTimeout(() => {
    addMessage(finalAnswer, 'bot');
  }, 220);
}

$('#assistantForm').addEventListener('submit', e => {
  e.preventDefault();
  const inputEl = $('#assistantInput'); askAssistant(inputEl.value); inputEl.value = ''; });  $$('.quick-prompts button').forEach(quickBtn => {
  quickBtn.addEventListener('click', () => {
    askAssistant(quickBtn.textContent);
  });
});


/* ==========================================================================
   11. Live Clock Controller (এখানে ঘড়ির কোডটি যুক্ত করা হলো)
   ========================================================================== */

(function startLiveClock() {
  function updateClock() {
    const clock = document.getElementById("timeText");
    if (!clock) return;

    const isEnglish = document.documentElement.lang
      .toLowerCase()
      .startsWith("en");

    const locale = isEnglish ? "en-BD" : "bn-BD";

    clock.textContent = new Intl.DateTimeFormat(locale, {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    }).format(new Date());
  }

  function start() {
    updateClock();
    setInterval(updateClock, 1000);

    const observer = new MutationObserver(updateClock);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
/* ==========================================================================
   12. Hero Awareness Card Slider Controller (Added)
   ========================================================================== */
const heroAwarenessData = [
  {
    text: "দলিলের তথ্য, খতিয়ান ও দাগ নম্বর কি একে অপরের সঙ্গে মেলে?",
    footer: "আগে যাচাই করুন, পরে সিদ্ধান্ত নিন"
  },
  {
    text: "বিক্রেতাই কি জমির প্রকৃত মালিক, নাকি অন্য কোনো দাবিদার রয়েছেন?",
    footer: "নামজারি ও সর্বশেষ খতিয়ান মিলিয়ে দেখুন"
  },
  {
    text: "জমিটি কি সরকারি খাস জমি বা অধিগ্রহণের আওতায় পড়েছে?",
    footer: "অনুপলভ্য বা খাস স্ট্যাটাস পরীক্ষা করুন"
  },
  {
    text: "উক্ত জমির বিরুদ্ধে বিজ্ঞ আদালতে কোনো মামলা বা নিষেধাজ্ঞা আছে?",
    footer: "যাচাইয়ের সারাংশ ও রিপোর্ট দেখুন"
  },
  {
    text: "ভূমি সংক্রান্ত সহায়তার জন্য কি করবেন?",
    footer: "কল করুন ১৬১২২"
  }
];
let heroSlideIndex = 0;
function updateHeroSlide(index) {
  const textElem = document.getElementById("awarenessText");
  const footerElem = document.querySelector(".awareness-bottom small");
  const dots = document.querySelectorAll(".awareness-dots i");
  if (!textElem) return;
  // লেখার স্মুথ ট্রানজিশন ইফেক্ট
  textElem.style.opacity = "0";
  setTimeout(() => {
    textElem.innerText = heroAwarenessData[index].text;
    if (footerElem) {
      footerElem.innerText = heroAwarenessData[index].footer;
    }
    textElem.style.opacity = "1";
  }, 200);
  // ডটগুলোর স্টাইল পরিবর্তন করা
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("selected");
    } else {
      dot.classList.remove("selected");
    }
  });
}
// প্রতি ৫ সেকেন্ড পর পর স্বয়ংক্রিয়ভাবে লেখা পরিবর্তন হবে
setInterval(() => {
  heroSlideIndex = (heroSlideIndex + 1) % heroAwarenessData.length;
  updateHeroSlide(heroSlideIndex);
}, 5000);
// ডটে ক্লিক করে ম্যানুয়ালি পরিবর্তন করার সুবিধা
document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".awareness-dots i");
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      heroSlideIndex = i;
      updateHeroSlide(heroSlideIndex);
    });
  });
});
/* ==========================================================
   VumiShondhan Support Form & Login Check
   ========================================================== */
/* ===== VumiShondhan Support Button Fix ===== */

(() => {
  function initSupport() {
    const dialog = document.getElementById("supportDialog");
    const form = document.getElementById("supportForm");
    const feedback = document.getElementById("supportFeedback");
    const closeButton = document.getElementById("closeSupportBtn");

function notify(message, type = "success") {
  const toast = document.getElementById("toast");

  if (!toast) {
    alert(message);
    return;
  }
  toast.textContent = message;
  toast.classList.remove("success", "error");
  toast.classList.add("show", type);
  toast.style.display = "block";

  // রং জোর করে নির্ধারণ করা
  toast.style.setProperty(
    "background-color",
    type === "error" ? "#dc2626" : "#16a34a",
    "important"
  );

  toast.style.setProperty("color", "#ffffff", "important");

  setTimeout(() => {
    toast.classList.remove("show", type);
    toast.style.display = "";
    toast.style.removeProperty("background-color");
    toast.style.removeProperty("color");
  }, 3000);
}

    function openSupport() {
      if (!dialog) {
        notify("Support Form পাওয়া যায়নি। HTML-এর ID পরীক্ষা করুন।", "error");
        return;
      }

      const user = window.VumiAuth?.getCurrentUser?.();

      if (!user) {
        notify("সহায়তা ফর্ম ব্যবহার করতে আগে লগইন করুন।", "error");
        return;
      }

      const nameInput = document.getElementById("supportName");
      const emailInput = document.getElementById("supportEmail");

      if (nameInput) nameInput.value = user.name || "";
      if (emailInput) emailInput.value = user.email || "";

      if (feedback) feedback.textContent = "";

      if (!dialog.open) {
        dialog.showModal();
      }
    }

    // FAQ এবং Footer-এর Support Button
    document.addEventListener("click", (event) => {
      const button = event.target.closest(
        "#openSupportBtn, [data-modal='support']"
      );

      if (!button) return;

      event.preventDefault();
      openSupport();
    });

    closeButton?.addEventListener("click", () => {
      dialog?.close();
    });

    dialog?.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
     
form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const message =
    "✓ আপনার প্রশ্ন সফলভাবে জমা হয়েছে। আমাদের সঙ্গে যোগাযোগ করার জন্য ধন্যবাদ।";

  // ফর্মটি লুকিয়ে দাও
  form.style.display = "none";

  // পুরোনো Feedback লুকিয়ে রাখো
  if (feedback) {
    feedback.style.display = "none";
  }

  // Success Message তৈরি করো
  let successMessage = document.getElementById(
    "supportSuccessMessage"
  );

  if (!successMessage) {
    successMessage = document.createElement("div");
    successMessage.id = "supportSuccessMessage";
    successMessage.className = "support-success-message";
    dialog.appendChild(successMessage);
  }

  successMessage.textContent = message;
  successMessage.style.display = "block";
});

    console.log("VumiShondhan Support handler loaded.");
  }

  // HTML সম্পূর্ণ লোড হওয়ার পর Support Form চালু হবে
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSupport);
  } else {
    initSupport();
  }
})();
