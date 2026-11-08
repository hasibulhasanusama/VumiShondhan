
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("landSearchForm");
  const resultsSection = document.getElementById("resultsSection");
  const resultContainer = document.getElementById("resultContainer");
  const resultSummary = document.getElementById("resultSummary");
  const searchButton = document.getElementById("searchButton");
  const resetButton = document.getElementById("resetButton");
  const printButton = document.getElementById("printButton");
  const downloadButton = document.getElementById("downloadButton");

  if (!form) return;

  let latestReport = "";

  // Demo data: এগুলো কোনো সরকারি রেকর্ড নয়।
  const demoRecord = {
    owner: "মোঃ আব্দুল করিম",
    landType: "বসতভিটা",
    landSize: "১০ শতাংশ",
    status: "কাল্পনিক ডেমো রেকর্ড",
    mutation: "ডেমো তথ্য অনুযায়ী সম্পন্ন",
    history: "CS → SA → RS (কাল্পনিক)",
    caseInfo: "কোনো মামলা নেই (ডেমো তথ্য)",
    location: "নমুনা অবস্থান",
    khas: "খাস জমি নয় (ডেমো তথ্য)",
    acquisition: "অধিগ্রহণের তথ্য নেই (ডেমো তথ্য)"
  };

  const sectionNames = {
    ownership: "মালিকানা তথ্য",
    khatian: "খতিয়ান ও রেকর্ড",
    mutation: "নামজারি তথ্য",
    history: "রেকর্ড ইতিহাস",
    case: "মামলার তথ্য",
    location: "জমির অবস্থান",
    khas: "খাস জমির অবস্থা",
    acquisition: "অধিগ্রহণের অবস্থা"
  };

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };

      return entities[character];
    });
  }

  function getFormData() {
    const data = new FormData(form);

    return {
      district: data.get("district") || "",
      upazila: data.get("upazila") || "",
      mouza: data.get("mouza") || "",
      recordType: data.get("recordType") || "উল্লেখ নেই",
      khatian: data.get("khatian") || "উল্লেখ নেই",
      dag: data.get("dag") || "উল্লেখ নেই",
      deed: data.get("deed") || "উল্লেখ নেই",
      sections: data.getAll("sections")
    };
  }

  function addDetail(label, value) {
    return `
      <div class="detail-item">
        <small>${escapeHTML(label)}</small>
        <strong>${escapeHTML(value)}</strong>
      </div>
    `;
  }

  function buildReport(data) {
    const selectedSections = data.sections;
    const details = [];

    // জমির পরিচিতি
    details.push(addDetail("জেলা", data.district));
    details.push(addDetail("উপজেলা / থানা", data.upazila));
    details.push(addDetail("মৌজা", data.mouza || "উল্লেখ নেই"));
    details.push(addDetail("রেকর্ডের ধরন", data.recordType));
    details.push(addDetail("খতিয়ান নম্বর", data.khatian));
    details.push(addDetail("দাগ নম্বর", data.dag));
    details.push(addDetail("দলিল নম্বর", data.deed));

    // নির্বাচিত অতিরিক্ত তথ্য
    if (selectedSections.includes("ownership")) {
      details.push(addDetail("মালিকের নাম", demoRecord.owner));
      details.push(addDetail("জমির ধরন", demoRecord.landType));
    }

    if (selectedSections.includes("khatian")) {
      details.push(addDetail("জমির পরিমাণ", demoRecord.landSize));
      details.push(addDetail("রেকর্ডের অবস্থা", demoRecord.status));
    }

    if (selectedSections.includes("mutation")) {
      details.push(addDetail("নামজারির অবস্থা", demoRecord.mutation));
    }

    if (selectedSections.includes("history")) {
      details.push(addDetail("রেকর্ড ইতিহাস", demoRecord.history));
    }

    if (selectedSections.includes("case")) {
      details.push(addDetail("মামলার তথ্য", demoRecord.caseInfo));
    }

    if (selectedSections.includes("location")) {
      details.push(addDetail("জমির অবস্থান", demoRecord.location));
    }

    if (selectedSections.includes("khas")) {
      details.push(addDetail("খাস জমির অবস্থা", demoRecord.khas));
    }

    if (selectedSections.includes("acquisition")) {
      details.push(addDetail("অধিগ্রহণের অবস্থা", demoRecord.acquisition));
    }

    const selectedNames = selectedSections.map(
      (section) => sectionNames[section]
    );

    return {
      html: `
        <article class="result-card">
          <div class="result-card-header">
            <h3>জমির অনুসন্ধান রিপোর্ট</h3>
            <span class="status-label">ডেমো ফলাফল</span>
          </div>

          <div class="result-details">
            ${details.join("")}
          </div>
        </article>

        <div class="result-note">
          সতর্কতা: এই রিপোর্টে প্রদর্শিত মালিকানা, জমির পরিমাণ,
          নামজারি, মামলা ও অন্যান্য তথ্য সম্পূর্ণ কাল্পনিক।
          এগুলো কোনো সরকারি ডাটাবেস থেকে সংগ্রহ করা হয়নি।
          বাস্তব জমির তথ্য যাচাইয়ের জন্য সংশ্লিষ্ট সরকারি
          ভূমি অফিসের সঙ্গে যোগাযোগ করুন।
        </div>
      `,
      text: [
        "VumiShondhan - সমন্বিত জমি অনুসন্ধান রিপোর্ট",
        "----------------------------------------",
        `জেলা: ${data.district}`,
        `উপজেলা / থানা: ${data.upazila}`,
        `মৌজা: ${data.mouza || "উল্লেখ নেই"}`,
        `রেকর্ডের ধরন: ${data.recordType}`,
        `খতিয়ান নম্বর: ${data.khatian}`,
        `দাগ নম্বর: ${data.dag}`,
        `দলিল নম্বর: ${data.deed}`,
        "",
        "নির্বাচিত তথ্য:",
        ...selectedNames.map((name) => `- ${name}`),
        "",
        `মালিকের নাম (ডেমো): ${selectedSections.includes("ownership") ? demoRecord.owner : "নির্বাচিত নয়"}`,
        `জমির ধরন (ডেমো): ${selectedSections.includes("ownership") ? demoRecord.landType : "নির্বাচিত নয়"}`,
        `জমির পরিমাণ (ডেমো): ${selectedSections.includes("khatian") ? demoRecord.landSize : "নির্বাচিত নয়"}`,
        `নামজারি (ডেমো): ${selectedSections.includes("mutation") ? demoRecord.mutation : "নির্বাচিত নয়"}`,
        `রেকর্ড ইতিহাস (ডেমো): ${selectedSections.includes("history") ? demoRecord.history : "নির্বাচিত নয়"}`,
        `মামলার তথ্য (ডেমো): ${selectedSections.includes("case") ? demoRecord.caseInfo : "নির্বাচিত নয়"}`,
        `জমির অবস্থান (ডেমো): ${selectedSections.includes("location") ? demoRecord.location : "নির্বাচিত নয়"}`,
        `খাস জমি (ডেমো): ${selectedSections.includes("khas") ? demoRecord.khas : "নির্বাচিত নয়"}`,
        `অধিগ্রহণ (ডেমো): ${selectedSections.includes("acquisition") ? demoRecord.acquisition : "নির্বাচিত নয়"}`,
        "",
        "গুরুত্বপূর্ণ: এই রিপোর্টের সব ফলাফল কাল্পনিক ডেমো তথ্য।",
        "এটি কোনো সরকারি ভূমি রেকর্ড বা মালিকানার প্রমাণ নয়।",
        "",
        `রিপোর্ট তৈরি: ${new Date().toLocaleString("bn-BD")}`
      ].join("\n")
    };
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = getFormData();

    if (data.sections.length === 0) {
      alert("অনুগ্রহ করে অন্তত একটি তথ্য নির্বাচন করুন।");
      return;
    }

    searchButton.disabled = true;
    searchButton.querySelector("span").textContent = "অনুসন্ধান হচ্ছে...";

    // এটি আপাতত frontend demo search।
    // পরে এখানে backend API যুক্ত করা যাবে।
    window.setTimeout(() => {
      const report = buildReport(data);

      resultContainer.innerHTML = report.html;
      latestReport = report.text;

      resultSummary.textContent =
        `${data.district}, ${data.upazila} — ডেমো অনুসন্ধান সম্পন্ন`;

      resultsSection.hidden = false;
      searchButton.disabled = false;
      searchButton.querySelector("span").textContent = "অনুসন্ধান করুন";

      resultsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 500);
  });

  resetButton.addEventListener("click", () => {
    window.setTimeout(() => {
      resultsSection.hidden = true;
      resultContainer.innerHTML = "";
      resultSummary.textContent = "";
      latestReport = "";
    }, 0);
  });

  printButton.addEventListener("click", () => {
    if (!latestReport) {
      alert("প্রথমে জমি অনুসন্ধান করুন।");
      return;
    }

    window.print();
  });

  downloadButton.addEventListener("click", () => {
    if (!latestReport) {
      alert("প্রথমে জমি অনুসন্ধান করুন।");
      return;
    }

    const blob = new Blob(
      ["\uFEFF" + latestReport],
      { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "VumiShondhan-Land-Search-Report.txt";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  });
});
