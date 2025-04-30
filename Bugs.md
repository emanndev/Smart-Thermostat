# Bugs Report

## Unresponsive UI in both tablet and mobile mode

- **Line Number**: style.css lines: 46-47, 378, 388
- **Type of Bug / Description**: UI not responsive on both tablet and mobile
- **Identified**: Identified with visual inspection and chrome developer tool

## Selection of rooms from Dropdown not responding

- **Line Number**: main.js lines: 206
- **Type of Bug / Description**: Fixed the room selection functionality to change both the image and temperature accordingly
- **Identified**: Identified with visual inspection and used my developer tools

## Increase and Decrease Temperature functionality

- **Line Number**: main.js lines: 246-249, 262-272
- **Type of Bug / Description**: Disfunctionality with increase and decrease temperature button
- **Identified**: Identified using visual inspection found the ids using the developer tools

## Image overlays improper changes to set temperature

- **Line Number**: main.js - lines: 145 -149
- **Type of Bug / Description**: Overlays were not transitions in accordance with the change of the temperature.
- **Identified**: Identified through visual inspection

## Temperature validation for setting default presets and giving error messages

- **Line Number**: main.js - lines: 308-330
- **Type of Bug / Description**: The default preset was not displaying clear error messages and had to give specific ranges for both cool and warm modes
- **Identified**: Through Visual testing and Manual testing of entering values in the default presents to check feedback

## AC on feedback according to the range

- **Line Number**: main.js - lines: 352
- **Type of Bug / Description**: The bug was from the html being populated in the generateRooms function where the condition output for the ternary opearator was interchanged.
- **Identified**: Through testing my UI and manual testing by turning on the AC and checking the response given in each range I set.
