let sceneIndex = 0;
let clientW = document.documentElement.clientWidth;
let clientH = document.documentElement.clientHeight;
let touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0, diffX = 0, diffY = 0, moveX = 0, moveY = 0;
let Len = 0;
let isTouchStart = false, isMoving = false, isTouchEnd = true;
let isTransition = false;
let Api = {}, es = {};

Api.on = (ev, fn) => {
  es[ev] = es[ev] || [];
  es[ev].push(fn);
}

let fire = function () {
  let ev = arguments[0], args = [];
  if (!es[ev]) return;

  for (let i = 1; i < arguments.length; i++) {
    args.unshift(arguments[i]);
  }

  for (let i = 0; i < es[ev].length; i++) {
    try {
      es[ev][i].apply(null, args);
    } catch (e) {
      console.log(e);
    }
  }
}

let initial = (mainEl) => {
  let mainContainer = document.querySelector(mainEl);
  let itemEl = mainContainer.children;
  if (!itemEl.length) return console.log("当前容器没有子元素");
  mainContainer.style.height = "100%";
  mainContainer.style.overflow = "hidden";
  mainContainer.style.position = "relative";
  for (let i = 0; i < itemEl.length; i++) {
    itemEl[i].style.height = "100%";
    itemEl[i].style.width = "100%";
    itemEl[i].style.position = "absolute";
    itemEl[i].style.left = "0";
    itemEl[i].style.top = "0";
    itemEl[i].style.zIndex = Len - i + 2;
    if (i != sceneIndex) {
      itemEl[i].style.opacity = 0;
    }
  }
}

let getDirection = (diffX, diffY) => {
  let direction = "";
  if (Math.abs(diffX) > 30 && Math.abs(diffY) < 15) {
    direction = diffX < 0 ? "left" : "right";
  } else if (Math.abs(diffY) > 30 && Math.abs(diffX) < 15) {
    direction = diffY < 0 ? "up" : "down";
  } else if (diffX > 20 && diffY < -20) {
    direction = "up_right";
  } else if (diffX < -20 && diffY < -20) {
    direction = "up_left";
  } else if (diffX < -20 && diffY > 20) {
    direction = "down_left";
  } else if (diffX > 20 && diffY > 20) {
    direction = "down_right";
  } else {
    direction = "";
  }
  return direction;
}

let aniEnd = () => {
  if (Api.scene) Api.scene.removeEventListener("webkitTransitionEnd", aniEnd);
  isTransition = false;
  Api.index = sceneIndex;
  fire("slide", Api);
}

