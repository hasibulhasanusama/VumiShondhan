
/* ==========================================================
   VumiShondhan - Feature Calculation
   Land Area Validation & Division Calculation
   ========================================================== */

(() => {
  "use strict";

  function calculateDivision(data) {
    const area = Number(data.totalArea);
    const count = Number(data.shareCount);

    if (
      data.totalArea === "" ||
      data.shareCount === ""
    ) {
      return {
        valid: true,
        html: ""
      };
    }

    if (
      !Number.isFinite(area) ||
      area <= 0 ||
      !Number.isInteger(count) ||
      count <= 0
    ) {
      return {
        valid: false,
        message: "জমির পরিমাণ শূন্যের বেশি এবং অংশের সংখ্যা ধনাত্মক পূর্ণসংখ্যা হতে হবে।"
      };
    }

    const divisionOutput = window.VumiDemoService.run(
      "division",
      data
    );

    const html = `
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

    return {
      valid: true,
      html,
      divisionOutput
    };
  }

  window.VumiFeatureCalculation = {
    calculateDivision
  };

})();
