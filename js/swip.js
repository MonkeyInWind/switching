let sceneIndex = 0;
let clientW = document.documentElement.clientWidth;
let clientH = document.documentElement.clientHeight;
let touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0, diffX = 0, diffY = 0;
let isTouchStart = false, isMoving = false, isTouchEnd = true;

let initial = (mainEl) => {
  let mainContainer = document.querySelector(mainEl);
  let itemEl = mainContainer.children;
  if (!itemEl.length) return console.log("当前容器没有子元素");
  mainContainer.style.height = "100vh";
  mainContainer.style.overflow = "hidden";
  for (let i = 0; i < itemEl.length; i++) {
    itemEl[i].style.height = "100%";
  }
}

window.swip = (mainEl) => {
  initial(mainEl);
  let mainContainer = document.querySelector(mainEl);
  let itemEl = mainContainer.children;

  mainContainer.addEventListener("touchstart", (e) => {
    if (isMoving || !isTouchEnd) return;
    isTouchStart = true;
    isTouchEnd = false;
    mainContainer.style.transition = "none";
    touchStartX = e.touches[0].pageX;
    touchStartY = e.touches[0].pageY;
    console.log("start", touchStartX, touchStartY);
  });

  mainContainer.addEventListener("touchmove", (e) => {
    if (isTouchEnd || !isTouchStart) return;
    isMoving = true;
    diffX = e.changedTouches[0].pageX - touchStartX;
    diffY = e.changedTouches[0].pageY - touchStartY;
    console.log("moving", diffX, diffY);
  });

  mainContainer.addEventListener("touchend", (e) => {
    if (!isTouchStart || !isMoving) return;
    isTouchStart = false;
    isTouchEnd = true;
    isMoving = false;
    mainContainer.style.transition = "transform 0.8s ease";
    touchEndX = e.changedTouches[0].pageX;
    touchEndY = e.changedTouches[0].pageY;
    diffX = touchEndX - touchStartX;
    diffY = touchEndY - touchStartY;
    console.log("end", diffX, diffY);
  });
}
