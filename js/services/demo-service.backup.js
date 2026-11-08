
/* VumiShondhan - Demo Search and Report Service */

(() => {
  "use strict";

  const records = () => window.VumiDemoData.records;

  const normalize = value =>
    String(value ?? "").trim().toLocaleLowerCase("bn");

  function findRecords(input) {
    const keys = [
      "district", "upazila", "mouza",
      "khatian", "dag", "deedNo"
    ];

    const supplied = keys.filter(
      key => String(input[key] ?? "").trim() !== ""
    );

    if (!supplied.length) return [];

    return records().filter(record =>
      supplied.every(key =>
        normalize(record[key] ?? "") === normalize(input[key])
      )
    );
  }

  function run(feature, input) {
    if (feature === "division") {
      const area = Number(input.totalArea);
      const count = Number(input.shareCount);

      if (
        !Number.isFinite(area) ||
        area <= 0 ||
        !Number.isInteger(count) ||
        count <= 0
      ) {
        return {
          status: "INVALID INPUT",
          summary: "জমির পরিমাণ ও অংশের সংখ্যা সঠিকভাবে দিন।",
          details: []
        };
      }

      return {
        status: "CALCULATION COMPLETE",
        summary: `প্রতি অংশে ${area / count} শতক হবে।`,
        details: [
          ["মোট জমি", `${area} শতক`],
          ["অংশের সংখ্যা", count],
          ["প্রতি অংশ", `${area / count} শতক`]
        ]
      };
    }

    if (feature === "law") {
      const guide = window.VumiDemoData.guides[input.topic];

      if (!guide) {
        return {
          status: "INFORMATION NOT FOUND",
          summary: "এই বিষয়ের গাইড পাওয়া যায়নি।",
          details: []
        };
      }

      return {
        status: "GENERAL GUIDE",
        summary: guide.title,
        details: guide.steps.map(
          (step, i) => [`করণীয় ${i + 1}`, step]
        ),
        lawyer: {
          type: guide.lawyerType,
          ...window.VumiDemoData.demoLawyer
        },
        disclaimer:
          "সাধারণ তথ্য; এটি আইনি পরামর্শ নয়। আইনজীবীর প্রোফাইলটি কাল্পনিক।"
      };
    }

    const matches = findRecords(input);

    if (!matches.length) {
      return {
        status: "INFORMATION NOT FOUND",
        summary:
          "আপনার তথ্য পাওয়া যায়নি। এটি শুধু ডেমো ডেটায় না মেলার ফলাফল।",
        details: [],
        disclaimer:
          "এতে বাস্তব জমির অস্তিত্ব বা অবস্থা সম্পর্কে সিদ্ধান্ত নেওয়া যাবে না।"
      };
    }

    const record = matches[0];

    let status = "DEMO MATCH";
    let summary =
      "তথ্য নমুনা রেকর্ডের সঙ্গে মিলেছে; এটি সরকারি যাচাই নয়।";

    if (
      record.recordOwner &&
      record.documentOwner &&
      normalize(record.recordOwner) !== normalize(record.documentOwner)
    ) {
      status = "REVIEW REQUIRED";
      summary =
        "দলিল ও রেকর্ডে মালিকের নামের অমিল আছে। মূল নথি যাচাই করুন।";
    }

    const details = [
      ["নমুনা রেকর্ড ID", record.id],
      ["জেলা", record.district],
      ["উপজেলা", record.upazila],
      ["মৌজা", record.mouza],
      ["খতিয়ান নম্বর", record.khatian],
      ["দাগ নম্বর", record.dag],
      ["রেকর্ডে থাকা মালিকের নাম",
        record.recordOwner || record.owner || "তথ্য নেই"],
      ["দলিলে থাকা মালিকের নাম",
        record.documentOwner || "তথ্য নেই"],
      ["পূর্ববর্তী মালিকের নাম",
        record.previousOwner || "তথ্য নেই"],
      ["জমির পরিমাণ", `${record.area} শতক`]
    ];

    const extras = {
      mutation: [
        ["নামজারির নমুনা তথ্য", record.mutationStatus]
      ],
      case: [
        ["মামলার নমুনা তথ্য", record.caseStatus]
      ],
      khas: [
        ["খাস জমির নমুনা তথ্য", record.khasStatus]
      ],
      acquisition: [
        ["অধিগ্রহণের নমুনা তথ্য", record.acquisitionStatus]
      ],
      document: [
        ["নমুনা দলিল নম্বর", record.deedNo],
        ["নমুনা সমস্যা", record.issue]
      ],
      map: [
        ["ম্যাপ", "প্রকৃত ম্যাপ সংযুক্ত করা হয়নি"]
      ],
      inheritance: [
        ["উত্তরাধিকার", "এই ডেমো প্রকৃত উত্তরাধিকারীর অংশ নির্ধারণ করে না"]
      ]
    };

    return {
      status,
      summary,
      details: [...details, ...(extras[feature] || [])],
      disclaimer:
        "DEMO ONLY — কোনো সরকারি ডেটাবেসে অনুসন্ধান করা হয়নি।"
    };
  }

  function makeReport(title, result) {
    return [
      "VumiShondhan — Demo Report",
      "==========================",
      `Feature: ${title}`,
      `Status: ${result.status}`,
      `Summary: ${result.summary}`,
      "",
      ...(result.details || []).map(
        ([label, value]) => `${label}: ${value ?? "তথ্য নেই"}`
      ),
      "",
      result.lawyer
        ? `বিশেষজ্ঞ: ${result.lawyer.type}\n${result.lawyer.name}\n${result.lawyer.qualification}\n${result.lawyer.contact}`
        : "",
      result.disclaimer || "এটি ডেমো রিপোর্ট।"
    ].join("\n");
  }

  window.VumiDemoService = { run, makeReport };
})();
