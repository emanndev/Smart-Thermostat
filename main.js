

// Room objects
const rooms = [
  {
    name: "Living Room",
    currTemp: 32,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/living-room.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
  {
    name: "Kitchen",
    currTemp: 29,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/kitchen.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
  {
    name: "Bathroom",
    currTemp: 30,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bathroom.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
  {
    name: "Bedroom",
    currTemp: 31,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bedroom.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
];

const loadRoomsFromStorage = () => {
  const savedRooms = localStorage.getItem('smartHomeRooms');
  if (savedRooms) {
    try {
      const parsedRooms = JSON.parse(savedRooms);
      // Clear the default rooms if we have saved ones
      rooms.length = 0;
      parsedRooms.forEach(room => {
        // Restore methods for each room
        rooms.push({
          ...room,
          setCurrTemp(temp) { this.currTemp = temp; },
          setColdPreset(newCold) { this.coldPreset = newCold; },
          setWarmPreset(newWarm) { this.warmPreset = newWarm; },
          decreaseTemp() { this.currTemp--; },
          increaseTemp() { this.currTemp++; },
          toggleAircon() { this.airConditionerOn = !this.airConditionerOn; }
        });
      });
    } catch (e) {
      console.error('Failed to load rooms from storage', e);
    }
  }
};

// Save rooms to localStorage
const saveRoomsToStorage = () => {
  // Convert to plain objects without methods for storage
  const roomsToSave = rooms.map(room => {
    const { name, currTemp, coldPreset, warmPreset, image, airConditionerOn, startTime, endTime, scheduleActive } = room;
    return { name, currTemp, coldPreset, warmPreset, image, airConditionerOn, startTime, endTime, scheduleActive };
  });
  localStorage.setItem('smartHomeRooms', JSON.stringify(roomsToSave));
};

// Call this at startup
loadRoomsFromStorage();






//  Fix bug with warming and cooling image overlays - bug 4
const coolOverlay= `linear-gradient(
    to bottom, rgba(141, 158, 247, 0.2), rgba(194, 197, 215, 0.1))`;
    
// Fix bug with warming and cooling image overlays - bug 4
const warmOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;

const setInitialOverlay = () => {
  document.querySelector(
    ".room"
  ).style.backgroundImage = `url('${rooms[0].image}')`;

  document.querySelector(".room").style.backgroundImage = `${
    rooms[0].currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${rooms[0].image}')`;
};

const setOverlay = (room) => {
  document.querySelector(".room").style.backgroundImage = `${
    room.currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${room.image}')`;
  
};


// Helper functions (minimal changes)
function updateRoomDisplay(room) {
  currentTemp.textContent = `${room.currTemp}°`;
  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
  document.querySelector(".room-name").innerText = room.name;
  setOverlay(room);
  setIndicatorPoint(room.currTemp);
  generateRooms();
  WeatherEffects.checkTemperatureEffects();
}


// Set svg accordingly
const svgPoint = document.querySelector(".point");
const angleOffset = 86;
const calculatePointPosition = (currTemp) => {
  const normalizedTemp = (currTemp - 10) / (32 - 10);
  const angle = normalizedTemp * 180 + angleOffset;

  const radians = (angle * Math.PI) / 180;
  const radius = 116;

  const translateX = radius * Math.cos(radians);
  const translateY = radius * Math.sin(radians);

  return { translateX, translateY };
};

const setIndicatorPoint = (currTemp) => {
  const position = calculatePointPosition(currTemp);
  svgPoint.style.transform = `translate(${position.translateX}px, ${position.translateY}px)`;
};

// Handle the dropdown data
const roomSelect = document.getElementById("rooms");

const currentTemp = document.getElementById("temp");

let selectedRoom = rooms[0].name;

// Set default temperature
currentTemp.textContent = `${rooms[0].currTemp}°`;

setInitialOverlay();

document.querySelector(".currentTemp").innerText = `${rooms[0].currTemp}°`;
// Add new options from rooms array
rooms.forEach((room) => {
  const option = document.createElement("option");
  option.value = room.name; //changed to room.name Bug 2
  option.textContent = room.name;
  roomSelect.appendChild(option);
});

// Set current temperature to currently selected room

const setSelectedRoom = (selectedRoom) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  if (!room) return;
  setIndicatorPoint(room.currTemp);

  //   set the current stats to current room temperature
  currentTemp.textContent = `${room.currTemp}°`;

  // Set the current room image
  setOverlay(room);

  // Set the current room name
  document.querySelector(".room-name").innerText = selectedRoom;

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
};

roomSelect.addEventListener("change", function () {
  selectedRoom = this.value;

  setSelectedRoom(selectedRoom);
});


// Set preset temperatures with event delegation
const defaultSettings = document.querySelector(".default-settings");
defaultSettings.addEventListener("click", function (e) {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  const target = e.target.closest('button');
  
  if (target?.id === 'cool') {
    room.setCurrTemp(room.coldPreset);
    document.getElementById("cool").style.backgroundColor = "#4458c3";
    document.getElementById("cool").style.color = "#ffffff";
    document.getElementById("warm").style.backgroundColor = "#d9d9d9";
    updateRoomDisplay(room);
    WeatherEffects.checkTemperatureEffects();
  } else if (target?.id === 'warm') {
    room.setCurrTemp(room.warmPreset);
    document.getElementById("warm").style.backgroundColor = "#ec6062";
    document.getElementById("warm").style.color = "#ffffff";
    document.getElementById("cool").style.backgroundColor = "#d9d9d9";
    updateRoomDisplay(room);
    WeatherEffects.checkTemperatureEffects();
  }
  
});

// Increase and decrease temperature
document.getElementById("increase").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);

  if (room.currTemp < 32) {  //fix bug 3 - increase temperature
    room.increaseTemp(); 
    updateRoomDisplay(room);  
    saveRoomsToStorage();
    WeatherEffects.checkTemperatureEffects();
  }
});

