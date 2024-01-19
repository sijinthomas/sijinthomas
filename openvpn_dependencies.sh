#!/bin/bash

package_name="openvpn"

# Check if the package is installed
if ! dpkg -s $package_name &> /dev/null; then
    echo "Package $package_name is not installed."
    exit 1
fi

# Get and display dependencies
dependencies=$(apt-cache depends $package_name | grep "Depends:" | awk '{print $2}')

if [ -z "$dependencies" ]; then
    echo "No dependencies found for $package_name."
else
    echo "Dependencies of $package_name:"
    for dependency in $dependencies; do
        echo "- $dependency"
    done
fi
