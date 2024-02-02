#!/bin/bash

# Read the new version from the file
new_version="1.0.2"

# Set the file path
file_path="/home/ec2-user/app.ts"

# Set the component name
component_name="com.revvity.streamrelay"

# Use sed to perform the replacement
sed -i "/'$component_name'/,/version:/ s/version:.*/version: '$new_version',/" "$file_path"
