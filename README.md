A configurable weather dashboard built using React, Material-UI, and Axios. This application allows users to add weather widgets for different cities, toggle temperature units, and view real-time weather data.

Features
Add weather widgets for any city.
Toggle between Celsius and Fahrenheit.
Auto-refresh weather data every 10 minutes.
Store widget configurations in local storage.
Technologies Used
React: JavaScript library for building user interfaces.
Material-UI: React components for faster and easier web development.
Axios: Promise-based HTTP client for the browser and Node.js.

Getting Started
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v14 or later)
npm (comes with Node.js)
Installation
Clone the repository: git clone https://github.com/yourusername/weather-dashboard.git

Navigate to the project directory: cd weather-dashboard

Install dependencies: npm install

Project Structure

weather-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── WeatherWidget.tsx
│   │   └── TemperatureContextType.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── styles.css
├── package.json
└── README.md
