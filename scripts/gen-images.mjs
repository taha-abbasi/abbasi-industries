// Generate bespoke luxury imagery for the Abbasi Industries site via OpenAI gpt-image-1.
// Reads OPENAI_API_KEY from /Users/tahaabbasi/Developer/startfest-cal/.env.local.
// Idempotent: skips slots whose output already exists unless FORCE=1.
//
// Usage:  node scripts/gen-images.mjs            (generate missing)
//         FORCE=1 node scripts/gen-images.mjs    (regenerate all)
//         node scripts/gen-images.mjs hero str   (generate only named slots)

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ENV_FILE = "/Users/tahaabbasi/Developer/startfest-cal/.env.local";
const OUT_DIR = path.resolve("public/images");
const API_URL = "https://api.openai.com/v1/images/generations";

function readKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  const txt = fs.readFileSync(ENV_FILE, "utf8");
  for (const line of txt.split("\n")) {
    const m = line.match(/^\s*OPENAI_API_KEY\s*=\s*(.+)\s*$/);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  throw new Error("OPENAI_API_KEY not found");
}

// Consistent luxury color-grade/style applied to every prompt.
const STYLE =
  "Cinematic editorial photograph, natural golden-hour light, muted earthy filmic color grade, " +
  "warm neutral palette of bone, stone, taupe and antique bronze, architectural restraint with " +
  "generous negative space, the calm understated luxury mood of Aman and Six Senses resorts, " +
  "high-end real estate and hospitality brand photography, medium-format look, shallow depth of field, " +
  "no people, no faces, no text, no logos, no watermarks, photorealistic, elegant and serene.";

const SLOTS = [
  {
    name: "hero",
    quality: "high",
    size: "1536x1024",
    width: 2000,
    prompt:
      "A sweeping view of a refined luxury glamping resort in the Utah high desert at golden hour — " +
      "a few geodesic domes and canvas safari tents nestled among red rock buttes and silver sagebrush, " +
      "a winding path, soft long shadows, dramatic open sky.",
  },
  {
    name: "glamping",
    quality: "high",
    size: "1536x1024",
    width: 1800,
    prompt:
      "A single elegant safari tent / geodesic dome suite at dusk with a warm glowing interior, " +
      "a wooden viewing deck with low lanterns overlooking a vast desert valley, fire pit, " +
      "deep blue twilight sky — experiential outdoor luxury hospitality.",
  },
  {
    name: "str",
    quality: "medium",
    size: "1536x1024",
    width: 1600,
    prompt:
      "A minimalist luxury mountain-cabin interior, natural oak and stone, floor-to-ceiling windows " +
      "framing pine forest, designer furniture in warm neutral tones, a fireplace, soft daylight — " +
      "a five-star short-term rental.",
  },
  {
    name: "property",
    quality: "medium",
    size: "1536x1024",
    width: 1600,
    prompt:
      "An elegant still life of brass keys resting on a smooth travertine surface beside rolled " +
      "architectural plans and a leather folio, warm directional light — a refined real-estate handover detail.",
  },
  {
    name: "land",
    quality: "medium",
    size: "1536x1024",
    width: 1600,
    prompt:
      "A cinematic aerial view of open Utah development land at dawn, gentle survey markers and a graded " +
      "access road across high-desert terrain with distant mountains and mist, expansive and full of potential.",
  },
  {
    name: "rv",
    quality: "medium",
    size: "1536x1024",
    width: 1600,
    prompt:
      "An upscale modern RV resort framed by mountains at golden hour, neat paved sites with manicured " +
      "landscaping, premium motorhomes, a tasteful clubhouse, resort-grade amenities, serene evening light.",
  },
  {
    name: "storage",
    quality: "medium",
    size: "1536x1024",
    width: 1600,
    prompt:
      "A clean, architecturally refined self-storage facility exterior at warm evening light, with oversized " +
      "drive-through bays sized for RVs and boats, dark standing-seam metal and warm wood accents, premium and secure.",
  },
  {
    name: "hotel",
    quality: "medium",
    size: "1536x1024",
    width: 1600,
    prompt:
      "A boutique luxury hotel lobby interior in warm minimalism — natural stone, oak, linen, sculptural " +
      "pendant lighting, a quiet seating vignette, soft daylight, the calm Aman-resort mood.",
  },
  {
    name: "technology",
    quality: "medium",
    size: "1536x1024",
    width: 1600,
    prompt:
      "An abstract, understated still life suggesting property and real-estate automation — a softly lit " +
      "matte surface with subtle geometric data lines and a faint glowing network in antique bronze and ivory, " +
      "minimal, sophisticated, calm.",
  },
];

async function generate(slot, key) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 240000);
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: `${slot.prompt} ${STYLE}`,
        n: 1,
        size: slot.size,
        quality: slot.quality,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`HTTP ${res.status}: ${body.slice(0, 400)}`);
    }
    const json = await res.json();
    const b64 = json?.data?.[0]?.b64_json;
    if (!b64) throw new Error("no image data in response");
    const raw = Buffer.from(b64, "base64");
    const outPath = path.join(OUT_DIR, `${slot.name}.jpg`);
    await sharp(raw)
      .resize({ width: slot.width, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outPath);
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`✓ ${slot.name}.jpg  (${kb} KB)`);
    return true;
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const key = readKey();
  const only = process.argv.slice(2);
  const force = process.env.FORCE === "1";
  const todo = SLOTS.filter((s) => only.length === 0 || only.includes(s.name));

  let ok = 0;
  for (const slot of todo) {
    const outPath = path.join(OUT_DIR, `${slot.name}.jpg`);
    if (!force && fs.existsSync(outPath)) {
      console.log(`• ${slot.name}.jpg exists — skip`);
      ok++;
      continue;
    }
    try {
      await generate(slot, key);
      ok++;
    } catch (e) {
      console.error(`✗ ${slot.name}: ${e.message}`);
    }
  }
  console.log(`\nDone: ${ok}/${todo.length} images ready in public/images/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
