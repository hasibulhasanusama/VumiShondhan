/* VumiShondhan - PostgreSQL API Service */

(() => {
  "use strict";

  const API_BASE = "http://localhost:5000/api";

  async function request(endpoint) {
    const response = await fetch(`${API_BASE}${endpoint}`);
    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      throw new Error(result.message || "API request failed");
    }

    return result;
  }

  function queryString(data) {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value).trim()) {
        params.set(key, String(value).trim());
      }
    });

    return params.toString();
  }

  function notFound(message = "কোনো মিল পাওয়া যায়নি।") {
    return {
      status: "তথ্য পাওয়া যায়নি",
      summary: message,
      details: [],
      disclaimer: "এটি কাল্পনিক demo তথ্য। সরকারি ভূমি রেকর্ড নয়।"
    };
  }

  function landDetails(land) {
    return [
      ["জেলা", land.district],
      ["উপজেলা", land.upazila],
      ["মৌজা", land.mouza],
      ["খতিয়ান নম্বর", land.khatian_no],
      ["দাগ নম্বর", land.dag_no],
      ["মালিকের নাম", land.owner_name],
      ["জমির পরিমাণ", land.land_area_decimal ? `${land.land_area_decimal} শতক` : "তথ্য নেই"],
      ["জমির ধরন", land.land_type],
      ["জমির অবস্থা", land.land_status],
      ["Land ID", land.id]
    ].filter(item => item[1] !== undefined && item[1] !== null);
  }

  async function searchLand(data) {
    const query = queryString({
      district: data.district,
      upazila: data.upazila,
      mouza: data.mouza,
      khatian: data.khatian,
      dag: data.dag
    });

    const result = await request(`/lands/search?${query}`);

    if (!result.data?.length) {
      return notFound("এই তথ্য অনুযায়ী কোনো demo জমির রেকর্ড পাওয়া যায়নি।");
    }

    const land = result.data[0];

    return {
      status: "DEMO MATCH",
      summary: `${result.total}টি সম্ভাব্য demo রেকর্ড পাওয়া গেছে।`,
      details: landDetails(land),
      disclaimer: result.message
    };
  }

  async function verifyDocument(data) {
    const query = queryString({
      document_no: data.deedNo,
      district: data.district,
      khatian: data.khatian,
      dag: data.dag
    });

    const result = await request(`/documents/verify?${query}`);

    if (!result.data?.length) {
      return notFound("এই তথ্য অনুযায়ী কোনো demo দলিল পাওয়া যায়নি।");
    }

    const document = result.data[0];

    return {
      status: "DEMO DOCUMENT FOUND",
      summary: `${result.total}টি demo দলিলের রেকর্ড পাওয়া গেছে।`,
      details: [
        ["দলিল নম্বর", document.document_no],
        ["দলিলের ধরন", document.document_type],
        ["দলিলের তারিখ", document.issue_date || "তথ্য নেই"],
        ["যাচাইয়ের অবস্থা", document.verification_status],
        ["মালিকের নাম", document.owner_name],
        ["জেলা", document.district],
        ["উপজেলা", document.upazila],
        ["মৌজা", document.mouza],
        ["খতিয়ান", document.khatian_no],
        ["দাগ", document.dag_no],
        ["Land ID", document.land_id]
      ],
      disclaimer: result.message
    };
  }

  async function inheritance(data) {
    const query = queryString({
      district: data.district,
      mouza: data.mouza,
      khatian: data.khatian
    });

    const search = await request(`/lands/search?${query}`);

    if (!search.data?.length) {
      return notFound("উত্তরাধিকার তথ্যের জন্য কোনো matching demo জমি পাওয়া যায়নি।");
    }

    const land = search.data[0];
    const result = await request(`/inheritance/${land.id}`);

    return {
      status: "DEMO OWNERSHIP INFORMATION",
      summary: `${result.total_owners} জনের demo মালিকানা তথ্য পাওয়া গেছে।`,
      details: [
        ["জেলা", result.land.district],
        ["উপজেলা", result.land.upazila],
        ["মৌজা", result.land.mouza],
        ["খতিয়ান", result.land.khatian_no],
        ["দাগ", result.land.dag_no],
        ["জমির পরিমাণ", `${result.land.land_area_decimal} শতক`],
        ["নির্বাচিত সম্পর্ক", data.relationship || "উল্লেখ করা হয়নি"],
        ...result.owners.map((owner, index) => [
          `মালিক ${index + 1}`,
          `${owner.owner_name} — ${owner.share} (${owner.percentage}%)`
        ])
      ],
      disclaimer: result.message
    };
  }

  async function law(data) {
    const topicMap = {
      "খতিয়ান ও দাগ": "Land Record",
      "নামজারি": "Mutation",
      "দলিল নিবন্ধন": "Document",
      "উত্তরাধিকার": "Inheritance"
    };

    const topic = data.topic || "";
    const category = topicMap[topic];
    const query = category
      ? queryString({ category })
      : queryString({ search: topic });

    const result = await request(`/law?${query}`);

    if (!result.data?.length) {
      return notFound("এই বিষয়ের কোনো demo guide এখনো database-এ নেই।");
    }

    return {
      status: "DEMO GUIDE FOUND",
      summary: `${result.total}টি শিক্ষামূলক demo guide পাওয়া গেছে।`,
      details: result.data.flatMap((guide, index) => [
        [`গাইড ${index + 1}`, guide.title],
        ["বিষয়", guide.category],
        ["বিস্তারিত", guide.content],
        ["Source note", guide.source_note]
      ]),
      disclaimer: result.message
    };
  }

  async function report(data) {
    const query = queryString({
      district: data.district,
      upazila: data.upazila,
      mouza: data.mouza,
      khatian: data.khatian,
      dag: data.dag
    });

    const search = await request(`/lands/search?${query}`);

    if (!search.data?.length) {
      return notFound("রিপোর্ট তৈরির জন্য কোনো matching demo জমি পাওয়া যায়নি।");
    }

    const land = search.data[0];
    const result = await request(`/reports/${land.id}`);
    const reportData = result.report;

    const details = [
      ...landDetails(reportData.land),
      ["মোট মালিক", reportData.ownership.total_owners],
      ["মোট দলিল", reportData.documents.total],
      ["মোট নামজারি রেকর্ড", reportData.mutations.total],
      ["মোট মামলা রেকর্ড", reportData.cases.total]
    ];

    reportData.ownership.records.forEach((owner, index) => {
      details.push([
        `মালিক ${index + 1}`,
        `${owner.owner_name} (${owner.share_numerator}/${owner.share_denominator})`
      ]);
    });

    reportData.documents.records.forEach((document, index) => {
      details.push([
        `দলিল ${index + 1}`,
        `${document.document_no} — ${document.verification_status}`
      ]);
    });

    reportData.mutations.records.forEach((mutation, index) => {
      details.push([
        `নামজারি ${index + 1}`,
        `${mutation.application_no} — ${mutation.application_status}`
      ]);
    });

    reportData.cases.records.forEach((item, index) => {
      details.push([
        `মামলা ${index + 1}`,
        `${item.case_no} — ${item.case_status}`
      ]);
    });

    return {
      status: "DEMO REPORT GENERATED",
      summary: "Database থেকে সমন্বিত demo রিপোর্ট তৈরি হয়েছে।",
      details,
      disclaimer: result.message
    };
  }

  async function run(feature, data) {
    switch (feature) {
      case "search":
        return searchLand(data);

      case "document":
        return verifyDocument(data);

      case "inheritance":
        return inheritance(data);

      case "law":
        return law(data);

      case "report":
        return report(data);

      default:
        throw new Error("Unknown feature: " + feature);
    }
  }

  function makeReport(title, result) {
    return [
      "VumiShondhan - Demo Report",
      "==========================",
      `Feature: ${title}`,
      `Status: ${result.status}`,
      `Summary: ${result.summary}`,
      "",
      ...(result.details || []).map(
        ([label, value]) => `${label}: ${value ?? "তথ্য নেই"}`
      ),
      "",
      result.disclaimer || "Fictional demo information only."
    ].join("\n");
  }

  window.VumiDemoService = {
    run,
    makeReport
  };
})();
