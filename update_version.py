# update_version.py

import re
import sys

# Specify the path to your app.ts file
file_path = 'app.ts'

# New version to update
new_version = sys.argv[1]

# Regular expression to match the version pattern
version_pattern = re.compile(r"'com\.revvity\.streamrelay': {\s*version: ['\"]([^'\"]+)['\"]", re.MULTILINE)

with open(file_path, 'r') as file:
    content = file.read()

# Find the current version using regex
match = version_pattern.search(content)

if match:
    current_version = match.group(1)
    print(f"Current Version: {current_version}")

    # Replace the current version with the new version
    updated_content = version_pattern.sub(f"'com.revvity.streamrelay': {{\n            version: '{new_version}'", content)

    # Write the updated content back to the file
    with open(file_path, 'w') as file:
        file.write(updated_content)

    print(f"Version updated to: {new_version}")
else:
    print("Version pattern not found in the file.")
