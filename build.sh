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

# Copy the custom hero image into the build directory
# The image is expected to live at `img/focusline1.png` in the repository root.
# Create the `public/img` directory if it doesn't exist and copy the file there.
mkdir -p public/img
if [ -f "img/focusline1.png" ]; then
  cp -f img/focusline1.png public/img/
fi

# Replace the original hero image reference with our custom image in all HTML files.
# The Framer template references a remote image for the hero section (speaker photo).
# We swap that URL with our local `img/focusline1.png` path so the new image appears
# on the site. This replacement runs on all HTML files in the `public` directory.
find public -type f -name '*.html' -print0 | while IFS= read -r -d '' html_file; do
  # Use sed to substitute the remote hero image URL with our local path. The original
  # Framer template references a hosted image on framerusercontent.com (file name
  # ktCzdY7HyTrnsxGzD8mr1yDL68.png) and may append query parameters or appear in
  # srcset definitions. To ensure we swap every occurrence, match the full domain
  # path up to the filename and any optional query or size suffix before the
  # next comma or quote. Replace it with the relative path to our custom image.
  sed -i -E "s#https://framerusercontent.com/images/[^\"',]*ktCzdY7HyTrnsxGzD8mr1yDL68\\.png[^\"',]*#img/focusline1.png#g" "$html_file"
done

# Print contents for debug
ls -R public
