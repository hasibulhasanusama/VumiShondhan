const fs = require("fs");
const file = "server.js";

let code = fs.readFileSync(file, "utf8");

if (!code.includes('require("./routes/land.routes")')) {
  code = code.replace(
    'const app = express();',
    'const app = express();\nconst landRoutes = require("./routes/land.routes");'
  );

  code = code.replace(
    'app.use(express.json());',
    'app.use(express.json());\napp.use("/api/lands", landRoutes);'
  );

  fs.writeFileSync(file, code, "utf8");
  console.log("Land API connected successfully!");
} else {
  console.log("Land API already connected.");
}
