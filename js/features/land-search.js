"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("landSearchForm");
  if (!form) return;

  const panels = [...document.querySelectorAll(".step-panel")];
  const progressBar = document.getElementById("progressBar");
  const progressTitle = document.getElementById("progressTitle");
  const progressPercent = document.getElementById("progressPercent");
  const backButton = document.getElementById("backButton");
  const nextButton = document.getElementById("nextButton");
  const newSearchButton = document.getElementById("newSearchButton");
  const reviewContent = document.getElementById("reviewContent");
  const resultContainer = document.getElementById("resultContainer");
  const confirmData = document.getElementById("confirmData");
  const STORAGE_KEY = "vumiShondhanLandSearch_v2";

  const stepNames = ["জমির পরিচিতি", "সেবা নির্বাচন", "তথ্য যাচাই", "রিপোর্ট"];
  const serviceNames = {
    ownership:"মালিকানা তথ্য", khatian:"খতিয়ান ও রেকর্ড",
    mutation:"নামজারি তথ্য", history:"রেকর্ড ইতিহাস",
    case:"মামলার তথ্য", location:"জমির অবস্থান",
    khas:"খাস জমির অবস্থা", acquisition:"অধিগ্রহণের অবস্থা"
  };

  let currentStep = 1;
  let reportText = "";
  let reportId = "";

  function getData() {
    const data = Object.fromEntries(new FormData(form).entries());
    data.sections = [...form.querySelectorAll('input[name="sections"]:checked')].map(x => x.value);
    return data;
  }

  function saveData() {
    const saved = { data:getData(), currentStep, confirmed:confirmData.checked };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }

  function restoreData() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved) return;
      Object.entries(saved.data || {}).forEach(([key,value]) => {
        if (key === "sections") return;
        const field = form.elements.namedItem(key);
        if (field) field.value = value;
      });
      (saved.data?.sections || []).forEach(value => {
        const checkbox = form.querySelector(`input[name="sections"][value="${value}"]`);
        if (checkbox) checkbox.checked = true;
      });
      confirmData.checked = Boolean(saved.confirmed);
      currentStep = Math.min(Math.max(Number(saved.currentStep) || 1,1),4);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    })[c]);
  }

  function showStep(step) {
    currentStep = step;
    panels.forEach(panel => panel.hidden = Number(panel.dataset.step) !== step);
    const percent = step * 25;
    progressBar.style.width = percent + "%";
    progressPercent.textContent = percent + "%";
    progressTitle.textContent = `Step ${step} of 4 · ${stepNames[step-1]}`;
    document.querySelectorAll("[data-progress-step]").forEach(item => {
      item.classList.toggle("active", Number(item.dataset.progressStep) <= step);
    });
    backButton.disabled = step === 1;
    nextButton.hidden = step === 4;
    newSearchButton.hidden = step !== 4;
    if (step === 3) renderReview();
    saveData();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function detail(label,value) {
    return `<div class="detail-item"><small>${escapeHTML(label)}</small><strong>${escapeHTML(value || "উল্লেখ নেই")}</strong></div>`;
  }

  function renderReview() {
    const d = getData();
    const rows = [
      ["জেলা",d.district],["উপজেলা / থানা",d.upazila],["মৌজা",d.mouza],
      ["জমির ধরন",d.landType],["জমির পরিমাণ",d.area],["খতিয়ানের ধরন",d.recordType],
      ["খতিয়ান নম্বর",d.khatian],["দাগ নম্বর",d.dag],["দলিল নম্বর",d.deed],
      ["অতিরিক্ত বিবরণ",d.description],
      ["নির্বাচিত সেবা",d.sections.map(x=>serviceNames[x]).join(", ")]
    ];
    reviewContent.innerHTML = rows.map(([a,b])=>detail(a,b)).join("");
  }

  function landDrawing(type) {
    const isWater = type === "জলাশয়";
    const isFarm = type === "কৃষিজমি";
    const isBusiness = type === "বাণিজ্যিক জমি";
    const ground = isWater ? "#b9e3ed" : isFarm ? "#d9e9b5" : "#dcebd7";
    let feature = "";
    if (isWater) {
      feature = '<path d="M30 115 Q80 90 130 115 T270 115 V190 H30Z" fill="#55b8d0"/><path d="M35 135 Q85 115 135 135 T265 135" fill="none" stroke="#e9fbff" stroke-width="3"/>';
    } else if (isFarm) {
      feature = Array.from({length:7},(_,i)=>`<path d="M${48+i*31} 55 L${48+i*31} 180" stroke="#6b9c43" stroke-width="5" stroke-dasharray="8 5"/>`).join("");
    } else if (isBusiness) {
      feature = '<rect x="85" y="70" width="125" height="95" rx="5" fill="#b8c4c5" stroke="#607a70" stroke-width="3"/><rect x="103" y="90" width="25" height="25" fill="#e9f5f5"/><rect x="145" y="90" width="25" height="25" fill="#e9f5f5"/><rect x="185" y="90" width="15" height="75" fill="#788f87"/>';
    } else if (type === "বসতভিটা") {
      feature = '<rect x="95" y="78" width="95" height="72" fill="#e8c69a" stroke="#8b6240" stroke-width="3"/><path d="M80 80 L142 35 L205 80Z" fill="#a95d43"/><rect x="133" y="108" width="23" height="42" fill="#80553d"/>';
    } else {
      feature = '<rect x="105" y="80" width="85" height="65" fill="#d7c4a6" stroke="#987e5b" stroke-width="3"/>';
    }
    return `<svg class="land-svg" viewBox="0 0 300 210" role="img" aria-label="জমির ধারণামূলক নকশা">
      <rect width="300" height="210" fill="${ground}"/>
      <path d="M10 25 H290 V185 H10Z" fill="none" stroke="#365f39" stroke-width="4" stroke-dasharray="8 4"/>
      <path d="M15 170 H285" stroke="#b6a98c" stroke-width="17"/>
      ${feature}
      <g fill="#3e8b4b"><circle cx="55" cy="65" r="10"/><circle cx="245" cy="70" r="12"/><circle cx="55" cy="145" r="9"/></g>
      <g fill="#fff" font-size="10"><text x="18" y="15">N ↑</text><text x="210" y="202">ILLUSTRATIVE</text></g>
    </svg>`;
  }

  function surveyDrawing(d) {
    return `<svg class="land-svg" viewBox="0 0 300 210" role="img" aria-label="ধারণামূলক সার্ভে নকশা">
      <rect width="300" height="210" fill="#f7f8f1"/>
      <g stroke="#dce5db" stroke-width="1"><path d="M20 20H280 M20 50H280 M20 80H280 M20 110H280 M20 140H280 M20 170H280"/><path d="M30 10V190 M60 10V190 M90 10V190 M120 10V190 M150 10V190 M180 10V190 M210 10V190 M240 10V190 M270 10V190"/></g>
      <path d="M65 48 L220 35 L245 150 L82 165Z" fill="#d9e9d4" stroke="#17633a" stroke-width="3"/>
      <path d="M65 48 L220 35 M82 165 L245 150" stroke="#17633a" stroke-width="1.5" stroke-dasharray="5 3"/>
      <g fill="#244c35" font-size="10"><text x="130" y="95">দাগ: ${escapeHTML(d.dag || "উল্লেখ নেই")}</text><text x="125" y="110">খতিয়ান: ${escapeHTML(d.khatian || "উল্লেখ নেই")}</text><text x="115" y="180">ধারণামূলক সীমানা</text><text x="265" y="25">N ↑</text><text x="120" y="25">Not to scale</text></g>
    </svg>`;
  }

  function buildReport() {
    const d = getData();
    reportId = "VS-" + Date.now().toString(36).toUpperCase();
    const selected = d.sections.map(x=>serviceNames[x]).join("، ");
    const generated = new Date().toLocaleString("bn-BD");
    const fields = [
      ["জেলা",d.district],["উপজেলা / থানা",d.upazila],["মৌজা",d.mouza],
      ["জমির ধরন",d.landType],["জমির পরিমাণ",d.area],["খতিয়ানের ধরন",d.recordType],
      ["খতিয়ান নম্বর",d.khatian],["দাগ নম্বর",d.dag],["দলিল নম্বর",d.deed],
      ["অতিরিক্ত বিবরণ",d.description]
    ];
    const selectedInfo = d.sections.map(x=>`<div class="detail-item"><small>${escapeHTML(serviceNames[x])}</small><strong>সরকারি তথ্য সংযুক্ত নয় — যাচাই প্রয়োজন</strong></div>`).join("");
    const textRows = fields.map(([a,b])=>`${a}: ${b || "উল্লেখ নেই"}`);
    reportText = [
      "VumiShondhan - Land Search Demo Report",
      `Report ID: ${reportId}`,`Date: ${generated}`,"",
      ...textRows,"",`নির্বাচিত সেবা: ${selected}`,
      "সতর্কতা: এই রিপোর্টে কোনো সরকারি রেকর্ড যাচাই করা হয়নি।",
      "এটি মালিকানা বা আইনি প্রমাণ নয়।"
    ].join("\n");

    resultContainer.innerHTML = `
      <div class="report-meta"><span>Report ID: <strong>${reportId}</strong></span><span>তৈরির সময়: ${generated}</span></div>
      <section class="report-section"><h3>১. জমির পরিচিতি</h3><div class="result-details">${fields.map(([a,b])=>detail(a,b)).join("")}</div></section>
      <section class="report-section"><h3>২. নির্বাচিত সেবা</h3><div class="result-details">${selectedInfo || detail("সেবা","নির্বাচিত হয়নি")}</div></section>
      <section class="report-section"><h3>৩. Land Layout ও Illustration</h3><div class="illustration-grid">
        <div class="illustration-card"><h4>Land Layout</h4>${landDrawing(d.landType)}</div>
        <div class="illustration-card"><h4>Land Type Illustration</h4>${landDrawing(d.landType)}</div>
      </div></section>
      <section class="report-section"><h3>৪. Survey-style Map</h3><div class="illustration-card">${surveyDrawing(d)}</div><p class="result-note">এটি ধারণামূলক নকশা; প্রকৃত জরিপ, পরিমাপ বা সরকারি cadastral map নয়।</p></section>
      <section class="report-section"><h3>৫. জমির অবস্থান</h3><div class="map-placeholder"><div><strong>📍 Map Integration Area</strong><p>${escapeHTML(d.mouza || "মৌজা উল্লেখ নেই")}, ${escapeHTML(d.upazila)}, ${escapeHTML(d.district)}</p><small>এখানে ভবিষ্যতে অনুমোদিত Map Provider যুক্ত করা যাবে।</small></div></div></section>
      <div class="result-note"><strong>গুরুত্বপূর্ণ সতর্কতা:</strong> এই রিপোর্টটি ব্যবহারকারীর দেওয়া তথ্য ও ধারণামূলক চিত্র দিয়ে তৈরি Demo Report। মালিকানা, খতিয়ান, নামজারি, মামলা, খাস জমি বা অধিগ্রহণের কোনো সরকারি তথ্য যাচাই করা হয়নি। আইনগত সিদ্ধান্তের আগে সংশ্লিষ্ট ভূমি অফিস ও অনুমোদিত সরকারি উৎস থেকে যাচাই করুন।</div>`;
    document.getElementById("resultSummary").textContent = `${d.district}, ${d.upazila} — Demo Report তৈরি হয়েছে`;
  }

  nextButton.addEventListener("click", () => {
    if (currentStep === 1 && !form.querySelector('[data-step="1"]').querySelector("input,select").checkValidity()) {
      form.reportValidity(); return;
    }
    if (currentStep === 1) {
      const district = document.getElementById("district");
      const upazila = document.getElementById("upazila");
      if (!district.value || !upazila.value.trim() || !document.getElementById("landType").value) {
        form.reportValidity();
        if (!district.value) district.focus();
        else if (!upazila.value.trim()) upazila.focus();
        else document.getElementById("landType").focus();
        return;
      }
    }
    if (currentStep === 2 && !form.querySelector('input[name="sections"]:checked')) {
      alert("অন্তত একটি সেবা নির্বাচন করুন।"); return;
    }
    if (currentStep === 3) {
      if (!confirmData.checked) {
        alert("আগে তথ্য নিশ্চিত করার checkbox-এ টিক দিন।"); return;
      }
      buildReport();
    }
    showStep(Math.min(currentStep + 1,4));
  });

  backButton.addEventListener("click", () => {
    if (currentStep > 1) showStep(currentStep - 1);
  });

  form.addEventListener("input", saveData);
  form.addEventListener("change", saveData);
  confirmData.addEventListener("change", saveData);

  document.getElementById("printButton").addEventListener("click", () => window.print());

  document.getElementById("downloadButton").addEventListener("click", () => {
    if (!reportText) return;
    const blob = new Blob(["\uFEFF" + reportText],{type:"text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;a.download = `${reportId}-VumiShondhan-Report.txt`;
    document.body.appendChild(a);a.click();a.remove();
    URL.revokeObjectURL(url);
  });

  newSearchButton.addEventListener("click", () => {
    if (!confirm("নতুন অনুসন্ধান শুরু করবেন? বর্তমান তথ্য মুছে যাবে।")) return;
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
    reportText = "";reportId = "";
    confirmData.checked = false;
    showStep(1);
  });

  restoreData();
  showStep(currentStep);
});
