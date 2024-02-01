import sys
import re

def update_version(file_path, new_version):
    with open(file_path, 'r') as file:
        content = file.read()

    # Use regex to find and replace the version
    pattern = re.compile(r"('com\.revvity\.streamrelay':\s*{\s*version:\s*)('[^']+')")
    content = pattern.sub(r"\1'{}'".format(new_version), content)

    with open(file_path, 'w') as file:
        file.write(content)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python update_version.py <new_version>")
        sys.exit(1)

    new_version = sys.argv[1]
    app_ts_path = "app.ts"  # Assuming app.ts is in the root of your repository

    update_version(app_ts_path, new_version)
