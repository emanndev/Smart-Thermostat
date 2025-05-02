// __mocks__/domMock.js

/**
 * Sets up a mock DOM environment with all necessary elements
 * required by the smart home application
 */
function setupDOMEnvironment() {
  
    document.body.innerHTML = `
      <div class="container">
        <div class="room-info">
          <div class="text">
            <div class="room-name">Living Room</div>
            <div class="currentTemp">32°</div>
          </div>
          <select id="rooms"></select>
        </div>
        <div class="room"></div>
        <div class="temperature-control">
          <button id="reduce">-</button>
          <span id="temp">32°</span>
          <button id="increase">+</button>
        </div>
        <div class="default-settings">
          <button id="cool">Cool</button>
          <button id="warm">Warm</button>
          <button id="newPreset">New Preset</button>
        </div>
        <div class="inputs hidden">
          <input type="number" id="coolInput" placeholder="Cool Temp">
          <input type="number" id="warmInput" placeholder="Warm Temp">
          <button id="save">Save</button>
          <button id="close">Close</button>
          <span class="error"></span>
        </div>
        <div class="rooms-control"></div>
        <svg width="300" height="300">
          <circle class="point" cx="150" cy="150" r="10"></circle>
        </svg>
      </div>
    `;
  
    // Mock ion-icon functionality
    global.document.createElement = (function(create) {
      return function(element) {
        const el = create.call(this, element);
        if (element === 'ion-icon') {
          el.setAttribute = jest.fn();
          el.classList = {
            add: jest.fn(),
            remove: jest.fn(),
            contains: jest.fn().mockReturnValue(false),
            toggle: jest.fn()
          };
          el.name = '';
        }
        return el;
      };
    })(global.document.createElement);
  
    // Mock FileReader
    global.FileReader = class {
      constructor() {
        this.onload = null;
      }
      
      readAsDataURL() {
        // Simulate async file reading
        setTimeout(() => {
          if (this.onload) {
            this.onload({ target: { result: 'data:image/jpeg;base64,mockImageData' } });
          }
        }, 0);
      }
    };
  
    // Mock additional browser APIs
    if (!global.Element.prototype.closest) {
      global.Element.prototype.closest = function(selector) {
        let element = this;
        while (element && element.nodeType === 1) {
          if (element.matches(selector)) {
            return element;
          }
          element = element.parentNode;
        }
        return null;
      };
    }
  
    // Add utility methods for testing DOM events
    document.createEvent = function(type) {
      return {
        initEvent: function() {},
        preventDefault: function() {}
      };
    };
  }
  
  // Export setup function
  module.exports = { setupDOMEnvironment };