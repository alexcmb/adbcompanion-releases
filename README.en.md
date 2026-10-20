<div align="center">

<img src="docs/logo.svg" width="96" height="96" alt="">

# ADB Companion

**Android device management and control over ADB.**

A complete graphical interface for Android Debug Bridge: app administration,<br>
file transfer, interactive shell, system logs, performance monitoring,<br>
screen mirroring and wireless connectivity, with no commands to type.

[**Website & downloads**](https://alexcmb.github.io/adbcompanion-releases/en/) ·
[All releases](https://github.com/alexcmb/adbcompanion-releases/releases) ·
[FAQ](#faq) ·
[Français](README.md)

Windows · macOS · Linux — English and French interface

<img src="docs/screens/en/dashboard.webp" alt="ADB Companion dashboard" width="900">

<sub>Screenshots taken with fictitious demo devices.</sub>

[Features](#features) · [Installation](#installation) · [Setup](#setup) · [Overview](#overview) · [Updates](#updates) · [FAQ](#faq)

## Features

| Module | Capabilities |
|:---:|:---:|
| **Dashboard** | Device status: battery (level, health, temperature, current), storage, memory, display, Android version, security patch level, CPU, bootloader state and root status. Screenshots, reboot to system, recovery, bootloader, fastbootd or EDL. |
| **Apps** | Package inventory with icons, sizes and filters (user, system, disabled, uninstalled). APK, APKS and XAPK (with OBB data) installation by drag and drop. Launch, force stop, disable, clear cache or data, uninstall, restore a system app. Bulk actions, permission management. |
| **Files** | Dual-pane workstation ↔ device explorer built on ADB's sync protocol. Tracked, cancellable transfers, conflict handling (replace, skip, keep both), preview, drag and drop from the system file manager, root mode. |
| **Terminal** | Multi-tab interactive ADB shell (colors, completion, dynamic resizing), root session, built-in and custom macros. |
| **Logcat** | Real-time system logs, filtering by level, tag (with exclusions), app or regular expression, effective collection pause, purge, export. |
| **Monitor** | Real-time monitoring over 1 to 30 minutes: per-core CPU load, memory, temperatures, battery. Process manager: sort, search, kill, memory release. |
| **Screen mirror** | Device mirroring and control through [scrcpy](https://github.com/Genymobile/scrcpy), deployed and configured automatically: resolution, bit rate, codec, screen off, recording. Wi-Fi-optimized profile, automatic fallback when the video encoder fails. |
| **Wireless** | QR code or code pairing, mDNS discovery, connection by address, one-click USB → Wi-Fi switchover, automatic reconnection, unstable connection indicator. USB and Wi-Fi connections of the same device grouped together. |
| **Quick settings** | Animation scale, display resolution and density, stay awake, touch indicators, private DNS, dark theme, force dark, with restore of the original values. |
| **Integration** | <kbd>Ctrl</kbd>+<kbd>K</kbd> command palette, notification area icon, connection notifications, automatic ADB deployment, light and dark themes, signed updates. |

## Installation

Download the package for your system from the [website](https://alexcmb.github.io/adbcompanion-releases/en/#download) or the [releases page](https://github.com/alexcmb/adbcompanion-releases/releases).

| System | File | Notes |
|:---:|:---:|:---:|
| Windows 10 / 11 (64-bit) | `ADB.Companion_<version>_x64-setup.exe` | Recommended. Portable install: all data in the application folder. |
| | `ADB.Companion_<version>_x64_fr-FR.msi` | For deployment across a fleet. |
| macOS 11+ Apple Silicon | `ADB.Companion_<version>_aarch64.dmg` | M1 Macs and later. |
| macOS 11+ Intel | `ADB.Companion_<version>_x64.dmg` | |
| Linux x86_64 | `ADB.Companion_<version>_amd64.AppImage` | Any distribution. |
| | `.deb` / `.rpm` | Debian, Ubuntu… / Fedora, openSUSE… |

> **Important:** The app is not yet signed with a code signing certificate.<br>
> **Windows**: SmartScreen shows "Windows protected your PC" → *More info* → *Run anyway*.<br>
> **macOS**: right-click the app → *Open*, then confirm.<br>
> Updates, however, are signed and their signature is verified before installation.

No other prerequisites: ADB Companion uses an existing ADB installation (Android SDK, `PATH`…)<br>
or offers to download Google's official Platform-Tools.

## Setup

**1.** On the Android device: **Settings → About phone**, tap **Build number** seven times to enable *Developer options*.<br>
**2.** In *Developer options*, turn on **USB debugging** (and **Wireless debugging** for Wi-Fi).<br>
**3.** Connect the device and authorize the computer's RSA key fingerprint: the device is detected automatically.

Wi-Fi connection: the **Switch to Wi-Fi** button on the dashboard of a USB-connected device,<br>
or **Wireless connection → QR code**, scanned from *Wireless debugging → Pair device with QR code* (Android 11 and later).

## Overview

### App management

Drag-and-drop installation, single or bulk actions.

<img src="docs/screens/en/apps.webp" alt="App management" width="900">

### File transfer

Dual pane, workstation ↔ device, tracked transfers.

<img src="docs/screens/en/files.webp" alt="File explorer with a transfer in progress" width="900">

### ADB shell

Tabbed sessions, built-in and custom macros.

<img src="docs/screens/en/terminal.webp" alt="ADB shell and macros" width="900">

### Logcat

Real-time system logs, filtered on the fly.

<img src="docs/screens/en/logcat.webp" alt="Real-time Logcat" width="900">

### Performance monitoring

CPU, memory, temperatures and battery in real time.

<img src="docs/screens/en/monitor.webp" alt="Performance monitoring" width="900">

### Wireless ADB

QR code pairing, with no IP address or port to enter.

<img src="docs/screens/en/wireless-qr.webp" alt="Wireless pairing with a QR code" width="900">

### Screen mirroring

Device mirroring and control through scrcpy.

<img src="docs/screens/en/mirror.webp" alt="Screen mirroring settings" width="900">

### Quick settings

Advanced system settings, with restore of the original values.

<img src="docs/screens/en/tweaks.webp" alt="Quick settings" width="900">

### Command palette and light theme

<img src="docs/screens/en/palette.webp" alt="Command palette" width="440"> <img src="docs/screens/en/dashboard-light.webp" alt="Dashboard in the light theme" width="440">

## Updates

ADB Companion checks for new versions at startup. No update is installed without your consent,<br>
and every package's signature is verified before installation.<br>
The **Experimental versions** option (**Settings → Updates**) also delivers pre-releases published for testing.

## FAQ

<details>
<summary><b>Is root access required?</b></summary>

No. Root access is only used for some advanced features (whole file system access,<br>
root terminal session, clearing an app's cache), when the root manager grants it to the shell.
</details>

<details>
<summary><b>Where is data stored? Is any information transmitted?</b></summary>

On Windows, the installation is portable: settings, logs and downloaded tools are stored in the application's `data` folder;<br>
the installer offers to remove it on uninstall.<br>
No data is transmitted: the app only connects to the Internet to check for updates and, on request, to download ADB or scrcpy.
</details>

<details>
<summary><b>Linux: the device is not detected over USB</b></summary>

Install your distribution's udev rules (`android-udev-rules` or `android-sdk-platform-tools-common`, depending on the distribution),<br>
add the user to the matching group (`plugdev` or `adbusers`), then reconnect the device.
</details>

<details>
<summary><b>The device shows up as "unauthorized"</b></summary>

Unlock the device and accept the "Allow USB debugging?" prompt.<br>
If it does not appear, revoke USB debugging authorizations in *Developer options*, then reconnect the device.
</details>

<details>
<summary><b>Screen mirroring stays black on a TV</b></summary>

Some TV video encoders do not support high resolutions.<br>
ADB Companion automatically restarts the mirror with a lower resolution or another encoder, and keeps the working setting for that device.
</details>

---

<sub>This repository hosts ADB Companion's published releases and its website. Screen mirroring powered by <a href="https://github.com/Genymobile/scrcpy">scrcpy</a>.</sub>

</div>
