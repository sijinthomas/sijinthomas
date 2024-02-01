import sys
import re

def update_version(file_content, component_name, new_version):
    pattern = re.compile(rf"('{component_name}':\s*{{\s*version:\s*)'[0-9]+\.[0-9]+\.[0-9]+'")
    updated_content = re.sub(pattern, rf"\1'{new_version}'", file_content)
    return updated_content

file_path = "app.ts"  # Assuming app.ts is in the root of your GitHub repository
component_name = "com.revvity.streamrelay"  # Update with the correct component name
new_version = sys.argv[1]  # Get the new version from the command-line argument

with open(file_path, 'r') as file:
    content = file.read()

updated_content = update_version(content, component_name, new_version)

with open(file_path, 'w') as file:
    file.write(updated_content)