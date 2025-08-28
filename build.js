// This script prepares the frontend for deployment by injecting environment variables.

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const sourceHtmlPath = path.join(__dirname, 'index.html');
const destHtmlPath = path.join(publicDir, 'index.html');
const sourceEnvPath = path.join(__dirname, 'env.js');
const destEnvPath = path.join(publicDir, 'env.js');

// 1. Create the 'public' directory if it doesn't exist.
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// 2. Read the original index.html file.
let htmlContent = fs.readFileSync(sourceHtmlPath, 'utf8');

// 3. Replace placeholders with actual environment variables from Vercel.
//    If a Vercel variable is not set, it leaves the placeholder, so local testing still works.
htmlContent = htmlContent.replace(
    /__NEXT_PUBLIC_FAUCET_BACKEND_URL__/g,
    process.env.NEXT_PUBLIC_FAUCET_BACKEND_URL || '__NEXT_PUBLIC_FAUCET_BACKEND_URL__'
);
htmlContent = htmlContent.replace(
    /__NEXT_PUBLIC_RECAPTCHA_SITE_KEY__/g,
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '__NEXT_PUBLIC_RECAPTCHA_SITE_KEY__'
);
htmlContent = htmlContent.replace(
    /__NEXT_PUBLIC_EXPLORER_URL__/g,
    process.env.NEXT_PUBLIC_EXPLORER_URL || '__NEXT_PUBLIC_EXPLORER_URL__'
);
htmlContent = htmlContent.replace(
    /__NEXT_PUBLIC_IM_ETH_FAUCET_ADDR__/g,
    process.env.NEXT_PUBLIC_IM_ETH_FAUCET_ADDR || '__NEXT_PUBLIC_IM_ETH_FAUCET_ADDR__'
);

// 4. Write the modified content to a new index.html inside the 'public' directory.
fs.writeFileSync(destHtmlPath, htmlContent);

// 5. Copy env.js to the public directory so it's available for local testing via a server.
if (fs.existsSync(sourceEnvPath)) {
    fs.copyFileSync(sourceEnvPath, destEnvPath);
}

console.log('Build complete. Files are ready in /public directory.');