document.getElementById("reduce").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);

  if (room.currTemp > 10) { //fix bug 4 - decrease temperature
    room.decreaseTemp(); 
    updateRoomDisplay(room);
    saveRoomsToStorage();
    WeatherEffects.checkTemperatureEffects();
  }

 });

const coolBtn = document.getElementById("cool");
const warmBtn = document.getElementById("warm");


const inputsDiv = document.querySelector(".inputs");
// Toggle preset inputs
document.getElementById("newPreset").addEventListener("click", () => {
  // if (inputsDiv.classList.contains("hidden")) {
    inputsDiv.classList.remove("hidden");
  // }
});

// close inputs
document.getElementById("close").addEventListener("click", () => {
  inputsDiv.classList.add("hidden");
});

// handle preset input data
document.getElementById("save").addEventListener("click", () => {
  const coolInput = document.getElementById("coolInput");
  const warmInput = document.getElementById("warmInput");
  const errorSpan = document.querySelector(".error");

// Fix bug 1 - change the range of temperatures and display valid error message
if (coolInput.value < 10 || coolInput.value > 24 || warmInput.value < 25 || warmInput.value > 32) {
  errorSpan.style.display = "block";
  errorSpan.innerText = "Cool: 10-24°, Warm: 25-32°";
  return;
}
    // Validation passed
    // Set current room's presets

    const currRoom = rooms.find((room) => room.name === selectedRoom);
    currRoom.setColdPreset(parseInt(coolInput.value));
    currRoom.setWarmPreset(parseInt(warmInput.value));

    coolInput.value = "";
    warmInput.value = "";
     errorSpan.style.display = "none";
     inputsDiv.classList.add("hidden");
});

