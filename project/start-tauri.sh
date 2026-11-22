#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🔍 Checking for Rust and Cargo..."

# Check if rustc is installed
if ! command -v rustc &> /dev/null; then
    echo "❌ Rust not found. Installing via the official method (rustup)..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    
    # Load environment variables for the current terminal session
    if [ -f "$HOME/.cargo/env" ]; then
        source "$HOME/.cargo/env"
    fi
else
    echo "✅ Rust is already installed: $(rustc --version)"
fi

# Path to your Tauri project inside the NX repository
TAURI_DIR="apps/frontend/src-tauri"

if [ ! -d "$TAURI_DIR" ]; then
    echo "❌ Error: Directory $TAURI_DIR not found. Please check the project path."
    exit 1
fi

echo "📂 Navigating to Tauri directory: $TAURI_DIR"
cd "$TAURI_DIR"

echo "🚀 Starting Tauri in development mode (cargo tauri dev)..."
cargo tauri dev