import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// White bike silhouette on Strava orange — drawn as SVG paths so no font needed
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#FC4C02"/>
  <g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round">

    <!-- Rear wheel -->
    <circle cx="150" cy="330" r="95" stroke-width="22"/>
    <!-- Front wheel -->
    <circle cx="362" cy="330" r="95" stroke-width="22"/>

    <!-- Wheel hubs -->
    <circle cx="150" cy="330" r="11" fill="white" stroke="none"/>
    <circle cx="362" cy="330" r="11" fill="white" stroke="none"/>

    <!-- Chain stay: rear axle → bottom bracket -->
    <line x1="150" y1="330" x2="256" y2="305" stroke-width="19"/>
    <!-- Seat tube: bottom bracket → seat tube top -->
    <line x1="256" y1="305" x2="210" y2="168" stroke-width="19"/>
    <!-- Seat stay: rear axle → seat tube top -->
    <line x1="150" y1="330" x2="210" y2="168" stroke-width="15"/>
    <!-- Down tube: head tube → bottom bracket -->
    <line x1="348" y1="222" x2="256" y2="305" stroke-width="19"/>
    <!-- Top tube: head tube → seat tube top -->
    <line x1="332" y1="190" x2="210" y2="168" stroke-width="15"/>
    <!-- Head tube -->
    <line x1="332" y1="190" x2="348" y2="222" stroke-width="19"/>
    <!-- Fork: head tube → front axle -->
    <line x1="348" y1="222" x2="362" y2="330" stroke-width="15"/>

    <!-- Crankset -->
    <circle cx="256" cy="305" r="20" fill="white" stroke="none"/>

    <!-- Seat post -->
    <line x1="210" y1="168" x2="210" y2="158" stroke-width="14"/>
    <!-- Saddle -->
    <line x1="176" y1="155" x2="246" y2="155" stroke-width="19"/>

    <!-- Stem -->
    <line x1="332" y1="190" x2="328" y2="143" stroke-width="14"/>
    <!-- Handlebar -->
    <line x1="305" y1="140" x2="352" y2="148" stroke-width="19"/>

  </g>
</svg>`;

function generate(size, filename) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
  });
  writeFileSync(join(publicDir, filename), resvg.render().asPng());
  console.log(`✓ ${filename} (${size}×${size})`);
}

mkdirSync(publicDir, { recursive: true });
generate(512, "icon-512.png");
generate(192, "icon-192.png");
generate(180, "apple-touch-icon.png");
console.log("Done.");
