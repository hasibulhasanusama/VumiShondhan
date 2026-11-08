
/* ==========================================================
   VumiShondhan - Feature Form
   Form Submission & Service Integration
   ========================================================== */

(() => {
  "use strict";

  function attachFeatureForm(page, id, feature) {
    const form = page.querySelector("#featureForm");

    form.addEventListener("submit", async event => {
      event.preventDefault();

      const data = Object.fromEntries(
        new FormData(form).entries()
      );

      delete data.demoConsent;

      const result = page.querySelector("#featureResult");
      const service = window.VumiDemoService;
      const ui = window.VumiFeatureUI;
      const calculation = window.VumiFeatureCalculation;
      const report = window.VumiFeatureReport;

      if (!service || typeof service.run !== "function") {
        result.innerHTML = `
          <h3>Demo Service পাওয়া যায়নি</h3>
          <p>
            index.html ফাইলে demo-data.js এবং demo-service.js
            সঠিকভাবে যুক্ত আছে কি না পরীক্ষা করো।
          </p>
        `;

        result.hidden = false;
        return;
      }

      try {
        let output;
        let divisionHTML = "";

        // Inheritance Service
        if (id === "inheritance") {
          output = await service.run("inheritance", data);

          const division = calculation.calculateDivision(data);

          if (!division.valid) {
            result.innerHTML = `
              <h3>সঠিক তথ্য দিন</h3>
              <p>${ui.escapeHTML(division.message)}</p>
            `;

            result.hidden = false;
            return;
          }

          divisionHTML = division.html;

          result.innerHTML =
            ui.renderResult(feature.title, output) + divisionHTML;
        }

        // Other Four Services
        else {
          output = await service.run(id, data);

          result.innerHTML = ui.renderResult(
            feature.title,
            output
          );
        }

        // Report Download Button
        result.innerHTML += `
          <button
            type="button"
            class="feature-submit"
            id="downloadDemoReport"
          >
            রিপোর্ট ডাউনলোড করুন
          </button>
        `;

        result.hidden = false;

        // Download Report
        result.querySelector("#downloadDemoReport")
          .addEventListener("click", () => {
            report.downloadReport(
              service,
              feature.title,
              output,
              id
            );
          });

        result.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      } catch (error) {
        console.error("VumiShondhan Feature Error:", error);

        result.innerHTML = `
          <h3>ফলাফল তৈরি করা যায়নি</h3>
          <p>
            Demo Service-এর সঙ্গে ফিচারের সংযোগ পরীক্ষা করতে হবে।
          </p>
        `;

        result.hidden = false;
      }
    });
  }

  window.VumiFeatureForm = {
    attachFeatureForm
  };

})();
