// Falha se algum teste usar espera fixa, como cy.wait(1000).
// cy.wait("@alias") é permitido: espera por uma requisição, não por tempo.
const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..", "cypress");
const proibido = /cy\.wait\(\s*\d/;
const achados = [];

function varrer(dir) {
  for (const nome of fs.readdirSync(dir)) {
    const caminho = path.join(dir, nome);
    if (fs.statSync(caminho).isDirectory()) {
      if (nome !== "screenshots" && nome !== "videos") varrer(caminho);
    } else if (caminho.endsWith(".js")) {
      fs.readFileSync(caminho, "utf8").split("\n").forEach((linha, i) => {
        if (proibido.test(linha)) achados.push(`${path.relative(process.cwd(), caminho)}:${i + 1}: ${linha.trim()}`);
      });
    }
  }
}

varrer(raiz);

if (achados.length) {
  console.error("Esperas fixas encontradas:\n" + achados.join("\n"));
  process.exit(1);
}
console.log("OK: nenhuma espera fixa (cy.wait com número) encontrada.");
