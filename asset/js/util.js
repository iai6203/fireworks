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