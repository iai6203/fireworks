export const mobileChk = () => {
  const mobileKeyWords = ['Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson'];
  for (let info in mobileKeyWords) {
    if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
      return true;
    }
  }
  return false;
}

export const relMousePos = (r, evt) => {
  const { top, left } = r.getBoundingClientRect();
  const { clientX, clientY } = evt;

  return { x: clientX - left, y: clientY - top }
}

export const negativeRandom = (min, max) => {
  let r = (Math.random() * max) + min;
  return Math.round(Math.random()) === 1 ? r : -r;
}

export const getDistance = (cx, cy, tx, ty) => {
  const disX = cx - tx;
  const disY = cy - ty;

  return Math.sqrt((disX * disX) + (disY * disY));
}