import json
import sys

def update_version(file_content, component_name, new_version):
    data = json.loads(file_content)

    # Update the version for the specified component
    if component_name in data.get('library', {}).get('components', {}):
        data['library']['components'][component_name]['version'] = new_version

    # Convert the updated data back to JSON
    updated_content = json.dumps(data, indent=2)

    return updated_content

file_path = "app.ts"  # Assuming app.ts is in the root of your GitHub repository
component_name = "com.revvity.streamrelay"  # Update with the correct component name
new_version = sys.argv[1] if len(sys.argv) > 1 else "No argument provided"

with open(file_path, 'r') as file:
    content = file.read()

updated_content = update_version(content, component_name, new_version)

with open(file_path, 'w') as file:
    file.write(updated_content)

print("Update successful!")
