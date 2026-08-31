import { mkdir } from "node:fs/promises";
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
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="38" fill="#20211f"/>
  <path d="M37 45h20l12 91H49L37 45Zm39 0h20l-9 56-11-56Zm38 0h20l-16 91H98l16-91Z" fill="#f7f4ed"/>
  <circle cx="135" cy="137" r="15" fill="#3f7d82"/>
</svg>`;

await Promise.all([
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