// Rooms Control
const generateRooms = () => {
  const roomsControlContainer = document.querySelector(".rooms-control");
  let roomsHTML = "";

  rooms.forEach((room) => {
    roomsHTML += `
 <div class="room-control" id="${room.name}">
      <div class="top">
        <h3 class="room-name">${room.name} - ${room.currTemp}°</h3>
        <button class="switch" title="Toggle AC">
          <ion-icon name="power-outline" class="${room.airConditionerOn ? "powerOn" : ""}"></ion-icon>
        </button>
      </div>
      <div class="time-display">
        <span class="time start-time" contenteditable="true">${room.startTime}</span>
        <div class="bars">
          ${Array(32).fill('<span class="bar"></span>').join('')}
        </div>
        <span class="time end-time" contenteditable="true">${room.endTime}</span>
      </div>
      <div class="schedule-toggle">
        <label class="switch">
          <input type="checkbox" ${room.scheduleActive ? "checked" : ""} data-room="${room.name}">
          <span class="slider round"></span>
        </label>
        <span>Auto Schedule</span>
      </div>
      <span class="room-status" style="display: ${room.airConditionerOn ? "" : "none"}">
        ${room.airConditionerOn ? (room.currTemp > 25 ? "Warming room to: " : "Cooling room to: ") + room.currTemp + "°" : ""}
      </span>
    </div>
    `;
  });

  roomsControlContainer.innerHTML = roomsHTML;

  // Update the visual timers after generating rooms
  updateVisualTimers();

   // Dynamical add event listeners for editable times
   document.querySelectorAll('.time').forEach(timeElement => {
    timeElement.addEventListener('blur', (e) => {
      const roomControl = e.target.closest('.room-control');
      const roomName = roomControl.id;
      const room = rooms.find(r => r.name === roomName);
      
      const isStartTime = e.target.classList.contains('start-time');
      const timeValue = e.target.textContent.trim();
      
      // Validate time format (HH:MM)
      if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeValue)) {
        if (isStartTime) {
          room.startTime = timeValue;
        } else {
          room.endTime = timeValue;
        }
        updateVisualTimers(); // Refresh the visual timer
      } else {
        // Revert to previous time if invalid
        e.target.textContent = isStartTime ? room.startTime : room.endTime;
      }
    });
  });

  // Event listeners for schedule toggles
  document.querySelectorAll('.schedule-toggle input').forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const room = rooms.find(r => r.name === e.target.dataset.room);
      room.scheduleActive = e.target.checked;
    });
  });

  saveRoomsToStorage();
};
rooms.forEach(room => {
  room.scheduleActive = false;
});


const displayTime = (room) => {
  return `
      <div class="time-display">
        <span class="time">${room.startTime}</span>
        <div class="bars">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <span class="time">${room.endTime}</span>
      </div>
  `
}

generateRooms();

document.querySelector(".rooms-control").addEventListener("click", (e) => {
  if (e.target.classList.contains("switch")) {
    const room = rooms.find(
      (room) => room.name === e.target.parentNode.parentNode.id
    );
    room.toggleAircon();
    generateRooms();
    WeatherEffects.checkTemperatureEffects();
  }

  if (e.target.classList.contains("room-name")) {
    setSelectedRoom(e.target.parentNode.parentNode.id);
  }
});

//New features

// Click event handlers for time displays
const setupTimeDisplayInteractions = () => {
  document.querySelector('.rooms-control').addEventListener('click', (e) => {
    const timeElement = e.target.closest('.time');
    if (!timeElement) return;
    
    const roomControl = e.target.closest('.room-control');
    const roomName = roomControl.id;
    const room = rooms.find(r => r.name === roomName);
    
    const isStartTime = timeElement.classList.contains('start-time');
    const timeType = isStartTime ? 'startTime' : 'endTime';
    
    // Creating time input
    const input = document.createElement('input');
    input.type = 'time';
    input.value = room[timeType];
    input.className = 'time-edit';
    
    // Replace time display with input
    timeElement.replaceWith(input);
    input.focus();
    
    const handleTimeChange = () => {
      if (input.value) {
        room[timeType] = input.value;
        generateRooms();
        
        // Re-enable scheduling check
        if (room.schedulePreset) {
          checkScheduledTimes();
        }
      }
      input.replaceWith(timeElement);
    };
    
    input.addEventListener('change', handleTimeChange);
    input.addEventListener('blur', handleTimeChange);
  });
};

// function to check scheduled times
const checkScheduledTimes = () => {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  rooms.forEach(room => {
    if (!room.scheduleActive) return;
    
    if (currentTime === room.startTime && !room.airConditionerOn) {
      room.toggleAircon();
      // Set to cold preset if current temp is high, warm preset if low
      room.setCurrTemp(room.currTemp > 25 ? room.coldPreset : room.warmPreset);
      generateRooms();
    } else if (currentTime === room.endTime && room.airConditionerOn) {
      room.toggleAircon();
      generateRooms();
    }
  });
};

// Global ACs Button functionality

