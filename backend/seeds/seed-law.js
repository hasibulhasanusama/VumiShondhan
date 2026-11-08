const pool = require("../config/db");

const guides = [
  {
    title: "Land Record (খতিয়ান) সম্পর্কে জানুন",
    category: "Land Record",
    content: "খতিয়ান হলো জমির মালিকানা ও জমি সম্পর্কিত তথ্যের একটি রেকর্ড। প্রয়োজন অনুযায়ী সংশ্লিষ্ট অফিস বা অনুমোদিত সরকারি সেবার মাধ্যমে তথ্য যাচাই করুন।"
  },
  {
    title: "দলিল যাচাই করার প্রাথমিক ধারণা",
    category: "Document",
    content: "জমির দলিল যাচাইয়ের ক্ষেত্রে দলিল নম্বর, তারিখ, সংশ্লিষ্ট অফিস এবং জমির পরিচিতি মিলিয়ে দেখা গুরুত্বপূর্ণ। প্রয়োজনে সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসের সহায়তা নিন।"
  },
  {
    title: "নামজারি (Mutation) সম্পর্কে জানুন",
    category: "Mutation",
    content: "নামজারি হলো ভূমি রেকর্ডে মালিকানা পরিবর্তন বা হালনাগাদের একটি প্রশাসনিক প্রক্রিয়া। আবেদন ও প্রয়োজনীয় কাগজপত্র সম্পর্কে সরকারি ভূমি সেবা থেকে তথ্য নিন।"
  },
  {
    title: "উত্তরাধিকার সূত্রে জমির ধারণা",
    category: "Inheritance",
    content: "উত্তরাধিকার সূত্রে জমির অংশ নির্ধারণ প্রযোজ্য আইন ও পারিবারিক পরিস্থিতির ওপর নির্ভর করে। সঠিক হিসাবের জন্য যোগ্য আইনজীবী বা সংশ্লিষ্ট কর্তৃপক্ষের পরামর্শ নিন।"
  },
  {
    title: "জমি সংক্রান্ত বিরোধে করণীয়",
    category: "Land Dispute",
    content: "জমি নিয়ে বিরোধ হলে সংশ্লিষ্ট দলিল ও রেকর্ড সংরক্ষণ করুন এবং যোগ্য আইনজীবী বা উপযুক্ত সরকারি কর্তৃপক্ষের সহায়তা নিন।"
  }
];

async function seedGuides() {
  try {
    await pool.query("BEGIN");

    await pool.query("DELETE FROM legal_guides WHERE is_demo = TRUE");

    for (const guide of guides) {
      await pool.query(
        `INSERT INTO legal_guides
        (title, category, content, source_note, is_demo)
        VALUES ($1, $2, $3, $4, TRUE)`,
        [
          guide.title,
          guide.category,
          guide.content,
          "Fictional educational demo content. Verify with official sources."
        ]
      );
    }

    await pool.query("COMMIT");
    console.log("5 DEMO LAW GUIDES INSERTED SUCCESSFULLY!");
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error(error.message);
  } finally {
    await pool.end();
  }
}

seedGuides();
