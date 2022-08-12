#!/usr/bin/env bash
set -e

CONFIG_PATH=/data/options.json

export DOMAIN=$(jq --raw-output '.domain // empty' $CONFIG_PATH)
export PASSWORD=$(jq --raw-output '.password // empty' $CONFIG_PATH)

echo "Starting addon"
node -v
npm -v
npx ts-node src/index.ts