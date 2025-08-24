#!/bin/bash
# Build script for Vercel deployment
# Unzip the 1stpage archive into the public directory and rename page.html to index.html
set -e

# Remove existing public directory if any
rm -rf public
mkdir -p public

# Unzip archive to public directory
unzip -o 1stpage.zip -d public

# Rename page.html to index.html in all directories
find public -type f -name 'page.html' -print0 | while IFS= read -r -d '' f; do
  dir=$(dirname "$f")
  mv "$f" "$dir/index.html"
done

# Print contents for debug
ls -R public
