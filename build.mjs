// Bangun halaman permainan langsung dari template.html dan deck.json.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));
function bangun() {
  const deck = JSON.parse(readFileSync(join(DIR, "deck.json"), "utf8"));
  const cardCodes = new Set();
  for (const card of deck) {
    if (!card.kode || cardCodes.has(card.kode)) throw new Error(`Kode kartu kosong atau duplikat: ${card.kode ?? "(kosong)"}`);
    if (!card.efekId || (card.tipe === "Bidak" && !card.soalId) || (card.tipe !== "Bidak" && card.soalId !== null)) {
      throw new Error(`ID efek/soal tidak valid untuk kartu ${card.kode}`);
    }
    cardCodes.add(card.kode);
  }
  const tpl = readFileSync(join(DIR, "template.html"), "utf8");
  if (!tpl.includes("__DECK_JSON__")) throw new Error("template.html tidak punya penanda __DECK_JSON__");
  const html = tpl.replace("__DECK_JSON__", () => JSON.stringify(deck));
  mkdirSync(join(DIR, "dist"), { recursive: true });
  writeFileSync(join(DIR, "index.html"), html);
  writeFileSync(join(DIR, "dist", "index.html"), html);
  for (const file of ["card-questions.js", "card-effects.js"]) {
    copyFileSync(join(DIR, file), join(DIR, "dist", file));
  }
  console.log(`Selesai. index.html, dist/index.html, dan modul kartu dibangun (${Math.round(html.length / 1024)} KB)`);
}

bangun();
