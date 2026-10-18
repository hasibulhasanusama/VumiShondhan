
/* ==========================================================
   VumiShondhan - Feature Pages & Forms
   Frontend Demo | Backend will be connected later
   ========================================================== */

(() => {
  "use strict";

  const features = {
    "land-search": {
      title: "জমি অনুসন্ধান",
      description: "জমির অবস্থান ও রেকর্ডের পরিচিতি লিখুন।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["upazila", "উপজেলা / থানা", "text", "উপজেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["khatian", "খতিয়ান নম্বর", "text", "খতিয়ান নম্বর", false],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", true],
        ["recordType", "রেকর্ডের ধরন", "select", "রেকর্ড নির্বাচন করুন", false,
          ["CS", "SA", "RS", "BS / BRS", "সকল রেকর্ড"]]
      ]
    },

    ownership: {
      title: "মালিকানা যাচাই",
      description: "মালিকানা-সংক্রান্ত নথির পরিচিতি দিন।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["upazila", "উপজেলা", "text", "উপজেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["khatian", "খতিয়ান নম্বর", "text", "খতিয়ান নম্বর", true],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", true],
        ["deedNo", "দলিল নম্বর (যদি থাকে)", "text", "দলিল নম্বর", false]
      ]
    },

    mutation: {
      title: "নামজারি ও ইতিহাস",
      description: "নামজারি বা পূর্ববর্তী রেকর্ডের পরিচিতি দিন।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["khatian", "খতিয়ান নম্বর", "text", "খতিয়ান নম্বর", false],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", true],
        ["caseNo", "নামজারি কেস নম্বর", "text", "কেস নম্বর (যদি থাকে)", false]
      ]
    },

    case: {
      title: "মামলা-সংক্রান্ত তথ্য",
      description: "জমির পরিচিতি ও মামলা নম্বর থাকলে লিখুন।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["upazila", "উপজেলা", "text", "উপজেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", true],
        ["caseNo", "মামলা নম্বর", "text", "মামলা নম্বর (যদি থাকে)", false]
      ]
    },

    document: {
      title: "দলিল তুলনা",
      description: "যে নথিগুলো তুলনা করতে চান, সেগুলোর পরিচিতি দিন।",
      fields: [
        ["deedNo", "দলিল নম্বর", "text", "দলিল নম্বর", true],
        ["deedDate", "দলিলের তারিখ", "date", "তারিখ নির্বাচন করুন", false],
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["khatian", "খতিয়ান নম্বর", "text", "খতিয়ান নম্বর", false],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", true]
      ]
    },

    map: {
      title: "ভূমি রেকর্ড ও ম্যাপ",
      description: "মৌজা ও জমির অবস্থানের তথ্য দিন।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["upazila", "উপজেলা", "text", "উপজেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", false]
      ]
    },

    khas: {
      title: "খাস জমির অবস্থা",
      description: "খাস জমি-সংক্রান্ত তথ্য যাচাইয়ের জন্য জমি শনাক্ত করুন।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["upazila", "উপজেলা", "text", "উপজেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", true]
      ]
    },

    acquisition: {
      title: "অধিগ্রহণের অবস্থা",
      description: "জমি অধিগ্রহণ-সংক্রান্ত তথ্যের জন্য পরিচিতি দিন।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["upazila", "উপজেলা", "text", "উপজেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", true]
      ]
    },

    inheritance: {
      title: "উত্তরাধিকার অনুসন্ধান",
      description: "উত্তরাধিকার-সংক্রান্ত প্রাথমিক তথ্য দিন। সংবেদনশীল পরিচয়পত্রের নম্বর দেবেন না।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["khatian", "খতিয়ান নম্বর", "text", "খতিয়ান নম্বর", false],
        ["relationship", "সম্পর্ক", "select", "সম্পর্ক নির্বাচন করুন", true,
          ["সন্তান", "স্বামী / স্ত্রী", "পিতা / মাতা", "ভাই / বোন", "অন্যান্য"]]
      ]
    },

    division: {
      title: "জমি ভাগের হিসাব",
      description: "মোট জমির পরিমাণ ও সমান অংশের সংখ্যা দিন।",
      fields: [
        ["totalArea", "মোট জমির পরিমাণ (শতক)", "number", "যেমন: 30", true],
        ["shareCount", "সমান অংশের সংখ্যা", "number", "যেমন: 3", true]
      ]
    },

    law: {
      title: "ভূমি আইন ও গাইড",
      description: "যে বিষয়ে নির্দেশনা চান সেটি নির্বাচন করুন।",
      fields: [
        ["topic", "বিষয় নির্বাচন করুন", "select", "একটি বিষয় নির্বাচন করুন", true,
          ["খতিয়ান ও দাগ", "নামজারি", "দলিল নিবন্ধন", "উত্তরাধিকার", "জমি অধিগ্রহণ", "খাস জমি"]]
      ]
    },

    report: {
      title: "যাচাইয়ের রিপোর্ট",
      description: "রিপোর্টের জন্য জমির পরিচিতি দিন।",
      fields: [
        ["district", "জেলা", "text", "জেলার নাম", true],
        ["upazila", "উপজেলা", "text", "উপজেলার নাম", true],
        ["mouza", "মৌজা", "text", "মৌজার নাম", true],
        ["khatian", "খতিয়ান নম্বর", "text", "খতিয়ান নম্বর", false],
        ["dag", "দাগ নম্বর", "text", "দাগ নম্বর", true]
      ]
    }
  };

  const escapeHTML = value =>
    String(value).replace(/[&<>"']/g, char => ({
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
            ${options.map(option =>
              `<option value="${escapeHTML(option)}">${escapeHTML(option)}</option>`
            ).join("")}
          </select>
        </label>`;
    }

    return `
      <label class="feature-field">
        <span>${escapeHTML(label)}${required ? " *" : ""}</span>
        <input
          name="${escapeHTML(name)}"
          type="${type}"
          placeholder="${type === "date" || type === "number" ? "" : escapeHTML(placeholder)}"
          ${type === "number" ? 'min="0" step="any"' : ""}
          ${required ? "required" : ""}
        >
      </label>`;
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

  // ১. জমি ভাগের হিসাব
  if (id === "division") {
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
        <p>জমির পরিমাণ শূন্যের বেশি এবং অংশের সংখ্যা ধনাত্মক পূর্ণসংখ্যা হতে হবে।</p>
      `;
      result.hidden = false;
      return;
    }

    result.innerHTML = `
      <h3>জমি ভাগের হিসাব</h3>
      <p>মোট জমি: <strong>${area.toLocaleString("bn-BD")} শতক</strong></p>
      <p>সমান অংশ: <strong>${count.toLocaleString("bn-BD")}টি</strong></p>
      <p>প্রতি অংশ: <strong>${(area / count).toLocaleString("bn-BD", {
        maximumFractionDigits: 4
      })} শতক</strong></p>
      <p class="feature-demo-warning">
        এটি সাধারণ গাণিতিক হিসাব, আইনি উত্তরাধিকার নির্ধারণ নয়।
      </p>
    `;

    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  // ২. Demo Service আছে কি না পরীক্ষা
  const service = window.VumiDemoService;

  if (!service) {
    result.innerHTML = `
      <h3>Demo Service পাওয়া যায়নি</h3>
      <p>index.html ফাইলে demo-data.js এবং demo-service.js সঠিকভাবে যুক্ত আছে কি না পরীক্ষা করো।</p>
    `;
    result.hidden = false;
    return;
  }

  // ৩. Feature অনুযায়ী ফলাফল তৈরি
  const output = service.run(id, data);

  const detailRows = (output.details || []).map(([label, value]) => `
    <div class="feature-result-row">
      <span>${escapeHTML(label)}</span>
      <strong>${escapeHTML(value ?? "তথ্য নেই")}</strong>
    </div>
  `).join("");

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

  result.innerHTML = `
    <h3>${escapeHTML(feature.title)} — ফলাফল</h3>

    <p>
      <strong>স্ট্যাটাস:</strong>
      ${escapeHTML(output.status || "তথ্য পাওয়া যায়নি")}
    </p>

    <p>${escapeHTML(output.summary || "")}</p>

    ${detailRows}
    ${lawyerHTML}

    <p class="feature-demo-warning">
      ${escapeHTML(
        output.disclaimer ||
        "DEMO ONLY — সরকারি ডেটাবেসে অনুসন্ধান করা হয়নি।"
      )}
    </p>

    <button
      type="button"
      class="feature-submit"
      id="downloadDemoReport"
    >
      রিপোর্ট ডাউনলোড করুন
    </button>
  `;

  result.hidden = false;

  // ৪. রিপোর্ট ডাউনলোড
  result.querySelector("#downloadDemoReport").addEventListener("click", () => {
    const reportText = service.makeReport(feature.title, output);

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

  result.scrollIntoView({ behavior: "smooth", block: "start" });
}); 

page.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Make feature page available to app.js
  window.openVumiFeature = showFeaturePage;

})();

