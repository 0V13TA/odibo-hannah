#!/usr/bin/env bash

set -e
shopt -s nullglob

sizes=(
  "desktop:1920x1080"
  "laptop:1366x768"
  "tablet:768x1024"
  "phone:480x800"
)

# Clear previously generated images
for size in "${sizes[@]}"; do
  name="${size%%:*}"
  rm -rf -- "$name"
  mkdir -p -- "$name"
done

# Generate responsive images
for file in *.jpg *.jpeg *.png *.webp; do
  filename="${file##*/}"
  filename="${filename%.*}"

  for size in "${sizes[@]}"; do
    name="${size%%:*}"
    dimensions="${size#*:}"

    magick "$file" \
      -resize "$dimensions" \
      "$name/$filename.jpg"
  done
done