const addAllACsButton = () => {
  // Remove if buttons already exist
  const existingControls = document.querySelector('.global-ac-controls');
  if (existingControls) existingControls.remove();

  // Create control container
  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'global-ac-controls';
  
  // Turn On All button
  const allOnBtn = document.createElement('button');
  allOnBtn.id = 'allACsOn';
  allOnBtn.className = 'circle-btn';
  allOnBtn.title = 'Turn On All ACs';
  allOnBtn.innerHTML = '<ion-icon name="power-outline"></ion-icon>';
  allOnBtn.innerHTML = '<ion-icon name="flash-outline"></ion-icon>';
 
  // Turn Off All button
  const allOffBtn = document.createElement('button');
  allOffBtn.id = 'allACsOff';
  allOffBtn.className = 'circle-btn';
  allOffBtn.title = 'Turn Off All ACs';
  allOffBtn.innerHTML = '<ion-icon name="power-outline"></ion-icon>';
  allOffBtn.innerHTML = '<ion-icon name="flash-off-outline"></ion-icon>';

  controlsDiv.appendChild(allOnBtn);
  controlsDiv.appendChild(allOffBtn);
  
  // Inserting into DOM before default-settings section
  document.querySelector('.default-settings').before(controlsDiv);
  if (defaultSettings) {
    defaultSettings.insertAdjacentElement('beforebegin', controlsDiv);
  } else {
    console.error('Could not find .default-settings element');
  }

  // Event handlers
  allOnBtn.addEventListener('click', () => {
    rooms.forEach(room => room.airConditionerOn = true);
    generateRooms();
    allOnBtn.classList.add('active');
    
    allOnBtn.classList.add('active');
    setTimeout(() => allOnBtn.classList.remove('active'), 1000);
  });
  
  allOffBtn.addEventListener('click', () => {
    rooms.forEach(room => room.airConditionerOn = false);
    generateRooms();
    allOffBtn.classList.add('active');
    setTimeout(() => allOffBtn.classList.remove('active'), 1000);
  });
};
//Add Room Modal
const addRoomModal = () => {
  const modalHTML = `
    <div class="modal" id="roomModal">
      <div class="modal-content">
        <h3>Add New Room</h3>
        <div class="modal-inputs">
          <input type="text" id="newRoomName" placeholder="Room name (e.g., Office)" required>
          <div class="image-upload">
            <label for="roomImage">Room Image (Optional)</label>
            <input type="file" id="roomImage" accept="image/*">
            <div class="image-preview hidden" id="imagePreview"></div>
          </div>
        </div>
        <div class="modal-buttons">
          <button id="addRoom" class="modal-btn confirm">
            <ion-icon name="add-circle-outline"></ion-icon> Add Room
          </button>
          <button id="cancelAddRoom" class="modal-btn cancel">
            <ion-icon name="close-circle-outline"></ion-icon> Cancel
          </button>
        </div>
        <div class="modal-feedback" id="modalFeedback"></div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Room management button with dropdown
  const roomManagementHTML = `
    <div class="room-management">
      <button id="roomManagementBtn" title="Manage rooms">
        <ion-icon name="add-outline"></ion-icon>
      </button>
      <div class="room-management-dropdown hidden">
        <button id="addRoomBtn">
          <ion-icon name="add-outline"></ion-icon> Add Room
        </button>
        <button id="deleteRoomBtn" class="delete">
          <ion-icon name="trash-outline"></ion-icon> Delete Room
        </button>
      </div>
    </div>
  `;
  
  document.querySelector(".text").insertAdjacentHTML('afterend', roomManagementHTML);

  // Toggle dropdown visibility
  const roomManagementBtn = document.getElementById('roomManagementBtn');
  const dropdown = document.querySelector('.room-management-dropdown');
  
  roomManagementBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });

  // Close dropdown when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.room-management')) {
      dropdown.classList.add('hidden');
    }
  });
  
  // Add room button in dropdown
  document.getElementById('addRoomBtn').addEventListener('click', () => {
    dropdown.classList.add('hidden');
    const modal = document.getElementById("roomModal");
    const modalContent = modal.querySelector(".modal-content");
    modal.classList.add("active");
    modalContent.style.animation = "slideInDown 0.3s forwards";
  });
  
  // Delete room button in dropdown
  document.getElementById('deleteRoomBtn').addEventListener('click', () => {
    dropdown.classList.add('hidden');
    const roomName = prompt('Enter the name of the room to delete:');
    if (roomName) {
      const roomIndex = rooms.findIndex(r => r.name === roomName);
      if (roomIndex !== -1) {
        rooms.splice(roomIndex, 1);
        saveRoomsToStorage();
        
        // Update UI
        generateRooms();
        
        // Update dropdown
        const options = roomSelect.querySelectorAll('option');
        options.forEach(option => {
          if (option.value === roomName) {
            option.remove();
          }
        });
        
        // If deleted room was selected, it selects first room
        if (selectedRoom === roomName) {
          selectedRoom = rooms[0]?.name || '';
          if (rooms.length > 0) {
            setSelectedRoom(selectedRoom);
          }
        }
        
        alert(`Room "${roomName}" deleted successfully.`);
      } else {
        alert(`Room "${roomName}" not found.`);
      }
    }
  });

  // Image preview 
  document.getElementById("roomImage").addEventListener("change", function(e) {
    const preview = document.getElementById("imagePreview");
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.innerHTML = `<img src="${e.target.result}" alt="Room preview">`;
        preview.classList.remove("hidden");
        preview.style.display = "block";
      }
      reader.readAsDataURL(file);
    }
  });
  
  // Close modal functionality
  document.getElementById("cancelAddRoom").addEventListener("click", () => {
    const modalContent = document.querySelector(".modal-content");
    modalContent.style.animation = "slideOutUp 0.3s forwards";
    setTimeout(() => {
      document.getElementById("roomModal").classList.remove("active");
      resetModal();
    }, 300);
  });
  
  // Add room functionality
  document.getElementById("addRoom").addEventListener("click", () => {
    const name = document.getElementById("newRoomName").value.trim();
    const imageInput = document.getElementById("roomImage");
    const feedback = document.getElementById("modalFeedback");
    
    // Validation
    if (!name) {
      showFeedback(feedback, "Please enter a room name", "error");
      return;
    }
    
    if (rooms.some(r => r.name === name)) {
      showFeedback(feedback, "Room already exists", "error");
      return;
    }
    
    const newRoom = {
      name,
      currTemp: 22,
      coldPreset: 20,
      warmPreset: 28,
      image: "./assets/default-room.jpg", 
      airConditionerOn: false,
      startTime: '08:00',
      endTime: '22:00',
   
      setCurrTemp(temp) { this.currTemp = temp; },
      setColdPreset(newCold) { this.coldPreset = newCold; },
      setWarmPreset(newWarm) { this.warmPreset = newWarm; },
      decreaseTemp() { this.currTemp--; },
      increaseTemp() { this.currTemp++; },
      toggleAircon() { this.airConditionerOn = !this.airConditionerOn; }
    };
    
    // Handle image upload 
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      const reader = new FileReader();
      
      reader.onload = function(e) {
        newRoom.image = e.target.result;
        completeRoomAddition(newRoom, feedback);
      };
      reader.readAsDataURL(file);
    } else {
      completeRoomAddition(newRoom, feedback);
    }
  });
  
  // Helper functions
  function completeRoomAddition(room, feedback) {
    rooms.push(room);
    saveRoomsToStorage();
    
    // Add to dropdown
    const option = document.createElement("option");
    option.value = room.name;
    option.textContent = room.name;
    roomSelect.appendChild(option);
    
    // Success feedback
    showFeedback(feedback, `${room.name} added successfully!`, "success");
    document.querySelector(".modal-content").classList.add("animate-bounce");
    
    // Close after delay
    setTimeout(() => {
      document.querySelector(".modal-content").style.animation = "slideOutUp 0.3s forwards";
      setTimeout(() => {
        document.getElementById("roomModal").classList.remove("active");
        resetModal();
        generateRooms();
      }, 300);
    }, 1500);
  }
  
  function showFeedback(element, message, type) {
    element.textContent = message;
    element.className = "modal-feedback show " + type;
    element.innerHTML = `<ion-icon name="${type === 'success' ? 'checkmark-circle' : 'alert-circle'}"></ion-icon> ${message}`;
    
    // Auto-hide after 3 seconds if not successful
    if (type !== 'success') {
      setTimeout(() => {
        element.classList.remove("show");
      }, 3000);
    }
  }
  //reset modal function
  function resetModal() {
    document.getElementById("newRoomName").value = "";
    document.getElementById("roomImage").value = "";
    document.getElementById("imagePreview").innerHTML = "";
    document.getElementById("imagePreview").classList.add("hidden");
    document.getElementById("modalFeedback").className = "modal-feedback";
    document.querySelector(".modal-content").classList.remove("animate-bounce");
  }
  
  // Close modal when clicking outside
  document.getElementById("roomModal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("roomModal")) {
      document.querySelector(".modal-content").style.animation = "slideOutUp 0.3s forwards";
      setTimeout(() => {
        document.getElementById("roomModal").classList.remove("active");
        resetModal();
      }, 300);
    }
  });
};

// Function to update bar according to timers
function updateVisualTimers() {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTotalMinutes = currentHours * 60 + currentMinutes;

  rooms.forEach(room => {
    const roomElement = document.getElementById(room.name);
    if (!roomElement) return;

    // This parses start and end times 
    const [startHours, startMinutes] = room.startTime.split(':').map(Number);
    const [endHours, endMinutes] = room.endTime.split(':').map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    // Calculate total duration in minutes
    const totalDuration = endTotalMinutes - startTotalMinutes;
    if (totalDuration <= 0) return; 
    
    // Calculate current progress
    let progress = (currentTotalMinutes - startTotalMinutes) / totalDuration;
    progress = Math.max(0, Math.min(1, progress));
    
    // Get all bars for this room
    const bars = roomElement.querySelectorAll('.bar');
    if (!bars.length) return;
    
    // Calculate how many bars should be active
    const activeBarCount = Math.round(progress * bars.length);
    const currentBarIndex = Math.floor(progress * bars.length);
    
    // Update bars
    bars.forEach((bar, index) => {
      bar.classList.remove('active', 'current');
      
      if (index < activeBarCount) {
        bar.classList.add('active');
      }
      
      if (index === currentBarIndex && progress > 0 && progress < 1) {
        bar.classList.add('current');
      }
    });
  });
}

// Weather effects controller
const WeatherEffects = {
  activeEffects: [],
  coldThreshold: 25,
  effectInterval: null,

  init() {
    this.checkTemperatureEffects();
    setInterval(() => this.checkTemperatureEffects(), 5000);
  },

  checkTemperatureEffects() {
    const activeRoom = rooms.find(room => room.name === selectedRoom);
    if (!activeRoom || !activeRoom.airConditionerOn) {
      this.clearEffects();
      return;
    }

    if (activeRoom.currTemp < this.coldThreshold) {
      this.showSnowEffect();
    } else {
      this.showHeatEffect();
    }
  },

  showSnowEffect() {
    this.clearEffects();
    this.effectInterval = setInterval(() => this.createSnowflake(), 300);
  },

  showHeatEffect() {
    this.clearEffects();
    this.effectInterval = setInterval(() => this.createHeatWave(), 500);
  },

  createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'weather-effect snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.fontSize = "70px";
    snowflake.style.color = "#AFDBF5";
    snowflake.style.animationDuration = `${8 + Math.random() * 7}s`;
    document.body.appendChild(snowflake);
    this.activeEffects.push(snowflake);

    // Remove after animation completes
    setTimeout(() => {
      snowflake.remove();
      this.activeEffects = this.activeEffects.filter(e => e !== snowflake);
    }, 15000);
  },

  createHeatWave() {
    const heatWave = document.createElement('div');
    heatWave.className = 'weather-effect heat-wave';
    heatWave.style.left = `${10 + Math.random() * 80}vw`;
    heatWave.style.top = `${10 + Math.random() * 80}vh`;
    heatWave.style.animationDuration = `${2 + Math.random() * 3}s`;
    document.body.appendChild(heatWave);
    this.activeEffects.push(heatWave);

    // Remove after animation completes
    setTimeout(() => {
      heatWave.remove();
      this.activeEffects = this.activeEffects.filter(e => e !== heatWave);
    }, 5000);
  },

  clearEffects() {
    if (this.effectInterval) {
      clearInterval(this.effectInterval);
      this.effectInterval = null;
    }
    this.activeEffects.forEach(effect => effect.remove());
    this.activeEffects = [];
  }
};

// Initialize weather effects
WeatherEffects.init();



// Update the visual timers every minute
setInterval(updateVisualTimers, 60000);

// Also update them whenever the page loads or when times are changed
document.addEventListener('DOMContentLoaded', updateVisualTimers);

// Initialize Time display 
setupTimeDisplayInteractions();
setInterval(checkScheduledTimes, 60000);

// Initialize new features
addRoomModal();
addAllACsButton();


// Initialize rooms display
generateRooms();

