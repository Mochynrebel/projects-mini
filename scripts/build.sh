#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "Cleaning previous build artifacts..."
rm -rf .next dist

echo "Building the Next.js project..."
pnpm next build

if [[ -n "${VERCEL:-}" ]]; then
    echo "Vercel environment detected, skipping custom server bundle."
    echo "Build completed successfully!"
    exit 0
fi

echo "Installing dependencies..."
pnpm install --prefer-frozen-lockfile --prefer-offline --loglevel debug --reporter=append-only

echo "Bundling server with tsup..."
pnpm tsup src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify

echo "Build completed successfully!"
