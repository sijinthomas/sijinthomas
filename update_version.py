import sys
import fileinput

def update_version(file_path, new_version):
    with fileinput.FileInput(file_path, inplace=True) as file:
        for line in file:
            if "'com.revvity.streamrelay':" in line and 'version' in line:
                print(f"         'com.revvity.streamrelay': {{\n            version: '{new_version}',")
            else:
                print(line, end='')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python update_version.py <new_version>")
        sys.exit(1)

    new_version = sys.argv[1]
    app_ts_path = "app.ts"  # Replace with the actual path

    update_version(app_ts_path, new_version)
