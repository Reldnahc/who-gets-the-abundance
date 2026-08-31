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
  <circle cx="1120" cy="20" r="280" fill="#e2eeee" opacity="0.78"/>
  <path d="M72 74h1056" stroke="#cbc7bd" stroke-width="2"/>
  <text x="74" y="126" fill="#5d5e58" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="700" letter-spacing="3">AN INTERACTIVE CIVIC TOOL</text>
  <text x="72" y="244" fill="#20211f" font-family="Arial, Helvetica, sans-serif" font-size="77" font-weight="750" letter-spacing="-3">WHO GETS THE</text>
  <text x="72" y="330" fill="#20211f" font-family="Arial, Helvetica, sans-serif" font-size="77" font-weight="750" letter-spacing="-3">ABUNDANCE?</text>
  <text x="76" y="394" fill="#5d5e58" font-family="Arial, Helvetica, sans-serif" font-size="28">AI capability raises the stakes. Institutions shape the outcome.</text>
  <g transform="translate(74 474)">
    <rect width="131" height="24" rx="12" fill="#8b3f43"/>
    <rect x="131" width="131" height="24" fill="#9b4b3c"/>
    <rect x="262" width="131" height="24" fill="#a45f42"/>
    <rect x="393" width="131" height="24" fill="#a66d37"/>
    <rect x="524" width="131" height="24" fill="#9a7b2f"/>
    <rect x="655" width="131" height="24" fill="#5c7487"/>
    <rect x="786" width="131" height="24" fill="#3f7d82"/>
    <rect x="917" width="137" height="24" rx="12" fill="#23766f"/>
    <path d="M580-16v54" stroke="#20211f" stroke-width="4"/>
    <path d="m568-18 12-14 12 14Z" fill="#20211f"/>
    <text x="0" y="66" fill="#5d5e58" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="650">CONCENTRATED POWER</text>
    <text x="829" y="66" fill="#5d5e58" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="650">BROADLY SHARED POWER</text>
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
