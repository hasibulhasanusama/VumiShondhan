
/* ==========================================================
   VumiShondhan - Feature UI
   HTML Escape, Field Creation & Result Rendering
   ========================================================== */

(() => {
  "use strict";

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function createField(field) {
    const [name, label, type, placeholder, required, options] = field;

    if (type === "select") {
      return `
        <label class="feature-field">
          <span>${escapeHTML(label)}${required ? " *" : ""}</span>
          <select name="${escapeHTML(name)}" ${required ? "required" : ""}>
            <option value="">${escapeHTML(placeholder)}</option>
            ${options.map(option => `
              <option value="${escapeHTML(option)}">${escapeHTML(option)}</option>
            `).join("")}
          </select>
        </label>
      `;
    }

    return `
      <label class="feature-field">
        <span>${escapeHTML(label)}${required ? " *" : ""}</span>
        <input
          name="${escapeHTML(name)}"
          type="${escapeHTML(type)}"
          placeholder="${escapeHTML(placeholder)}"
          ${type === "number" ? 'min="0" step="any"' : ""}
          ${required ? "required" : ""}
        >
      </label>
    `;
  }

  function renderResult(title, output) {
    if (!output || typeof output !== "object") {
      return `
        <h3>${escapeHTML(title)}</h3>
        <p>এই মুহূর্তে ফলাফল তৈরি করা যায়নি।</p>
      `;
    }

    const details = Array.isArray(output.details)
      ? output.details.map(([label, value]) => `
          <div class="feature-result-row">
            <span>${escapeHTML(label)}</span>
            <strong>${escapeHTML(value ?? "তথ্য নেই")}</strong>
          </div>
        `).join("")
      : "";

    let lawyerHTML = "";

    if (output.lawyer) {
      lawyerHTML = `
        <h4>আইনজীবী সম্পর্কিত তথ্য</h4>
        <p>বিশেষজ্ঞ: ${escapeHTML(output.lawyer.type)}</p>
        <p>${escapeHTML(output.lawyer.name)}</p>
        <p>${escapeHTML(output.lawyer.qualification)}</p>
        <p>${escapeHTML(output.lawyer.contact)}</p>
      `;
    }

    return `
      <h3>${escapeHTML(title)} — ফলাফল</h3>

      <p>
        <strong>স্ট্যাটাস:</strong>
        ${escapeHTML(output.status || "তথ্য পাওয়া যায়নি")}
      </p>

      <p>${escapeHTML(output.summary || "")}</p>

      ${details}
      ${lawyerHTML}

      <p class="feature-demo-warning">
        ${escapeHTML(
          output.disclaimer ||
          "DEMO ONLY — সরকারি ডেটাবেসে অনুসন্ধান করা হয়নি।"
        )}
      </p>
    `;
  }

  window.VumiFeatureUI = {
    escapeHTML,
    createField,
    renderResult
  };

})();
