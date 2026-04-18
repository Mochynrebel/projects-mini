#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

PORT=5000
DEPLOY_RUN_PORT="${DEPLOY_RUN_PORT:-$PORT}"


start_service() {
    cd "${COZE_WORKSPACE_PATH}"
    if [[ ! -f ".next/server/app-paths-manifest.json" ]]; then
        echo "Missing .next/server/app-paths-manifest.json. Deploy build artifacts are incomplete."
        exit 1
    fi

    if ! grep -q '"/sitemap.xml/route"' ".next/server/app-paths-manifest.json"; then
        echo "Missing /sitemap.xml route in build output. Refusing to start stale or incomplete build."
        exit 1
    fi

    if [[ ! -f "dist/server.js" ]]; then
        echo "Missing dist/server.js. Deploy build artifacts are incomplete."
        exit 1
    fi

    echo "Starting HTTP service on port ${DEPLOY_RUN_PORT} for deploy..."
    NODE_ENV=production PORT=${DEPLOY_RUN_PORT} node dist/server.js
}

echo "Starting HTTP service on port ${DEPLOY_RUN_PORT} for deploy..."
start_service
