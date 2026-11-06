/* ==========================================================
   VumiShondhan - Combined Feature Pages
   5 Main Services | Frontend Demo
   ========================================================== */

(() => {
  "use strict";

  const features = {
    search: {
      title: "সমন্বিত জমি অনুসন্ধান",
      description: "জমির পরিচিতি দিন। নমুনা তথ্যের ভিত্তিতে বিভিন্ন বিভাগের তথ্য একসঙ্গে দেখুন।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["upazila", "উপজেলা / থানা", "text", "উপজেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["khatian", "খতিয়ান নম্বর", "text", "খতিয়ান নম্বর", false],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", true],
        ["deedNo", "দলিল নম্বর", "text", "দলিল নম্বর (যদি থাকে)", false],
        ["recordType", "রেকর্ডের ধরন", "select", "রেকর্ড নির্বাচন করুন", false,
          ["CS", "SA", "RS", "BS / BRS", "সকল রেকর্ড"]]
      ]
    },

    document: {
      title: "দলিল ও রেকর্ড যাচাই",
      description: "দলিল ও জমির রেকর্ডের পরিচিতি দিয়ে নমুনা তথ্যের তুলনা দেখুন।",
      fields: [
        ["deedNo", "দলিল নম্বর", "text", "দলিল নম্বর", true],
        ["deedDate", "দলিলের তারিখ", "date", "", false],
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["upazila", "উপজেলা", "text", "উপজেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["khatian", "খতিয়ান নম্বর", "text", "খতিয়ান নম্বর", false],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", true]
      ]
    },

    inheritance: {
      title: "উত্তরাধিকার ও জমির বণ্টন",
      description: "উত্তরাধিকার সম্পর্কিত তথ্য অথবা জমির প্রাথমিক ভাগের হিসাব দিন।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["khatian", "খতিয়ান নম্বর", "text", "খতিয়ান নম্বর", false],
        ["relationship", "সম্পর্ক", "select", "সম্পর্ক নির্বাচন করুন", true,
          ["সন্তান", "স্বামী / স্ত্রী", "পিতা / মাতা", "ভাই / বোন", "অন্যান্য"]],
        ["totalArea", "মোট জমির পরিমাণ (শতক)", "number", "যেমন: 30", false],
        ["shareCount", "সমান অংশের সংখ্যা", "number", "যেমন: 3", false]
      ]
    },

    law: {
      title: "ভূমি আইন ও গাইড",
      description: "আপনার প্রয়োজনীয় বিষয় নির্বাচন করে সাধারণ নির্দেশনা দেখুন।",
      fields: [
        ["topic", "বিষয় নির্বাচন করুন", "select", "একটি বিষয় নির্বাচন করুন", true,
          ["খতিয়ান ও দাগ", "নামজারি", "দলিল নিবন্ধন", "উত্তরাধিকার", "জমি অধিগ্রহণ", "খাস জমি"]]
      ]
    },

    report: {
      title: "সমন্বিত যাচাই রিপোর্ট",
      description: "জমির পরিচিতি দিয়ে নমুনা তথ্যের সারাংশ তৈরি করুন।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["upazila", "উপজেলা", "text", "উপজেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["khatian", "খতিয়ান নম্বর", "text", "খতিয়ান নম্বর", false],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", true],
        ["deedNo", "দলিল নম্বর", "text", "দলিল নম্বর (যদি থাকে)", false]
      ]
    }
  };

  const escapeHTML = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

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

    page.innerHTML = `
      <div class="feature-page-inner">

        <button type="button" class="feature-back" id="featureBack">
          ← সেবাসমূহে ফিরে যান
        </button>

        <div class="feature-page-heading">
          <span class="mini-label">VumiShondhan Services</span>
          <h2>${escapeHTML(feature.title)}</h2>
          <p>${escapeHTML(feature.description)}</p>
        </div>

        <form id="featureForm" class="feature-form">

          <div class="feature-form-grid">
            ${feature.fields.map(createField).join("")}
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

        <div id="featureResult" class="feature-result" hidden></div>

      </div>
    `;

    page.hidden = false;
    document.body.classList.add("feature-page-open");

    page.querySelector("#featureBack").addEventListener("click", () => {
      page.hidden = true;
      document.body.classList.remove("feature-page-open");
    });

    page.querySelector("#featureForm").addEventListener("submit", event => {
      event.preventDefault();

      const form = event.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries());

      delete data.demoConsent;

      const result = page.querySelector("#featureResult");
      const service = window.VumiDemoService;

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

        // ১. উত্তরাধিকার ও জমির বণ্টন
        if (id === "inheritance") {
          output = service.run("inheritance", data);

          let divisionHTML = "";

          if (data.totalArea !== "" && data.shareCount !== "") {
            const area = Number(data.totalArea);
            const count = Number(data.shareCount);

            if (
              !Number.isFinite(area) ||
              area <= 0 ||
              !Number.isInteger(count) ||
              count <= 0
            ) {
              result.innerHTML = `
                <h3>সঠিক তথ্য দিন</h3>
                <p>
                  জমির পরিমাণ শূন্যের বেশি এবং অংশের সংখ্যা
                  ধনাত্মক পূর্ণসংখ্যা হতে হবে।
                </p>
              `;
              result.hidden = false;
              return;
            }

            const divisionOutput = service.run("division", data);

            divisionHTML = `
              <div class="feature-result-row">
                <span>মোট জমি</span>
                <strong>${area.toLocaleString("bn-BD")} শতক</strong>
              </div>

              <div class="feature-result-row">
                <span>সমান অংশ</span>
                <strong>${count.toLocaleString("bn-BD")}টি</strong>
              </div>

              <div class="feature-result-row">
                <span>প্রতি অংশ</span>
                <strong>
                  ${(area / count).toLocaleString("bn-BD", {
                    maximumFractionDigits: 4
                  })} শতক
                </strong>
              </div>

              <p class="feature-demo-warning">
                এটি সাধারণ গাণিতিক হিসাব, আইনি উত্তরাধিকার নির্ধারণ নয়।
              </p>
            `;
          }

          result.innerHTML =
            renderResult(feature.title, output) + divisionHTML;
        }

        // ২. অন্য চারটি সার্ভিস
        else {
          output = service.run(id, data);
          result.innerHTML = renderResult(feature.title, output);
        }

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

        // ৩. রিপোর্ট ডাউনলোড
        result.querySelector("#downloadDemoReport")
          .addEventListener("click", () => {

            const reportText = service.makeReport(
              feature.title,
              output
            );

            const blob = new Blob(["\uFEFF", reportText], {
              type: "text/plain;charset=utf-8"
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `VumiShondhan-${id}-report.txt`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            setTimeout(() => URL.revokeObjectURL(url), 1000);
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

    page.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // app.js থেকে নতুন ৫টি সার্ভিস খোলার জন্য
  window.openVumiFeature = showFeaturePage;

})();
