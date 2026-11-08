const fs = require("fs");

const file = "server.js";
let code = fs.readFileSync(file, "utf8");

const importLine = 'const documentRoutes = require("./routes/document.routes");';
const useLine = 'app.use("/api/documents", documentRoutes);';

if (!code.includes(importLine)) {
  code = code.replace(
    'const app = express();',
    'const app = express();\n' + importLine
  );
}

if (!code.includes(useLine)) {
  code = code.replace(
    'app.use(express.json());',
    'app.use(express.json());\n' + useLine
  );
}

fs.writeFileSync(file, code, "utf8");

console.log("Document API connected successfully!");
