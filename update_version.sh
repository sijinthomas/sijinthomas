#!/bin/bash

# Read the new version from the file
new_version=$(cat new_version.txt)

# Set the file path
file_path="app.ts"

# Set the component name
component_name="'com.revvity.streamrelay'"

# Define the replacement pattern
replacement="    $component_name: {\n            version: '$new_version',"

# Use awk to perform the replacement
awk -v component="$component_name" -v replacement="$replacement" '
    $0 ~ component {
        sub(/'\''version: '\''[0-9.]+'\''/, replacement)
    }
    { print }
' "$file_path" > "$file_path.tmp" && mv "$file_path.tmp" "$file_path"
