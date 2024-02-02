#!/bin/bash

# Read the new version from the file
#new_version="1.0.2"
new_version=$(cat new_version.txt)

# Set the file path
file_path="app.ts"

# Set the component name
component_name="com.revvity.streamrelay"

# Use sed to perform the replacement
sed -i "/'$component_name'/,/version:/ s/version:.*/version: '$new_version',/" "$file_path"