let changeScene = (direction, els, loop) => {
  els[sceneIndex].style.transition = "all 0.8s ease";
  isTransition = true;
  switch (direction) {
    case "up":
      els[sceneIndex].style.opacity = 0;
      els[sceneIndex].style.transform = `translate3D(0, -${clientH}px, 0)scale(0.1)`;
      sceneIndex = sceneIndex >= Len - 1 ? (loop ? 0 : Len - 1) : sceneIndex + 1;
      els[sceneIndex].style.transition = "none";
      els[sceneIndex].style.transform = `translate3D(0, ${clientH}px, 0)scale(0.1)`;
      break;
    case "up_left":
      els[sceneIndex].style.opacity = 0;
      els[sceneIndex].style.transform = `translate3D(-${clientW}px, -${clientH}px, 0)scale(0.1)rotate(-90deg)`;
      sceneIndex = sceneIndex >= Len - 1 ? 0 : sceneIndex + 1;
      els[sceneIndex].style.transition = "none";
      els[sceneIndex].style.transform = `translate3D(${clientW}px, ${clientH}px, 0)scale(0.1)rotate(90deg)`;
      break;
    case "up_right":
      els[sceneIndex].style.opacity = 0;
      els[sceneIndex].style.transform = `translate3D(${clientW}px, -${clientH}px, 0)scale(0.1)rotate(90deg)`;
      sceneIndex = sceneIndex >= Len - 1 ? 0 : sceneIndex + 1;
      els[sceneIndex].style.transition = "none";
      els[sceneIndex].style.transform = `translate3D(-${clientW}px, ${clientH}px, 0)scale(0.1)rotate(-90deg)`;
      break;
    case "right":
      els[sceneIndex].style.opacity = 0;
      els[sceneIndex].style.transform = `translate3D(${clientW}px, 0, 0)scale(0.1)rotate(90deg)`;
      sceneIndex = sceneIndex >= Len - 1 ? 0 : sceneIndex + 1;
      els[sceneIndex].style.transition = "none";
      els[sceneIndex].style.transform = `translate3D(-${clientW}px, 0, 0)scale(0.1)rotate(-90deg)`;
      break;
    case "down":
      els[sceneIndex].style.opacity = 0;
      els[sceneIndex].style.transform = `translate3D(0, ${clientH}px, 0)scale(0.1)`;
      sceneIndex = sceneIndex <= 0 ? Len - 1 : sceneIndex - 1;
      els[sceneIndex].style.transition = "none";
      els[sceneIndex].style.transform = `translate3D(0, -${clientH}px, 0)scale(0.1)`;
      break;
    case "down_left":
      els[sceneIndex].style.opacity = 0;
      els[sceneIndex].style.transform = `translate3D(-${clientW}px, ${clientH}px, 0)scale(0.1)rotate(-90deg)`;
      sceneIndex = sceneIndex <= 0 ? Len - 1 : sceneIndex - 1;
      els[sceneIndex].style.transition = "none";
      els[sceneIndex].style.transform = `translate3D(${clientW}px, -${clientH}px, 0)scale(0.1)rotate(90deg)`;
      break;
    case "down_right":
      els[sceneIndex].style.opacity = 0;
      els[sceneIndex].style.transform = `translate3D(${clientW}px, ${clientH}px, 0)scale(0.1)rotate(90deg)`;
      sceneIndex = sceneIndex <= 0 ? Len - 1 : sceneIndex - 1;
      els[sceneIndex].style.transition = "none";
      els[sceneIndex].style.transform = `translate3D(-${clientW}px, -${clientH}px, 0)scale(0.1)rotate(-90deg)`;
      break;
    case "left":
      els[sceneIndex].style.opacity = 0;
      els[sceneIndex].style.transform = `translate3D(-${clientW}px, 0, 0)scale(0.1)rotate(-90deg)`;
      sceneIndex = sceneIndex <= 0 ? Len - 1 : sceneIndex - 1;
      els[sceneIndex].style.transition = "none";
      els[sceneIndex].style.transform = `translate3D(${clientW}px, 0, 0)scale(0.1)rotate(90deg)`;
      break;
    default:
      els[sceneIndex].style.transition = "none";
      isTransition = false;
      console.log("no change");
      break;
  }
  Api.scene = els[sceneIndex];
  setTimeout (() => {
    els[sceneIndex].style.transition = "all 0.8s ease";
    els[sceneIndex].style.opacity = 1;
    els[sceneIndex].style.transform = `translate3D(0, 0, 0)`;
    if (direction) els[sceneIndex].addEventListener("webkitTransitionEnd", aniEnd);
  }, 50);
}



const Switching = (opts) => {
  let mainEl = opts.target || "";
  let loop = opts.loop === false ? false : true;
  initial(mainEl);
  let mainContainer = document.querySelector(mainEl);
  let itemEl = mainContainer.children;
  Len = itemEl.length;

  mainContainer.addEventListener("touchstart", (e) => {
    e.preventDefault();
    if (isMoving || !isTouchEnd || isTransition) return;
    isTouchStart = true;
    isTouchEnd = false;
    itemEl[sceneIndex].style.transition = "none";
    moveX = 0;
    moveY = 0;
    touchStartX = e.touches[0].pageX;
    touchStartY = e.touches[0].pageY;
  });

  mainContainer.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (isTouchEnd || !isTouchStart || isTransition) return;
    isMoving = true;
    moveX = e.changedTouches[0].pageX;
    moveY = e.changedTouches[0].pageY;
    diffX = moveX - touchStartX;
    diffY = moveY - touchStartY;
    itemEl[sceneIndex].style.transform = `translate3D(${diffX}px, ${diffY}px, 0)`;
    if ((moveX <= 0 || moveX >= clientW || moveY <= 0 || moveY >=clientH) && (diffX !=0 || diffY !=0)) {
      let direction = getDirection(diffX, diffY);
      Api.direction = direction;
      changeScene(direction, itemEl, loop);
    }
  });

  mainContainer.addEventListener("touchend", (e) => {
    if (!isTouchStart || !isMoving || isTransition) return;
    isTouchStart = false;
    isTouchEnd = true;
    isMoving = false;
    moveX = 0;
    moveY = 0;
    touchEndX = e.changedTouches[0].pageX;
    touchEndY = e.changedTouches[0].pageY;
    diffX = touchEndX - touchStartX;
    diffY = touchEndY - touchStartY;
    let direction = getDirection(diffX, diffY);
    Api.direction = direction;
    changeScene(direction, itemEl, loop);
  });
  Api.index = sceneIndex;
  Api.scene = itemEl[sceneIndex];
  Api.sections = itemEl;
  Api.direction = Api.direction || "";
  document.addEventListener("DOMContentLoaded", () => {
    fire("slide", Api);
  });
  document.body.addEventListener("touchmove", function (e) {
    e.preventDefault();
  }, { passive: false });
  return Api;
}

export default Switching;
