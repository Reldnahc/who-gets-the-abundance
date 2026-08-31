import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDirectory = path.join(root, "public");

await mkdir(publicDirectory, { recursive: true });

const ogImage = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f4ed"/>
  <circle cx="1150" cy="-10" r="260" fill="#e2eeee" opacity="0.62"/>
  <path d="M72 74h1056" stroke="#cbc7bd" stroke-width="2"/>
  <text x="74" y="126" fill="#5d5e58" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="700" letter-spacing="3">AN INTERACTIVE CIVIC TOOL</text>
  <text x="72" y="238" fill="#20211f" font-family="Arial, Helvetica, sans-serif" font-size="73" font-weight="750" letter-spacing="-3">WHO GETS THE</text>
  <text x="72" y="320" fill="#20211f" font-family="Arial, Helvetica, sans-serif" font-size="73" font-weight="750" letter-spacing="-3">ABUNDANCE?</text>
  <text x="76" y="382" fill="#5d5e58" font-family="Arial, Helvetica, sans-serif" font-size="27">Same capability. Different ownership. Different power.</text>
  <g transform="translate(760 138)">
    <rect width="352" height="344" rx="18" fill="#fbfaf6" stroke="#bbb8af" stroke-width="2"/>
    <path d="M176 24v286M28 172h296" stroke="#d2cfc6" stroke-width="2" stroke-dasharray="7 8"/>
    <path d="M28 310V24M28 310h296" stroke="#77776f" stroke-width="2"/>
    <circle cx="82" cy="270" r="9" fill="#9b4b3c"/>
    <circle cx="95" cy="188" r="9" fill="#a45f42"/>
    <circle cx="187" cy="226" r="9" fill="#a66d37"/>
    <circle cx="264" cy="254" r="9" fill="#74648a"/>
    <circle cx="120" cy="116" r="9" fill="#9a7b2f"/>
    <circle cx="202" cy="82" r="9" fill="#5c7487"/>
    <circle cx="270" cy="68" r="9" fill="#3f7880"/>
    <circle cx="307" cy="46" r="12" fill="#f7f4ed" stroke="#287b73" stroke-width="5"/>
    <text x="176" y="334" fill="#5d5e58" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" text-anchor="middle">WHO GETS THE GAINS?</text>
    <text x="-170" y="-2" fill="#5d5e58" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" text-anchor="middle" transform="rotate(-90)">WHO CAN SHAPE THE RULES?</text>
  </g>
  <g transform="translate(72 472)">
    <rect width="610" height="90" rx="12" fill="#efece4"/>
    <text x="24" y="34" fill="#5d5e58" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="1.5">AUTOMATION CAPABILITY</text>
    <rect x="24" y="53" width="562" height="10" rx="5" fill="#d7d4cc"/>
    <rect x="24" y="53" width="465" height="10" rx="5" fill="#5c7487"/>
    <circle cx="489" cy="58" r="11" fill="#f7f4ed" stroke="#364b5b" stroke-width="4"/>
  </g>
</svg>`;

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#20211f"/>
  <path d="M18 21c0-8 5.8-13 14-13s14 5.2 14 13c0 6.2-3.4 9.5-9.3 13.3C33.3 36.6 32 38.6 32 42" fill="none" stroke="#f7f4ed" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>
  <clipPath id="question-dot">
    <circle cx="32" cy="52" r="5.5"/>
  </clipPath>
  <g clip-path="url(#question-dot)">
    <path d="M26.5 46.5H32v11h-5.5z" fill="#9b4b3c"/>
    <path d="M32 46.5h5.5v11H32z" fill="#23766f"/>
  </g>
</svg>`;

await Promise.all([
  writeFile(
    path.join(publicDirectory, "favicon.svg"),
    `${icon.trim()}\n`,
    "utf8",
  ),
  sharp(Buffer.from(ogImage))
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDirectory, "og-image.png")),
  sharp(Buffer.from(icon))
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDirectory, "apple-touch-icon.png")),
  sharp(Buffer.from(icon))
    .resize(32, 32)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDirectory, "favicon-32.png")),
  sharp(Buffer.from(icon))
    .resize(192, 192)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDirectory, "icon-192.png")),
  sharp(Buffer.from(icon))
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDirectory, "icon-512.png")),
]);
