/**
 * @jest-environment jsdom
 */
const Thermostat = require('../main.js');

describe('Thermostat Core Functionality', () => {
  beforeEach(() => {
    // Reset DOM and Thermostat state before each test
    document.body.innerHTML = `
      <div id="temp"></div>
      <p class="currentTemp"></p>
      <h3 class="room-name"></h3>
      <div class="rooms-control"></div>
      <select id="rooms"></select>
      <div class="room"></div>
      <svg class="point"></svg>
      <div class="default-settings">
        <button id="cool"></button>
        <button id="warm"></button>
        <button id="showModal"></button>
      </div>
      <div class="inputs hidden">
        <input id="coolInput">
        <input id="warmInput">
        <button id="save"></button>
        <button id="close"></button>
        <span class="error"></span>
      </div>
      <div class="text"></div>
    `;
    
    Thermostat.init();
  });

  // Core Room Tests
  describe('Room Management', () => {
    test('should initialize with 4 rooms', () => {
      expect(Thermostat.rooms.length).toBe(4);
    });

    test('should correctly toggle AC state', () => {
      const room = Thermostat.rooms[0];
      const initialState = room.airConditionerOn;
      room.toggleAircon();
      expect(room.airConditionerOn).toBe(!initialState);
    });
  });

  // Temperature Control Tests
  describe('Temperature Control', () => {
    test('should increase temperature within bounds', () => {
      const room = Thermostat.rooms[0];
      const initialTemp = room.currTemp;
      document.getElementById('increase').click();
      expect(room.currTemp).toBe(initialTemp + 1);
    });

    test('should not exceed max temperature (32°)', () => {
      const room = Thermostat.rooms[0];
      room.setCurrTemp(32);
      document.getElementById('increase').click();
      expect(room.currTemp).toBe(32);
    });
  });

  // DOM Interaction Tests
  describe('DOM Rendering', () => {
    test('should update temperature display', () => {
      const room = Thermostat.rooms[0];
      room.setCurrTemp(25);
      Thermostat.updateRoomDisplay(room);
      expect(document.getElementById('temp').textContent).toBe('25°');
    });

    test('should apply correct overlay for temperature', () => {
      const room = {...Thermostat.rooms[0], currTemp: 20};
      Thermostat.setOverlay(room);
      expect(document.querySelector('.room').style.backgroundImage)
        .toContain(Thermostat.coolOverlay);
    });
  });

  // Preset Configuration Tests
  describe('Preset Configuration', () => {
    test('should validate temperature ranges', () => {
      document.getElementById('coolInput').value = '9'; // Invalid
      document.getElementById('warmInput').value = '25';
      document.getElementById('save').click();
      expect(document.querySelector('.error').style.display).toBe('block');
    });

    test('should accept valid presets', () => {
      document.getElementById('coolInput').value = '18';
      document.getElementById('warmInput').value = '28';
      document.getElementById('save').click();
      expect(Thermostat.rooms[0].coldPreset).toBe(18);
    });
  });

  // Scheduling Tests
  describe('Scheduling', () => {
    test('should toggle AC at scheduled time', () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const room = {
        ...Thermostat.rooms[0],
        scheduleActive: true,
        startTime: currentTime,
        airConditionerOn: false
      };
      
      Thermostat.checkScheduledTimes();
      expect(room.airConditionerOn).toBe(true);
    });
  });

  // Modal Tests
  describe('Room Modal', () => {
    test('should add new room with valid name', () => {
      document.getElementById('showModal').click();
      document.getElementById('newRoomName').value = 'Office';
      document.getElementById('addRoom').click();
      expect(Thermostat.rooms.length).toBe(5);
    });
  });

  describe('Edge Cases', () => {
    test('should handle missing DOM elements gracefully', () => {
      document.body.innerHTML = ''; // Empty DOM
      expect(() => Thermostat.init()).not.toThrow();
    });
  
    test('should validate time format edits', () => {
      const roomControl = document.querySelector('.room-control');
      const timeElement = roomControl.querySelector('.time');
      timeElement.textContent = 'invalid';
      timeElement.dispatchEvent(new Event('blur'));
      expect(timeElement.textContent).not.toBe('invalid');
    });
  });
});