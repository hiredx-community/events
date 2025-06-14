#!/bin/bash

# check if node is installed
if ! [ -x "$(command -v node)" ]; then
  echo 'Error: node is not installed.' >&2
  exit 1
fi

# Run the update-readmes.js script
node .github/scripts/update-readmes.js