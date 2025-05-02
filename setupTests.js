// setupTests.js
// This file sets up the testing environment

// Add custom matchers for DOM testing
require('@testing-library/jest-dom');

// Mock for WeatherEffects
global.WeatherEffects = {
  init: jest.fn(),
  checkTemperatureEffects: jest.fn(),
  showSnowEffect: jest.fn(),
  showHeatEffect: jest.fn(),
  createSnowflake: jest.fn(),
  createHeatWave: jest.fn(),
  clearEffects: jest.fn()
};

// Global mocks
global.setInterval = jest.fn();
global.setTimeout = jest.fn();
global.clearInterval = jest.fn();

// Console error silencing (optional)
// Uncomment to suppress console errors during tests
// global.console.error = jest.fn();