

/**
 * A mock implementation of the browser's localStorage API for testing purposes
 */
class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  
    get length() {
      return Object.keys(this.store).length;
    }
  
    key(index) {
      return Object.keys(this.store)[index] || null;
    }
  }
  
  module.exports = LocalStorageMock;