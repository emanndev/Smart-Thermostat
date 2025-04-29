# Bugs Report

## Unresponsive UI in both tablet and mobile mode

- **Location**: style.css lines- 46-47, 378, 388
- **Description**: UI not responsive on both tablet and mobile
- **Identified**: Identified with visual inspection and chrome developer tool
- **Fix**: Placed a flex wrap for the containers to wrap when on either tablet or mobile. Adjusted the bars gap for smaller screens
