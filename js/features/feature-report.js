
/* ==========================================================
   VumiShondhan - Feature Report
   Download TXT Report
   ========================================================== */

(() => {
  "use strict";

  function downloadReport(service, title, output, id) {
    const reportText = service.makeReport(title, output);

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
  }

  window.VumiFeatureReport = {
    downloadReport
  };

})();
