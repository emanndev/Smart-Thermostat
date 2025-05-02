
// import '@testing-library/jest-dom';
require('@testing-library/jest-dom');

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Set up JSDOM environment
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Mock browser APIs
global.HTMLElement = dom.window.HTMLElement;
global.FileReader = class FileReader {
  readAsDataURL() {
    this.result = 'data:image/mock';
    this.onload({ target: this });
  }
};

// Mock timers
jest.useFakeTimers();

// Mock window methods
global.window.resizeTo = (width, height) => {
  global.window.innerWidth = width;
  global.window.innerHeight = height;
  global.window.dispatchEvent(new Event('resize'));
};

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    })
  };
})();

global.localStorage = localStorageMock;

// Mock matchMedia
global.window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn()
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 0);
};