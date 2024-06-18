#!/bin/bash

# Make sure you are running the script from the correct directory
# where the .env file is located

# Check if .env file exists
if [ ! -f .env ]; then
  echo ".env file not found in the current directory."
  exit 1
fi

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Run a script
node 0.mjs