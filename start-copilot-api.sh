#!/bin/bash

# Detect operating system and set up accordingly
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Ubuntu/Linux
    export PATH="/home/$(whoami)/.local/share/nvm/v22.18.0/bin:$PATH"
    PORT=3772
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    PORT=3770
else
    # Default fallback
    PORT=3770
fi

npx copilot-api@latest start --port $PORT

