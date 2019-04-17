#!/usr/bin/env bash

set -eo pipefail

# Change to the root of the repo
cd "${BASH_SOURCE%/*}/.."

# dist
tsc
rsync -r --exclude='*.ts' --exclude='*.js' src/ dist/

# esnext
tsc -p tsconfig.esnext.json
rsync -r --exclude='*.ts' --exclude='*.js' src/ esnext/
