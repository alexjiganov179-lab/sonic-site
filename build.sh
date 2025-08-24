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
  # Use sed to substitute the remote image URL with the local path. If the URL changes
  ## in the future, this script may need to be updated accordingly.
      #sed -i "s#https://framerusercontent.com/images/ktCzdY7HyTrnsxGzD8mr1yDL68\.png[^\"']*#img/focusline1.png#g" "$html_file"
          # Replace any occurrence of the hero image filename with our custom path
    sed -i "s#ktCzdY7HyTrnsxGzD8mr1yDL68\.png[^\"']*#img/focusline1.png#g" "$html_file"
  sed -i 's#https://framerusercontent.com/images/ktCzdY7HyTrnsxGzD8mr1yDL68.png#img/focusline1.png#g' "$html_file"
done

# Print contents for debug
ls -R public
