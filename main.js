

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
    document.getElementById("cool").style.backgroundColor = "#c2c2c2";
    document.getElementById("warm").style.backgroundColor = "#d9d9d9";
    updateRoomDisplay(room);
  } else if (target?.id === 'warm') {
    room.setCurrTemp(room.warmPreset);
    document.getElementById("warm").style.backgroundColor = "#c2c2c2";
    document.getElementById("cool").style.backgroundColor = "#d9d9d9";
    updateRoomDisplay(room);
  }
});

// Increase and decrease temperature
document.getElementById("increase").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);

  if (room.currTemp < 32) {  //fix bug 3 - increase temperature
    room.increaseTemp(); 
    updateRoomDisplay(room);  
  }
});

document.getElementById("reduce").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);

  if (room.currTemp > 10) { //fix bug 4 - decrease temperature
    room.decreaseTemp(); 
    updateRoomDisplay(room);
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
        <button class="switch">
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
};
rooms.forEach(room => {
  room.scheduleActive = false;
});

// Add styles for the toggle switch and time display
const style = document.createElement('style');
style.textContent = `
/* Schedule Toggle Switch */
.schedule-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--cool-blue);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.time[contenteditable="true"] {
  padding: 2px 5px;
  border-radius: 3px;
  outline: none;
}

.time[contenteditable="true"]:focus {
  background-color: #f0f0f0;
  box-shadow: 0 0 0 1px var(--cool-blue);
}
`;
document.head.appendChild(style);

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
  
  // Show modal button
  document.querySelector(".text").insertAdjacentHTML('beforebegin', 
    '<button id="showModal" title="Add new room"><ion-icon name="add-outline"></ion-icon></button>');
  
  // Modal toggle functionality
  const modal = document.getElementById("roomModal");
  const modalContent = modal.querySelector(".modal-content");
  
  document.getElementById("showModal").addEventListener("click", () => {
    modal.classList.add("active");
    modalContent.style.animation = "slideInDown 0.3s forwards";
    console.log('clicked')
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
    modalContent.style.animation = "slideOutUp 0.3s forwards";
    setTimeout(() => {
      modal.classList.remove("active");
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
    
    // Add to dropdown
    const option = document.createElement("option");
    option.value = room.name;
    option.textContent = room.name;
    roomSelect.appendChild(option);
    
    // Success feedback
    showFeedback(feedback, `${room.name} added successfully!`, "success");
    modalContent.classList.add("animate-bounce");
    
    // Close after delay
    setTimeout(() => {
      modalContent.style.animation = "slideOutUp 0.3s forwards";
      setTimeout(() => {
        modal.classList.remove("active");
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
  
  function resetModal() {
    document.getElementById("newRoomName").value = "";
    document.getElementById("roomImage").value = "";
    document.getElementById("imagePreview").innerHTML = "";
    document.getElementById("imagePreview").classList.add("hidden");
    document.getElementById("modalFeedback").className = "modal-feedback";
    modalContent.classList.remove("animate-bounce");
  }
  
  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modalContent.style.animation = "slideOutUp 0.3s forwards";
      setTimeout(() => {
        modal.classList.remove("active");
        resetModal();
      }, 300);
    }
  });
};


// Initialize Time display 
setupTimeDisplayInteractions();
setInterval(checkScheduledTimes, 60000);

// Initialize new features
addRoomModal();
addAllACsButton();


// Initialize rooms display
generateRooms();

