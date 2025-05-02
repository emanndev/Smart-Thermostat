# 🌡️ Smart Home Thermostat Web Application

## 🔗 Overview

This is a responsive thermostat control widget for a smart home system. It allows users to monitor and control temperatures in different rooms, set presets, schedule AC operations, and visualize temperature changes with weather effects.

## 📁 Project Structure

├── index.html
├── Bugs.md 
│   
├── style.css
│   
├── main.js
│   
├── .github/
│   
├── .gitignore
│   
├── babel.config.js
│   
├── package.json
│   
├── package-lock.json
│  
├── Readme.md
│ 
│tests/
│     └── main.test.js
│ 
├── __mocks__/ 
│      
├── coverage
│ 
└── jest.setup.js 
│       
└── assets/
    └── bathroom.jpg
    ├── bedroom.jpg
    ├── indicator.svg
    ├── kitchen.jpg
    ├── living-room.jpg
    └── point.svg

## 🛠️ Features

### Core Functionality

- Room Temperature Control: Adjust temperatures for individual rooms with +/- buttons

- Preset Modes: Quick-set "Cool" and "Warm" temperature presets

- Room Selection: Switch between different rooms in the home

- Visual Temperature Indicator: Circular gauge showing current temperature

- AC Status: See which rooms have AC turned on/off

### Advanced Features

- Room Management: Add or delete rooms with custom names and images

- Scheduling: Set start/end times for AC operation in each room

- Visual Timer: See time remaining for scheduled AC operation

- Global Controls: Turn all ACs on/off with one click

- Weather Effects: Visual snow/heat effects based on temperature

- Local Storage: Saves all room data between sessions

## ⚙️ Installation

Clone or download the repository

Open index.html in a web browser

Open your terminal and in the project directory, type command - npm install (to install all dependencies used in project)

## 🚀 Usage

### Basic Controls

- Use the +/- buttons to adjust temperature

- Click "Cool" or "Warm" to apply preset temperatures

- Select different rooms from the dropdown menu

### Room Management

- Click the "+" button to add a new room

- Click the trash icon to delete a room

- Edit room names and images through the management interface

### Scheduling

- Set start and end times by clicking on the time displays

- Toggle "Auto Schedule" to enable/disable scheduling

- The visual bar shows time remaining for current schedule

## 🎯 Bug Fixes

The following bugs were identified and fixed:

1. Responsive UI Issues:

- Fixed layout problems on mobile and tablet views

- Adjusted element spacing and gaps for smaller screens

2. Room Selection:

- Fixed dropdown not updating room images and temperatures

3. Temperature Controls:

- Fixed increase/decrease temperature buttons not working properly

- Added validation for minimum/maximum temperature limits

4. Image Overlays:

- Fixed temperature-based overlays not updating correctly

- Improved visual transition between cool/warm states

5. Preset Validation:

- Added clear error messages for invalid temperature ranges

- Set specific valid ranges for cool (10-24°) and warm (25-32°) presets

6. AC Status Feedback:

- Fixed incorrect temperature range feedback display

- Improved visual indicators for AC status

## 💡Technical Details

1. Languages: HTML, CSS, JavaScript

2. Libraries:

- Ionicons for icons

- Animate.css for animations

- Google Fonts (Manrope) for typography

3. Storage: Uses localStorage to persist room data

## ⏱️Future Improvements

- Add user authentication

- Implement remote control via API

- Add energy usage statistics

- Enhance mobile app integration

## ✅ Credits

Developed as a project for demonstrating smart home UI/UX design patterns and JavaScript application architecture.

## 📄 License

No License.
