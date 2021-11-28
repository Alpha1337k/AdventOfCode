npm init -y
npm install typescript --save-dev
npx tsc --init --rootDir src --outDir dist --sourceMap true
npm set-script start "npx tsc && node dist/main.js"
npm set-script watch "tsc-watch --onSuccess 'node ./dist/main.js'"
mkdir src
touch src/main.ts
