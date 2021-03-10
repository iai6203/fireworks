import {mobileChk} from "./util.js";

export const buttonStyling = btn => {
  const mobile = mobileChk();

  const turbulence = document.querySelector('feTurbulence');

  let verticalFrequency = .00001, horizontalFrequency = .00001;
  const step = 30;
  const interval = 10;
  const buttonHandler = ({ type }) => {
    switch (type) {
      case 'mouseover':
      case 'touchstart':
        for (let i = 0; i < step; i++) {
          setTimeout(() => {
            verticalFrequency += .002;
            horizontalFrequency += .002;
            turbulence.setAttribute('baseFrequency', `${verticalFrequency} ${horizontalFrequency}`);
          }, i * interval);
        }
        break;
      case 'mouseout':
      case 'touchend':
        for (let i = 0; i < step; i++) {
          setTimeout(() => {
            verticalFrequency -= .002;
            horizontalFrequency -= .002;
            turbulence.setAttribute('baseFrequency', `${verticalFrequency} ${horizontalFrequency}`);
          }, i * interval);
        }
        break;
      default:
        throw new Error(`Unhandled type : ${type}`);
    }
  }

  if (mobile) {
    btn.addEventListener('touchstart', buttonHandler, false);
    btn.addEventListener('touchend', buttonHandler, false);
  }
  else if (!mobile) {
    btn.addEventListener('mouseover', buttonHandler, false);
    btn.addEventListener('mouseout', buttonHandler, false);
  }
}