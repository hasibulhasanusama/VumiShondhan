
/* ==========================================================
   VumiShondhan - Feature Controller
   Connects All Feature Modules
   ========================================================== */

(() => {
  "use strict";

  const features = window.VumiFeatureData;
  const ui = window.VumiFeatureUI;
  const form = window.VumiFeatureForm;

  // Check Required Modules
  if (!features || !ui || !form) {
    console.error("VumiShondhan Feature Modules are missing.");
    return;
  }

  function showFeaturePage(id) {
    const feature = features[id];

    if (!feature) return;

    let page = document.getElementById("featurePage");

    if (!page) {
      page = document.createElement("section");
      page.id = "featurePage";
      page.className = "feature-page";
      page.setAttribute("aria-live", "polite");

      document.body.appendChild(page);
    }

    // Create Feature Page
    page.innerHTML = `
      <div class="feature-page-inner">

        <button
          type="button"
          class="feature-back"
          id="featureBack"
        >
          ← সেবাসমূহে ফিরে যান
        </button>

        <div class="feature-page-heading">
          <span class="mini-label">
            VumiShondhan Services
          </span>

          <h2>${ui.escapeHTML(feature.title)}</h2>

          <p>${ui.escapeHTML(feature.description)}</p>
        </div>

        <form id="featureForm" class="feature-form">

          <div class="feature-form-grid">
            ${feature.fields.map(field => ui.createField(field)).join("")}
          </div>

          <label class="feature-consent">
            <input type="checkbox" name="demoConsent" required>

            <span>
              আমি বুঝেছি এটি একটি Frontend Demo এবং বর্তমানে
              সরকারি রেকর্ড যাচাই করে না।
            </span>
          </label>

          <button class="feature-submit" type="submit">
            তথ্য জমা দিন <span>→</span>
          </button>

        </form>

        <div
          id="featureResult"
          class="feature-result"
          hidden
        ></div>

      </div>
    `;

    page.hidden = false;

    document.body.classList.add("feature-page-open");

    // Back Button
    page.querySelector("#featureBack")
      .addEventListener("click", () => {
        page.hidden = true;

        document.body.classList.remove("feature-page-open");
      });

    // Connect Form Module
    form.attachFeatureForm(page, id, feature);

    page.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // Global Feature Access
  window.openVumiFeature = showFeaturePage;

})();
