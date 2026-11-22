#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Load Cargo environment if it exists
if [ -f "$HOME/.cargo/env" ]; then
    source "$HOME/.cargo/env"
fi

echo "🔍 Checking system dependencies (Linux)..."

# 1. Debian / Ubuntu (apt-get)
if command -v apt-get &> /dev/null; then
    REQUIRED_PKGS=(
        libwebkit2gtk-4.1-dev
        build-essential
        curl
        wget
        file
        libxdo-dev
        libssl-dev
        libayatana-appindicator3-dev
        librsvg2-dev
    )

    MISSING_PKGS=()
    for pkg in "${REQUIRED_PKGS[@]}"; do
        if ! dpkg -l | grep -q "^ii  $pkg "; then
            MISSING_PKGS+=("$pkg")
        fi
    done

    if [ ${#MISSING_PKGS[@]} -gt 0 ]; then
        echo "📦 Installing missing Debian/Ubuntu dependencies: ${MISSING_PKGS[*]}"
        sudo apt-get update
        sudo apt-get install -y "${MISSING_PKGS[@]}"
    else
        echo "✅ All Debian/Ubuntu system dependencies are already installed."
    fi

# 2. Fedora / RHEL (dnf)
elif command -v dnf &> /dev/null; then
    REQUIRED_PKGS=(
        webkit2gtk4.1-devel
        openssl-devel
        curl
        wget
        file
        libappindicator-gtk3-devel
        librsvg2-devel
        libxdo-devel
    )

    MISSING_PKGS=()
    for pkg in "${REQUIRED_PKGS[@]}"; do
        if ! rpm -q "$pkg" &> /dev/null; then
            MISSING_PKGS+=("$pkg")
        fi
    done

    # Check if C/C++ compiler group tools (gcc) are installed
    if ! command -v gcc &> /dev/null; then
        echo "📦 Installing C Development Tools and Libraries..."
        sudo dnf group install -y "C Development Tools and Libraries" || sudo dnf groupinstall -y "C Development Tools and Libraries"
    fi

    if [ ${#MISSING_PKGS[@]} -gt 0 ]; then
        echo "📦 Installing missing Fedora/RHEL dependencies: ${MISSING_PKGS[*]}"
        sudo dnf install -y "${MISSING_PKGS[@]}"
    else
        echo "✅ All Fedora/RHEL system dependencies are already installed."
    fi

else
    echo "⚠️ Unsupported package manager (neither apt nor dnf found). Please ensure Tauri v2 dependencies are installed manually for your distribution."
fi

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

# Check if cargo-tauri is installed
if ! cargo tauri --version &> /dev/null; then
    echo "❌ cargo-tauri CLI not found. Installing it now..."
    cargo install tauri-cli --version "^2.0"
else
    echo "✅ cargo-tauri is already installed."
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